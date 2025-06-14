export default function PixelIntro() {
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl mb-4">
        <span className="text-red-500">Shazil Mohammed KP</span>{" "}
        {/* <span className="text-yellow-400">Moham</span>
        <span className="text-cyan-400">med K P</span> */}
      </h1>

      <p className="text-base leading-relaxed mb-6">
      Hi, I’m Shazil — a third-year Computer Science and Engineering student at NIT Calicut. I enjoy building practical, well-crafted tools and care about clean design and thoughtful systems.
      Outside of coding, I’m drawn to the curious places where tech and science intersect.
      </p>

     <div className="w-full h-1 flex flex-row mb-6 ">
        <div className="bg-red-500 h-0.5 flex-1"></div>
        <div className="bg-orange-500 h-0.5 flex-1"></div>
        <div className="bg-yellow-500 h-0.5 flex-1"></div>
        <div className="bg-green-500 h-0.5 flex-1"></div>
        <div className="bg-teal-700 h-0.5 flex-1"></div>
        <div className="bg-blue-900 h-0.5 flex-1"></div>
    </div>

      <div className="text-yellow-400 space-x-2 text-sm">
        <a href="#">about</a> /
        <a href="#"> blogs</a> /
        <a href="#"> photos</a> /
        <a href="#"> jekyll-themes</a> /
        <a href="#" className="text-orange-400"> now</a>
      </div>
    </div>
  );
}
