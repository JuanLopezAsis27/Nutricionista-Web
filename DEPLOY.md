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

## 7-bis. CI/CD automático con GitHub Actions (recomendado)

El repo incluye dos workflows en `.github/workflows/`:

- **`ci.yml`** — en cada Pull Request y push a ramas que no sean `main`: instala
  dependencias y corre `npm run build` (compila + chequea TypeScript). Sirve de red
  de seguridad antes de mergear.
- **`deploy.yml`** — en cada push a `main` (o manual desde la pestaña *Actions*):
  1. Construye la imagen Docker y la publica en **GHCR**
     (`ghcr.io/juanlopezasis27/nutricionista`).
  2. Entra por SSH a la VPS, hace `docker compose -f docker-compose.prod.yml pull`
     y `up -d` con la nueva imagen. **No construye en la VPS.**

> Con este flujo, el `docker-compose.prod.yml` corre la imagen ya construida (las
> variables `NEXT_PUBLIC_*` quedan compiladas dentro de la imagen en CI, así que la
> VPS no necesita configurarlas en runtime).

### Configurar el repositorio (una sola vez)

En GitHub → **Settings → Secrets and variables → Actions**:

**Variables** (públicas):

| Nombre | Valor |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `3im7vzff` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` *(opcional)* |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` *(opcional)* |

**Secrets** (privados, para el deploy por SSH):

| Nombre | Descripción |
|---|---|
| `VPS_HOST` | IP o dominio de la VPS |
| `VPS_USER` | usuario SSH (ej. `nicolas`) |
| `VPS_SSH_KEY` | **clave privada** SSH (contenido completo) con acceso a ese usuario |
| `VPS_PORT` | puerto SSH *(opcional, default 22)* |
| `VPS_APP_DIR` | ruta del repo en la VPS *(opcional, default `~/nutricionista-web`)* |

> Generá un par de llaves dedicado para el deploy (`ssh-keygen -t ed25519 -f deploy_key`),
> agregá la **pública** a `~/.ssh/authorized_keys` del usuario en la VPS y cargá la
> **privada** en el secret `VPS_SSH_KEY`.

### Preparar la VPS (una sola vez)

```bash
git clone https://github.com/JuanLopezAsis27/Nutricionista.git ~/nutricionista-web
cd ~/nutricionista-web
# el usuario debe estar en el grupo docker (ver sección 2)
```

No hace falta `.env` para producción (las variables van en la imagen). A partir de
ahí, **cada push a `main` despliega solo**. Para forzar un deploy manual: pestaña
*Actions → Build & Deploy → Run workflow*.

> Si el repositorio es **privado**, agregá una *deploy key* de solo lectura a la VPS
> para que el `git pull` del workflow funcione (o el pull se omite y solo se actualiza
> la imagen).

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
