import { useState, useEffect } from "react";
import Image from "next/image";

interface Creation {
  _id: string;
  url: string;
  thumbnail: string;
  filename: string;
  name?: string;
  title?: string;
  logline?: string;
  description?: string;
  prompt?: string;
  createdAt?: string;
  mediaAttributes: {
    mimeType: string;
    width: number;
    height: number;
    duration?: number;
  };
}

function getDateFromId(id: string): Date {
  const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
  return new Date(timestamp);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CollectionGallery() {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/collection");
        if (!res.ok) throw new Error("Failed to fetch collection");
        const data = await res.json();
        const items = data.creations?.docs || data.creations?.creations || [];
        setCreations(items);
      } catch (err) {
        console.error(err);
        setError("Failed to load collection");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreations();
  }, []);

  const mainCreation = creations[0];
  const pastCreations = creations.slice(1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d1a0d] to-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Image
            src="/images/verdelis-face.png"
            alt="Verdelis"
            width={40}
            height={40}
            className="opacity-90"
          />
          <Image
            src="/images/verdelis-text.png"
            alt="Verdelis"
            width={100}
            height={24}
            className="opacity-80"
          />
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-white/40 text-sm tracking-wide">Loading creations...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero - Featured Creation */}
          {mainCreation && (
            <section className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
              </div>

              <div className="relative max-w-6xl mx-auto px-6 py-12">
                {/* Featured badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium tracking-wide">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    FEATURED
                  </span>
                </div>

                {/* Video container with cinematic frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
                  <video
                    src={mainCreation.url}
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full aspect-video object-cover"
                  />
                </div>

                {/* Info overlay below video */}
                <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                      {mainCreation.name || mainCreation.title || "Latest Creation"}
                    </h1>
                    <p className="text-white/50 mt-2 text-lg max-w-2xl leading-relaxed">
                      {mainCreation.logline || mainCreation.description || mainCreation.prompt || "A mysterious journey unfolds in the digital realm."}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-white/30 text-sm uppercase tracking-widest">Created</p>
                    <p className="text-white/70 font-medium">
                      {mainCreation.createdAt
                        ? formatDate(new Date(mainCreation.createdAt))
                        : formatDate(getDateFromId(mainCreation._id))}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Divider */}
          {pastCreations.length > 0 && (
            <div className="max-w-7xl mx-auto px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          )}

          {/* Past Creations Grid */}
          {pastCreations.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-white/80 tracking-wide">Archive</h2>
                <span className="text-white/30 text-sm">{pastCreations.length} creation{pastCreations.length !== 1 ? 's' : ''}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastCreations.map((creation) => (
                  <article
                    key={creation._id}
                    className="group relative bg-white/[0.02] rounded-xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <video
                        src={creation.url}
                        poster={creation.thumbnail}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                      {/* Play indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-white/90 truncate">
                          {creation.name || creation.title || "Creation"}
                        </h3>
                      </div>
                      <p className="text-xs text-white/30 mt-1">
                        {creation.createdAt
                          ? formatDate(new Date(creation.createdAt))
                          : formatDate(getDateFromId(creation._id))}
                      </p>
                      <p className="text-sm text-white/40 mt-2 line-clamp-2 leading-relaxed">
                        {creation.logline || creation.description || creation.prompt || "A mysterious journey unfolds in the digital realm."}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {creations.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <p className="text-white/30">No creations found</p>
            </div>
          )}
        </>
      )}

      {/* Footer accent */}
      <div className="h-32 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
    </main>
  );
}
