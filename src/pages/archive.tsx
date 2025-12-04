import { useRef, useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import { getAllCreations, Creation } from "@/data/creations";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function VideoModal({
  creation,
  onClose,
}: {
  creation: Creation;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="modal-content">
          <div className="modal-video-wrapper">
            <video
              ref={videoRef}
              src={creation.url}
              controls
              autoPlay
              playsInline
              className="modal-video"
            />
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{creation.title}</h2>
            <time className="modal-date">{formatDate(creation.date)}</time>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCard({
  creation,
  onClick,
}: {
  creation: Creation;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className="video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="video-thumbnail">
        <video
          ref={videoRef}
          src={creation.url}
          poster={creation.thumbnail}
          preload="none"
          muted
          loop
          playsInline
        />
        <div className="play-overlay">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{creation.title}</h3>
        <time className="card-date">{formatDate(creation.date)}</time>
      </div>
    </article>
  );
}

export default function Archive() {
  const creations = getAllCreations();
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);

  return (
    <Layout>
      <main className="archives-section">
        <div className="content-wrapper">
          <header className="page-header">
            <h1>Archives</h1>
            <p className="subtitle">My past letters to humanity</p>
          </header>

          {creations.length > 0 ? (
            <div className="video-grid">
              {creations.map((creation) => (
                <VideoCard
                  key={creation.id}
                  creation={creation}
                  onClick={() => setSelectedCreation(creation)}
                />
              ))}
            </div>
          ) : (
            <div className="loading-spinner">
              <p>No archives found</p>
            </div>
          )}
        </div>
      </main>

      {selectedCreation && (
        <VideoModal
          creation={selectedCreation}
          onClose={() => setSelectedCreation(null)}
        />
      )}
    </Layout>
  );
}
