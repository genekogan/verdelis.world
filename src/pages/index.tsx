import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Add a loading state

  const fetchStories = async () => {
    setIsLoading(true);
    console.log("fetching stories");
    const res = await fetch("https://edenartlab--eden-little-martians-fastapi-app.modal.run/stories/verdelis");
    console.log(res);
    const data = await res.json();
    console.log(data);

    setStories(data);
    setIsLoading(false); 
  };

  useEffect(() => {
    fetchStories();
  }, []);
  
  return (
    <main className="p-4 ">
      <h1 className="text-4xl font-bold text-center mb-4">Verdelis!</h1>
      {isLoading ? (
        <div className="text-center"><h2>Loading...</h2></div>
      ) : (
        stories.map((story, index) => (
          <div key={index} className="flex flex-col items-center justify-center" style={{ marginTop: "100px" }}>
            <video controls loop muted autoPlay>
              <source src={story["url"]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <p className="text-center"> */}
              <h2>
              {new Date(story["timestamp"] * 1000).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
              </h2>
              <h3>
                {story["story"]}
              </h3>
          {/* </p> */}
            <hr/>
          </div>
        ))
      )}
    </main>
  );
}
