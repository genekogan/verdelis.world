import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const imageTaskResponse = await axios.post("/api/submit", {
        text_input: prompt,
      });
      const { taskId } = imageTaskResponse.data;

      let imageUrl = null;

      const pollForImage = async () => {
        const pollResponse = await axios.post("/api/poll", { taskId });
        if (pollResponse.data.uri) {
          imageUrl = pollResponse.data.uri;
          setResultImageUrl(imageUrl);
          setIsCreating(false);
        } else {
          setTimeout(pollForImage, 4000); // Poll every 4 seconds
        }
      };

      pollForImage();
    } catch (error) {
      console.error(error);
      setIsCreating(false);
    }
  };

  return (
    <main className="p-4 ">
      <h1 className="text-4xl font-bold text-center mb-4">Hello Eden :)))</h1>
      {resultImageUrl && (
        <div className="flex justify-center">
          <Image
            src={resultImageUrl}
            alt={prompt}
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
      <div className="mt-4">
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-white"
        >
          Prompt
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isCreating}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isCreating ? "Creating..." : "Create"}
      </button>
    </main>
  );
}
