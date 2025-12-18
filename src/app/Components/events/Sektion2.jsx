import Sektion2Client from "./Sektion2Client";
import Image from "next/image";

export default async function Sektion2() {
  let data = [];
  try {
    const res = await fetch("http://localhost:4000/events", { cache: "no-store" });
    data = await res.json();
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }

  const events = (data || []).map((event, index) => ({
    ...event,
    date: index % 2 === 0 ? "2025-12-25T22:30:00.000Z" : "2025-12-31T22:30:00.000Z",
    location: index % 2 === 0 ? "City Plaza, New York" : "Las Vegas, Nevada",
    asset: { url: event.asset?.url || "/assets/placeholder.png" },
  }));

  return (
    <section className="relative py-16">
      <Image
        src="/assets/bg/slider_bg_overlay.png"
        alt="background overlay"
        fill
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/75 -z-5"></div>

      <Sektion2Client events={events} />
    </section>
  );
}

