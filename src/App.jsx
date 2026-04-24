// App.jsx
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState("home");
  const [cakeCut, setCakeCut] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [cutProgress, setCutProgress] = useState(0);
  const [isCakeAnimating, setIsCakeAnimating] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const bgMusicRef = useRef(null);
  const birthdayRef = useRef(null);
  const videoRef = useRef(null);

  // Photos for memories page
  const memories = [
  { id: 1, src: "/1.jpg", title: "Teddia Street Magic", subtitle: "Where our story began 💫" },
  { id: 2, src: "/3.jpg", title: "Victory Dance", subtitle: "Champions of Love 🏆" },
  { id: 3, src: "/5.jpg", title: "Perfectly Imperfect", subtitle: "Real love, real moments 💕" },
  { id: 4, src: "/11.jpg", title: "Triple Fortune", subtitle: "Lucky to have you 福" },
  { id: 5, src: "/5.jpg", title: "Beautiful Disaster", subtitle: "Love in every moment 💖" },
  { id: 6, src: "/6.jpg", title: "Golden Hour", subtitle: "Our best times together 🌅" },
  { id: 7, src: "/7.jpg", title: "Heartbeat", subtitle: "You make my heart sing 💓" },
  { id: 8, src: "/8.jpg", title: "Wanderlust", subtitle: "Exploring love together 🌍" },
  { id: 9, src: "/9.jpg", title: "Perfect Picture", subtitle: "You + Me = Forever 📸" },
  { id: 10, src: "/10.jpg", title: "Dream Weaver", subtitle: "Making dreams come true ✨" },
  { id: 11, src: "/11.jpg", title: "Lucky Charm", subtitle: "Blessed with your love 🍀" },
  { id: 12, src: "/12.jpg", title: "Soulmates", subtitle: "Two hearts, one love 💑" },
  { id: 13, src: "/13.jpg", title: "Timeless", subtitle: "Moments that last forever ⏰" },
  { id: 14, src: "/14.jpg", title: "Ever After", subtitle: "Our happily ever after 👑" }
];

  useEffect(() => {
    const enableAudio = () => {
      if (bgMusicRef.current && page !== "cake" && page !== "home") {
        bgMusicRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);
    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
  }, [page]);

  const startApp = () => setStarted(true);

  const playBirthday = () => {
    if (birthdayRef.current) {
      birthdayRef.current.currentTime = 0;
      birthdayRef.current?.play().catch(() => {});
    }
  };

  const stopBirthday = () => {
    if (birthdayRef.current) {
      birthdayRef.current?.pause();
      birthdayRef.current.currentTime = 0;
    }
  };

  const startMusic = () => {
    bgMusicRef.current?.play().catch(() => {});
  };

  const goTo = (next) => {
    if (page === "cake") {
      stopBirthday();
      startMusic();
    }
    setPage(next);
  };

  const startCakeCutting = () => {
    setIsCakeAnimating(true);
    playBirthday();
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setCutProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsCakeAnimating(false);
        setCakeCut(true);
      }
    }, 40);
  };

  return (
    <div className="app">
      {/* Romantic Animated Background */}
      <div className="romantic-bg">
        <div className="aurora"></div>
        <div className="falling-petals">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="petal" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              opacity: 0.4 + Math.random() * 0.5
            }}>🌸</div>
          ))}
        </div>
        <div className="sparkles">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="sparkle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}>✨</div>
          ))}
        </div>
        <div className="floating-roses">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rose">🌹</div>
          ))}
        </div>
        <div className="bokeh"></div>
      </div>

      {/* Audio Elements */}
      <audio ref={bgMusicRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>
      <audio ref={birthdayRef}>
        <source src="/birthday.mp3" type="audio/mp3" />
      </audio>

      {/* Floating Hearts */}
      <div className="hearts">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="heart">💖</span>
        ))}
      </div>

      {/* START PAGE */}
      {!started && (
        <div className="page fade-in">
          <div className="glass-card">
            <div className="floating-emoji">🎂 🎈 🎁 💖</div>
            <h1 className="title">💖 Welcome to Your Special Day 💖</h1>
            <p className="subtitle">A magical birthday surprise awaits...</p>
            <input
              className="input"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && name && startApp()}
            />
            <button onClick={startApp} disabled={!name}>
              Begin the Magic ✨
            </button>
          </div>
        </div>
      )}

      {/* MESSAGE PAGE */}
      {started && page === "home" && (
        <div className="page slide-up">
          <div className="glass-card">
            <div className="emoji-float">💕 💖 💗 💓 💞</div>
            <h2>Happy Birthday {name}! 🎉</h2>
            <p className="message-text">
              Even though miles may separate us, my heart is right there with you today 💖
              <br /><br />
              Let's make this virtual celebration unforgettable! ✨
            </p>
            <div className="button-group">
              <button onClick={() => goTo("memories")}>
                Our Memories 📸
              </button>
              <button onClick={() => goTo("cake")}>
                Let's Cut the Cake! 🎂
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OUR MEMORIES PAGE */}
      {page === "memories" && (
        <div className="page slide-up">
          <div className="glass-card memories-card">
            <h2>📸 Our Beautiful Memories 📸</h2>
            <p className="message-text">Every picture tells our love story...</p>
            
            <div className="memories-grid">
              {memories.map((memory) => (
                <div 
                  key={memory.id} 
                  className="memory-card"
                  onClick={() => setSelectedPhoto(memory)}
                >
                  <img src={memory.src} alt={memory.title} />
                  <div className="memory-overlay">
                    <h4>{memory.title}</h4>
                    <p>{memory.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox for selected photo */}
            {selectedPhoto && (
              <div className="lightbox" onClick={() => setSelectedPhoto(null)}>
                <div className="lightbox-content">
                  <span className="close-lightbox">&times;</span>
                  <img src={selectedPhoto.src} alt={selectedPhoto.title} />
                  <h3>{selectedPhoto.title}</h3>
                  <p>{selectedPhoto.subtitle}</p>
                </div>
              </div>
            )}

            <button onClick={() => goTo("cake")} className="next-btn">
              Continue to Cake 🎂
            </button>
          </div>
        </div>
      )}

      {/* CAKE PAGE - Animated Cake Slicing */}
      {page === "cake" && (
        <div className="page zoom-in">
          <div className="glass-card cake-card">
            <h2>🎂 Time to Celebrate! 🎂</h2>
            <p className="cake-instruction">
              {!cakeCut ? "🎈 Tap the cake to start slicing! 🎈" : "The cake is beautifully sliced! 🎉"}
            </p>

            <div className="cake-cutting-container">
              {/* Whole Cake */}
              <div className={`cake-whole ${cakeCut ? "fade-out" : ""}`}>
                <div className="cake-3d">
                  <div className="cake-layer bottom-layer"></div>
                  <div className="cake-layer middle-layer"></div>
                  <div className="cake-layer top-layer"></div>
                  <div className="cake-candles">
                    <div className="candle"></div>
                    <div className="candle"></div>
                    <div className="candle"></div>
                    <div className="candle"></div>
                    <div className="candle"></div>
                  </div>
                  <div className="cake-flame"></div>
                </div>
                <img src="/cake.png" alt="Birthday Cake" className="cake-image" />
                {!cakeCut && !isCakeAnimating && (
                  <div className="cut-overlay" onClick={startCakeCutting}>
                    <span className="cut-hint">🔪 Tap to Slice 🔪</span>
                  </div>
                )}
                {isCakeAnimating && (
                  <div className="cutting-animation">
                    <div className="knife-cut" style={{ left: `${cutProgress}%` }}>🔪</div>
                    <div className="cut-particles">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} className="particle">✨</span>
                      ))}
                    </div>
                    <div className="cut-progress">
                      <div className="progress-bar" style={{ width: `${cutProgress}%` }}></div>
                    </div>
                    <p className="cutting-text">Slicing the cake... {cutProgress}%</p>
                  </div>
                )}
              </div>

              {/* Sliced Cake Pieces */}
              {cakeCut && (
                <div className="cake-slices">
                  <div className="cake-slice slice-1 animate-slice">
                    <div className="slice-inner">
                      <img src="/cake.png" alt="Slice 1" />
                      <span className="slice-label">For You 💖</span>
                    </div>
                  </div>
                  <div className="cake-slice slice-2 animate-slice">
                    <div className="slice-inner">
                      <img src="/cake.png" alt="Slice 2" />
                      <span className="slice-label">For Me 💕</span>
                    </div>
                  </div>
                  <div className="cake-slice slice-3 animate-slice">
                    <div className="slice-inner">
                      <img src="/cake.png" alt="Slice 3" />
                      <span className="slice-label">For Us 💑</span>
                    </div>
                  </div>
                  <div className="cake-slice slice-4 animate-slice">
                    <div className="slice-inner">
                      <img src="/cake.png" alt="Slice 4" />
                      <span className="slice-label">Forever ❤️</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cakeCut && (
              <div className="confetti-container">
                <div className="confetti">🎉 🎊 🎉 🎊 🎉 🎊 🎉</div>
                <button onClick={() => goTo("dance")} className="next-btn">
                  Continue the Celebration 💃
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ROMANTIC VIDEO PAGE */}
      {page === "dance" && (
        <div className="page fade-in">
          <div className="glass-card video-card">
            <h2>💖 Our Romantic Journey 💖</h2>
            <p className="message-text">A special video made with love, just for us...</p>
            
            {!showVideo ? (
              <button onClick={() => setShowVideo(true)} className="play-btn">
                ▶️ Play Our Romantic Video 💖
              </button>
            ) : (
              <>
                <div className="video-container">
                  <video
                    ref={videoRef}
                    className="romantic-video"
                    autoPlay
                    playsInline
                    controls
                    controlsList="nodownload"
                  >
                    <source src="/video.mp4" type="video/mp4" />
                  </video>
                  <div className="video-overlay-text">
                    <span>💕 Forever & Always 💕</span>
                  </div>
                </div>
                <button onClick={() => goTo("final")} className="next-btn">
                  Read My Final Message ❤️
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* FINAL PAGE */}
      {page === "final" && (
        <div className="page final">
          <div className="glass-card final-glass">
            <div className="floating-hearts">💖 💕 ❤️ 💞 💘 💖</div>
            <h1 className="glow">✨ Happy Birthday {name}! ✨</h1>
            
            <div className="love-letter">
              <p className="love-text">
                My Dearest {name}, 💕
              </p>
              <p className="love-text">
                You are the most beautiful thing that has ever happened to me. 
                Every day with you feels like a dream I never want to wake up from. 🌙✨
              </p>
              <p className="love-text">
                Your smile lights up my world, your laughter is my favorite melody, 
                and your love is the greatest gift I've ever received. 🎁💖
              </p>
              <p className="love-text">
                I promise to cherish every moment with you, to stand by your side 
                through everything, and to love you more with each passing day. 💑
              </p>
              <p className="love-text signature">
                Forever yours, ❤️<br />
                With all my love... 🌹
              </p>
            </div>

            <div className="love-hearts bounce">
              💖 💕 ❤️ 💞 💘 💝 💗
            </div>
            
            <button className="replay-btn" onClick={() => window.location.reload()}>
              Share This Love Again 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}