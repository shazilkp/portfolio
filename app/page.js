import PixelIntro from "./components/PixelIntro";
import PlanetCanvas from "./components/PlanetCanvas";



export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f1b] text-sky-100 font-pixel px-6 py-12 flex items-center">
      <PixelIntro />
      <PlanetCanvas/>
    </main>
  );
}
