import { getSiteContent } from "@/lib/queries";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default async function Home() {
  const { settings, home, services, credentials } = await getSiteContent();

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <Hero home={home} settings={settings} />
        <About home={home} settings={settings} />
        <Services home={home} services={services} />
        <Experience home={home} credentials={credentials} />
        <Contact home={home} settings={settings} />
      </main>
      <Footer settings={settings} />
      <WhatsAppFab whatsapp={settings.whatsapp} />
    </>
  );
}