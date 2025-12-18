// Sektion3: Henter billeder til galleriet og sender dem videre til klient-komponenten
import Sektion3Client from "./Sektion3Client";

// Funktion til at hente billeder fra API'et
async function getGallery() {
  const res = await fetch("http://localhost:4000/gallery", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch gallery");

  const data = await res.json();

  // Bestemmer grid placering for hvert billede
  const getGridArea = (index) => {
    const gridAreas = [
      "1 / 1 / 3 / 2",
      "1 / 2 / 3 / 3",
      "1 / 3 / 3 / 5",
      "1 / 5 / 3 / 6",
      "3 / 1 / 5 / 2",
      "3 / 2 / 5 / 4",
      "3 / 4 / 5 / 6",
    ];
    return gridAreas[index % gridAreas.length];
  };

  // Mapper data til billede-objekter med grid og tekst
  const images = data.slice(0, 7).map((item, index) => ({
    src: item.asset.url,
    gridArea: getGridArea(index),
    title: "NIGHT CLUB PARTY",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  }));

  return images;
}

// Hovedkomponent: Henter billeder og sender dem til Sektion3Client
export default async function Sektion3() {
  const images = await getGallery();
  return <Sektion3Client images={images} />;
}

