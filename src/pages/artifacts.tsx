import { useState, useEffect } from "react";

export default function ArtifactsPage() {
  const [artifacts, setArtifacts] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await fetch("/api/artifacts");
        const data = await res.json();
        setArtifacts(data);
      } catch (err) {
        console.error(err);
        setArtifacts({ error: "Failed to fetch artifacts" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtifacts();
  }, []);

  if (isLoading) {
    return <pre style={{ padding: 20 }}>Loading...</pre>;
  }

  return (
    <pre style={{ padding: 20, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {JSON.stringify(artifacts, null, 2)}
    </pre>
  );
}
