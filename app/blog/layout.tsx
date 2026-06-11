import { getSiteContent } from "@/lib/queries";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = await getSiteContent();

  return (
    <>
      <Navbar settings={settings} />
      <main className="pt-20">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFab whatsapp={settings.whatsapp} />
    </>
  );
}
