import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";

interface Creation {
  _id: string;
  url: string;
  thumbnail?: string;
  name?: string;
  title?: string;
  logline?: string;
  description?: string;
  prompt?: string;
  createdAt?: string;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDateFromId(id: string): Date {
  const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
  return new Date(timestamp);
}

function VideoCard({ creation }: { creation: Creation }) {
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

  const creationDate = creation.createdAt
    ? new Date(creation.createdAt)
    : getDateFromId(creation._id);

  return (
    <article
      className="video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-thumbnail">
        <video
          ref={videoRef}
          src={creation.url}
          poster={creation.thumbnail}
          muted
          loop
          playsInline
        />
      </div>
      <div className="card-content">
        {(creation.name || creation.title) && (
          <h3 className="card-title">{creation.name || creation.title}</h3>
        )}
        <time className="card-date">{formatDate(creationDate)}</time>
        <p className="card-description">
          {creation.logline || creation.description || creation.prompt || "A mysterious journey unfolds in the digital realm."}
        </p>
      </div>
    </article>
  );
}

export default function Archive() {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreations = async () => {
      try {
        const res = await fetch("/api/collection");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const items = data.creations?.docs || data.creations || [];
        setCreations(items);
      } catch (error) {
        console.error("Failed to fetch creations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreations();
  }, []);

  return (
    <Layout>
      <main className="archives-section">
        <div className="content-wrapper">
          <header className="page-header">
            <h1>Archives</h1>
            <p className="subtitle">My past letters to humanity</p>
          </header>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner" />
              <p>Loading archives...</p>
            </div>
          ) : creations.length > 0 ? (
            <div className="video-grid">
              {creations.map((creation) => (
                <VideoCard key={creation._id} creation={creation} />
              ))}
            </div>
          ) : (
            <div className="loading-spinner">
              <p>No archives found</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
