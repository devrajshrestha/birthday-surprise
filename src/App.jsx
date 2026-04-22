import { useEffect, useState } from "react";

export default function App() {
  const [stage, setStage] = useState("intro");
  const [text, setText] = useState("");

  const message = `Happy Birthday Usha Shrestha 💖

You are my favorite person in this world.

Every moment with you feels like a movie.

I just want you to smile forever ❤️`;

  // typing effect
  useEffect(() => {
    if (stage !== "message") return;

    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [stage]);

  // play music safely (mobile fix)
  const playMusic = () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.play().catch(() => {
        console.log("User interaction required");
      });
    }
  };

  return (
    <div className="app">

      {/* 🎵 MUSIC */}
      <audio id="bg-music" loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* 💖 FLOATING HEARTS (non-blocking clicks) */}
      <div className="hearts">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="heart">💖</span>
        ))}
      </div>

      {/* 🎬 INTRO */}
      {stage === "intro" && (
        <div className="screen">
          <h1>🎬 A Cinematic Surprise</h1>
          <p>Made with love ❤️</p>

          <button onClick={() => setStage("gift")}>
            Start Surprise
          </button>
        </div>
      )}

      {/* 🎁 GIFT */}
      {stage === "gift" && (
        <div className="screen">
          <div
            className="gift"
            onClick={() => {
              playMusic();
              setStage("message");
            }}
          >
            🎁
          </div>
          <p>Tap the gift</p>
        </div>
      )}

      {/* 💌 MESSAGE */}
      {stage === "message" && (
        <div className="screen">
          <h2>💖 Happy Birthday 💖</h2>

          <pre className="text">{text}</pre>

          <div className="photos">
            <img src="/Screenshot1.png" />
            <img src="/Screenshot2.png" />
          </div>

          <button onClick={() => setStage("video")}>
            🎬 Next Scene
          </button>
        </div>
      )}

      {/* 🎥 VIDEO */}
      {stage === "video" && (
        <div className="screen">
          <h2>Our Memory 🎥</h2>

          <video autoPlay muted loop playsInline className="video">
            <source src="/video.mp4" type="video/mp4" />
          </video>

          <button onClick={() => setStage("ending")}>
            ❤️ Final Surprise
          </button>
        </div>
      )}

      {/* 💖 ENDING */}
      {stage === "ending" && (
        <div className="screen ending">
          <h1>💖 I Love You 💖</h1>
          <p>You are my forever happiness</p>
          <div className="fireworks">🎆 ✨ 🎇</div>
        </div>
      )}

    </div>
  );
}