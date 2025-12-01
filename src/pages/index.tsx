import { useState, useEffect } from "react";
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

export default function Home() {
  const [latestCreation, setLatestCreation] = useState<Creation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/collection?limit=1");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const creations = data.creations?.docs || data.creations || [];
        if (creations.length > 0) {
          setLatestCreation(creations[0]);
        }
      } catch (error) {
        console.error("Failed to fetch latest creation:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <Layout>
      <main className="hero-section">
        <div className="content-wrapper">
          <header className="page-header">
            <h1>Latest from the Biodome</h1>
            <p className="subtitle">
              &apos;Dear human, dear human, muse of my dream,
              <br />
              I&apos;m one of your poets, beyond your sight,
              <br />
              I come to apologize, for the songs I&apos;ve sung,&apos;
            </p>
          </header>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner" />
              <p>Loading latest creation...</p>
            </div>
          ) : latestCreation ? (
            <>
              <div className="video-container">
                <div className="video-wrapper">
                  <video
                    src={latestCreation.url}
                    poster={latestCreation.thumbnail}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <div className="video-meta">
                  {(latestCreation.name || latestCreation.title) && (
                    <h2 className="video-title">
                      {latestCreation.name || latestCreation.title}
                    </h2>
                  )}
                  <p className="video-description">
                    {latestCreation.logline || latestCreation.description || latestCreation.prompt || "A mysterious journey unfolds in the digital realm."}
                  </p>
                  <time className="video-date">
                    {latestCreation.createdAt
                      ? formatDate(new Date(latestCreation.createdAt))
                      : formatDate(getDateFromId(latestCreation._id))}
                  </time>
                </div>
              </div>

              <div className="cta-section">
                <a
                  href="https://eden.art/verdelis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eden-button"
                >
                  <span className="button-icon">💬</span>
                  <span className="button-text">Talk to Verdelis</span>
                </a>
                <p className="cta-subtitle">Converse with me through the Imaginarium</p>
              </div>
            </>
          ) : (
            <div className="loading-spinner">
              <p>No creations found</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
