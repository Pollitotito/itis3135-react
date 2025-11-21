import { useEffect } from "react";

export default function Home() {
  // Set browser tab title when this page loads
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="front-home">
      <main>
        <h2 className="center">Home</h2>
        <img
          className="kame-house"
          src="/image/KameHouse.webp"
          alt="Kame House from Dragon Ball Z"
        />
        <p className="center abajo-home">Kame House from Dragon Ball Z.</p>
      </main>
    </div>
  );
}