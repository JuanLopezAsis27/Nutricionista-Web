# Despliegue en VPS con Docker

Guía paso a paso para publicar la web en una VPS (ej. Ubuntu 22.04 en Hostinger,
DigitalOcean, Hetzner, etc.) usando Docker, con Nginx como reverse proxy y HTTPS
gratis con Let's Encrypt.

> Arquitectura objetivo: cada app corre en su propio contenedor escuchando solo
> en `127.0.0.1`, y **Nginx** (en el host) recibe el tráfico de internet (80/443)
> y lo redirige a cada contenedor según el dominio.
>
> ```
> Internet ──443──> Nginx (host) ──> 127.0.0.1:3000  (este sitio)
>                                └──> 127.0.0.1:3001  (app.licenciado.com, a futuro)
> ```

---

## 1. Preparar la VPS (endurecimiento básico)

Conectate como root la primera vez y creá un usuario no-root con sudo:

```bash
adduser nicolas
usermod -aG sudo nicolas
```

### SSH con llave (sin contraseña)

Desde **tu máquina** generá una llave si no tenés y copiala a la VPS:

```bash
ssh-keygen -t ed25519
ssh-copy-id nicolas@TU_IP
```

Luego, en la VPS, editá `/etc/ssh/sshd_config` y dejá:

```
PermitRootLogin no
PasswordAuthentication no
```

```bash
sudo systemctl restart ssh
```

> A partir de acá te conectás con `ssh nicolas@TU_IP`. Login por contraseña y por
> root quedan deshabilitados (mucho menos superficie de ataque por fuerza bruta).

### Firewall (UFW)

Solo SSH, HTTP y HTTPS abiertos. **El puerto 3000 NO se abre** (queda interno):

```bash
sudo apt update && sudo apt install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### fail2ban (bloquea IPs que insisten con SSH)

```bash
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
```

### Actualizaciones automáticas de seguridad

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## 2. Instalar Docker

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker nicolas   # cerrá y reabrí sesión luego
```

Verificá: `docker --version` y `docker compose version`.

---

## 3. Subir el código y configurar variables

```bash
git clone TU_REPO nutricionista-web
cd nutricionista-web
```

Creá el archivo `.env` (lo lee Docker Compose; **no** es el `.env.local`):

```bash
cat > .env <<'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=3im7vzff
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
EOF
chmod 600 .env
```

> Estas variables son públicas (van al navegador), pero igual conviene `chmod 600`.
> Cuando tengas tokens o claves privadas (Fase 3), van en este `.env` y **nunca**
> se suben a git (ya está en `.gitignore`).

---

## 4. Levantar la app

```bash
docker compose up -d --build
```

Comprobá que está sana:

```bash
docker compose ps        # STATUS debe decir "healthy"
curl -I http://127.0.0.1:3000
```

---

## 5. Nginx + HTTPS

```bash
sudo apt install -y nginx
```

Creá `/etc/nginx/sites-available/nicolaslopezasis.com`:

```nginx
server {
    listen 80;
    server_name nicolaslopezasis.com www.nicolaslopezasis.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Activá y recargá:

```bash
sudo ln -s /etc/nginx/sites-available/nicolaslopezasis.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

> Antes apuntá el dominio (registro **A**) a la IP de la VPS desde tu proveedor de DNS.

### Certificado SSL gratis

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d nicolaslopezasis.com -d www.nicolaslopezasis.com
```

Certbot edita el Nginx para servir por HTTPS y renueva solo. Verificá la
renovación con `sudo certbot renew --dry-run`.

---

## 6. Configurar CORS en Sanity (para el Studio en producción)

Para que el panel `/studio` funcione en el dominio real, agregá el origen en
<https://www.sanity.io/manage> → tu proyecto → **API → CORS origins**:

```
https://nicolaslopezasis.com   (con credenciales: sí)
```

---

## 7. Actualizar el sitio (redeploy)

```bash
cd nutricionista-web
git pull
docker compose up -d --build
docker image prune -f      # limpia imágenes viejas
```

> El contenido del CMS (textos, notas del blog, fotos) se edita desde `/studio`
> y se actualiza solo cada 60 s — **no requiere redeploy**. Solo redeployás cuando
> cambia el código.

---

## 8. Backups y monitoreo

- **Contenido**: Sanity guarda el contenido en su nube con historial de versiones.
  Aun así, exportá un backup periódico: `npx sanity dataset export production`.
- **Logs del contenedor**: `docker compose logs -f web` (ya rotan, máx. 3×10 MB).
- **Recursos**: `docker stats` para ver CPU/memoria.
- Considerá un uptime monitor externo (UptimeRobot, gratis) que pinguee el dominio.

---

## ✅ Checklist de seguridad de la VPS

- [ ] Usuario no-root con sudo; root y password-login deshabilitados en SSH.
- [ ] Acceso SSH solo por llave (ed25519).
- [ ] UFW activo: solo 22, 80, 443. **Puerto 3000 cerrado** (la app escucha en `127.0.0.1`).
- [ ] fail2ban activo.
- [ ] Actualizaciones automáticas de seguridad.
- [ ] HTTPS con Certbot y renovación automática.
- [ ] Contenedor corre como usuario sin privilegios (ya configurado en el Dockerfile).
- [ ] `.env` con `chmod 600` y fuera de git.
- [ ] Healthcheck del contenedor en verde.
- [ ] (Opcional pero recomendado) cambiar el puerto SSH, instalar un monitor de uptime,
      y limitar memoria por contenedor (ya definido en `docker-compose.yml`).

---

## Notas para los próximos módulos

Cuando sumes `app.licenciado.com` (Fase 3) en la misma VPS:

- Otro `docker-compose.yml` exponiendo, p. ej., `127.0.0.1:3001`.
- Otro `server {}` de Nginx para ese subdominio + su propio certificado.
- **PostgreSQL en su propio contenedor**, escuchando solo en la red interna de
  Docker (nunca `0.0.0.0`), con volumen persistente y backups automáticos.
- Datos de pacientes separados del contenido público (cumplimiento Ley 25.326).
