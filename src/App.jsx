import { useState, useRef } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);

  const [page, setPage] = useState("home");
  const [cakeCut, setCakeCut] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const bgMusicRef = useRef(null);
  const birthdayRef = useRef(null);

  const startApp = () => setStarted(true);

  // 🎂 BIRTHDAY SONG (ONLY CAKE CUT)
  const playBirthday = () => {
    birthdayRef.current.currentTime = 0;
    birthdayRef.current?.play().catch(() => {});
  };

  const stopBirthday = () => {
    birthdayRef.current?.pause();
    birthdayRef.current.currentTime = 0;
  };

  // 🎵 BACKGROUND MUSIC (ONLY AFTER CAKE PAGE)
  const startMusic = () => {
    bgMusicRef.current?.play().catch(() => {});
  };

  const goTo = (next) => {
    // when leaving cake page → stop birthday + start music
    if (page === "cake") {
      stopBirthday();
      startMusic();
    }

    setPage(next);
  };

  return (
    <div className="app">

      {/* 🎵 BACKGROUND MUSIC (AFTER CAKE ONLY) */}
      <audio ref={bgMusicRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* 🎂 BIRTHDAY MUSIC */}
      <audio ref={birthdayRef}>
        <source src="/birthday.mp3" type="audio/mp3" />
      </audio>

      {/* 💖 FLOATING HEARTS */}
      <div className="hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="heart">💖</span>
        ))}
      </div>

      {/* 🏠 START PAGE */}
      {!started && (
        <div className="page fade-in">
          <h1 className="title">💖 Welcome 💖</h1>

          <input
            className="input"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={startApp} disabled={!name}>
            Start Surprise 💕
          </button>
        </div>
      )}

      {/* 💌 MESSAGE PAGE */}
      {started && page === "home" && (
        <div className="page slide-up">

          <h2>Happy Birthday {name} 💕</h2>

          <p>I can't be there physically, so let's celebrate your special day virtually 💖</p>

          <div className="image-grid">
            <img src="/img1.png" className="image float" />
            <img src="/img2.png" className="image float" />
          </div>

          <button onClick={() => goTo("cake")}>
            Shall we? 💖
          </button>
        </div>
      )}

      {/* 🎂 CAKE PAGE */}
      {page === "cake" && (
        <div className="page zoom-in">

          <h2>🎂 Happy Birthday 🎂</h2>

          <div className="cake-container">

            <div className={`cake-wrapper ${cakeCut ? "cut" : ""}`}>

              <div className="cake-half left">
                <img src="/cake.png" />
              </div>

              <div className="cake-half right">
                <img src="/cake.png" />
              </div>

            </div>

            <div className={`knife ${cakeCut ? "knife-down" : ""}`}>
              🔪
            </div>

          </div>

          {cakeCut && <div className="confetti">🎉 🎊 🎉 🎊 🎉</div>}

          {!cakeCut ? (
            <button onClick={() => {
              setCakeCut(true);
              playBirthday(); // 🎂 ONLY HERE
            }}>
              Let’s cut the cake 🎂
            </button>
          ) : (
            <button onClick={() => goTo("dance")}>
              Next 💃
            </button>
          )}
        </div>
      )}

      {/* 💃 VIDEO PAGE */}
      {page === "dance" && (
        <div className="page fade-in">

          <h2>Let's enjoy this moment 💃❤️</h2>

          {!showVideo ? (
            <button onClick={() => setShowVideo(true)}>
              Will you? 💖
            </button>
          ) : (
            <>
              <video
                className="video pop"
                autoPlay
                muted
                loop
                playsInline
                controls
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>

              <button onClick={() => goTo("final")}>
                ❤️ Final Message
              </button>
            </>
          )}
        </div>
      )}

      {/* 💖 FINAL PAGE */}
      {page === "final" && (
        <div className="page final glow-bg">

          <h1 className="glow">💖 Happy Birthday {name} 💖</h1>

          <p className="love-text">
            Happy birthday baby 💕 <br /><br />
            You are my favorite person in this world 🌍❤️ <br /><br />
            Every moment with you feels like a movie 🎬✨ <br /><br />
            I just want you to smile forever 😊💖
          </p>

          <div className="love-hearts bounce">
            💖 💕 ❤️ 💞 💘
          </div>

        </div>
      )}

    </div>
  );
}