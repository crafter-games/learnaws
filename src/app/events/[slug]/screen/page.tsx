import { notFound } from "next/navigation";
import { connection } from "next/server";
import QRCode from "qrcode";
import { getEvent } from "@/lib/events";
import { requireAdmin } from "@/lib/auth";
import { ScreenClient } from "@/components/event/screen-client";

/** Projector view for the venue: big QR to join and the live top 10. */
export default async function EventScreen({ params }: PageProps<"/events/[slug]/screen">) {
  await connection();
  await requireAdmin();
  const e = getEvent((await params).slug);
  if (!e) notFound();
  const url = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://learnaws.crafter.games"}/events/${e.slug}`;
  const qr = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#1c1840", light: "#ffffff" } });
  return <ScreenClient event={e} qrSvg={qr} url={url.replace(/^https?:\/\//, "")} />;
}
