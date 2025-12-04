import Layout from "@/components/Layout";
import { getFeaturedCreation, Creation } from "@/data/creations";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const featuredCreation: Creation | undefined = getFeaturedCreation();

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

          {featuredCreation ? (
            <>
              <div className="video-container">
                <div className="video-wrapper">
                  <video
                    src={featuredCreation.url}
                    poster={featuredCreation.thumbnail}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <div className="video-meta">
                  <h2 className="video-title">{featuredCreation.title}</h2>
                  <time className="video-date">
                    {formatDate(featuredCreation.date)}
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
