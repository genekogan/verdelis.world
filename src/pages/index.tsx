import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Add a loading state

  const fetchStories = async () => {
    setIsLoading(true);
    console.log("fetching stories");
    const res = await fetch("https://edenartlab--eden-little-martians-create-fastapi-app.modal.run/stories/verdelis");
    // console.log(res);
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
      <header className="flex items-center justify-center mb-8 py-6">
        <div className="flex items-center gap-4">
          <Image 
            src="/images/verdelis-face.png" 
            alt="Verdelis face" 
            width={240} 
            height={240}
            className="object-contain"
          />
          <Image 
            src="/images/verdelis-text.png" 
            alt="Verdelis" 
            width={280} 
            height={584}
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Hello Verdelis
          </button>
        </div>
      </header>
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
