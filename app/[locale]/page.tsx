import { setRequestLocale } from "next-intl/server";
import StickyRSVP from "@/components/StickyRSVP";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import ElDia from "@/components/ElDia";
import ComoLlegar from "@/components/ComoLlegar";
import Alojamiento from "@/components/Alojamiento";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import PlaylistModal from "@/components/PlaylistModal";
import ContactModal from "@/components/ContactModal";
import GiftModal from "@/components/GiftModal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      <Hero />
      <Historia />
      <ElDia />
      <ComoLlegar />
      <Alojamiento />
      <RSVP />
      <Footer />
      <StickyRSVP />
      <PlaylistModal />
      <ContactModal />
      <GiftModal />
    </main>
  );
}
