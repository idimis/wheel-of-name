"use client";

import { useState } from "react";

const WheelOfFortune = () => {
  const [names, setNames] = useState<{ name: string; color: string }[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleAddName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("name") as HTMLInputElement;
    const name = input.value.trim();
    
    // Generate a random color for the pie slice
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

    if (name && !names.some(item => item.name === name) && names.length < 30) {
      setNames([...names, { name, color: randomColor }]);
      input.value = "";
    }
  };

  const shuffleNames = () => {
    if (names.length === 0) return;
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * names.length);
    const selectedName = names[randomIndex].name;

    setTimeout(() => {
      setResult(selectedName);
      setIsSpinning(false);
      // Trigger confetti
      const confettiContainer = document.getElementById("confetti");
      if (confettiContainer) {
        confettiContainer.classList.add("animate");
        setTimeout(() => {
          confettiContainer.classList.remove("animate");
        }, 3000);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF4E1]">
      <h1 className="text-4xl font-bold text-[#F3CF56] mb-4">Wheel of Fortune</h1>

      <form onSubmit={handleAddName} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Add a name"
          className="border border-gray-300 p-2 rounded mr-2"
          required
        />
        <button type="submit" className="bg-[#F3CF56] p-2 rounded">
          Add
        </button>
      </form>

      <div className="relative w-80 h-80 border border-gray-300 rounded-full overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center justify-center ${isSpinning ? "animate-spin" : ""}`}
          style={{
            transition: "transform 3s ease-out",
            transform: `rotate(${isSpinning ? Math.random() * 360 + 720 : 0}deg)`,
          }}
        >
          {names.map((item, index) => (
            <div
              key={index}
              className="absolute w-full h-full"
              style={{
                clipPath: `polygon(50% 50%, ${100 * Math.sin((Math.PI * 2 * index) / names.length)}% ${100 * Math.cos((Math.PI * 2 * index) / names.length)}%, ${100 * Math.sin((Math.PI * 2 * (index + 1)) / names.length)}% ${100 * Math.cos((Math.PI * 2 * (index + 1)) / names.length)}%)`,
                backgroundColor: item.color,
                transformOrigin: "50% 50%",
                zIndex: 1,
                transition: "transform 3s ease-out"
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={shuffleNames}
        className="bg-[#F3CF56] p-4 rounded mt-4"
      >
        Shuffle
      </button>

      {result && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-[#1C5469]">
            Congratulations for <span className="font-extrabold">{result}</span>!
          </h2>
        </div>
      )}

      <div id="confetti" className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-50">
        <div className="confetti bg-[#F3CF56] animate"></div>
      </div>

      <style jsx>{`
        @keyframes animate {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        .confetti {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          pointer-events: none;
          animation: animate 0.5s ease forwards;
          transform: translateY(100%);
        }

        .confetti.animate {
          animation: animate 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  return <WheelOfFortune />;
}
