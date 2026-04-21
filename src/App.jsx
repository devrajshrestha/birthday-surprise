import { useEffect, useRef, useState } from "react";

export default function App() {
  const [step, setStep] = useState("lock");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const audioRef = useRef(null);

  const message =
`Happy Birthday My Love ❤️

You are my whole universe.
Every moment with you feels like a movie.

I just want to see you smile forever 💖`;

  // ✍️ typing effect
  useEffect(() => {
    if (step !== "home") return;

    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [step]);

  // 🎵 smooth music start
  const startMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0;

      audioRef.current.play().then(() => {
        // fade in
        let v = 0;
        const fade = setInterval(() => {
          if (v < 0.7) {
            v += 0.02;
            audioRef.current.volume = v;
          } else {
            clearInterval(fade);
          }
        }, 100);
      });
    }
  };

  // 🎉 confetti / fireworks
  const fireworks = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({ particleCount: 300, spread: 180 });
  };

  // 🔐 unlock screen
  const unlock = () => {
    if (name.toLowerCase() === "usha shrestha") {
      setStep("intro");
    } else {
      alert("Wrong name 💔 try again");
    }
  };

  return (
    <div className="app">

      {/* 💖 FLOATING HEARTS */}
      <div className="hearts"></div>

      {/* 🔐 LOCK SCREEN */}
      {step === "lock" && (
        <div className="center">
          <h1>🔐 Enter Secret Name</h1>

          <input
            placeholder="Type her name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={unlock}>Unlock 💖</button>
        </div>
      )}

      {/* 🎬 INTRO NETFLIX STYLE */}
      {step === "intro" && (
        <div
          className="intro"
          onClick={() => {
            setStep("home");
            startMusic();
            fireworks();
          }}
        >
          <h1 className="logo">MY LOVE STORY</h1>
          <p>Click to begin 💖</p>
        </div>
      )}

      {/* 💖 HOME */}
      {step === "home" && (
        <div className="content fade">

          <h1>💖 Surprise 💖</h1>

          <pre>{text}</pre>

          <div className="photos">
            <img src="/Screenshot1.png" />
            <img src="/Screenshot2.png" />
          </div>

          <button onClick={() => setStep("dance")}>
            💃 Let’s Dance
          </button>

        </div>
      )}

      {/* 🎬 DANCE VIDEO */}
      {step === "dance" && (
        <div className="content fade">

          <h1>🎬 Our Moment</h1>

          <video autoPlay muted loop playsInline width="320">
            <source src="/video.mp4" type="video/mp4" />
          </video>

          <button onClick={() => setStep("final")}>
            💌 Final Message
          </button>

        </div>
      )}

      {/* 💌 FINAL LOVE LETTER */}
      {step === "final" && (
        <div className="content fade">

          <h1>💖 I Love You</h1>

          <p className="letter">
            You are not just my love... you are my peace, my home, my everything ❤️
          </p>

          <button
            onClick={() => {
              fireworks();
              setStep("home");
            }}
          >
            🔁 Replay
          </button>

        </div>
      )}

    </div>
  );
}