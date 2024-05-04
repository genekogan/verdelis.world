import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {    
    const response = await fetch("https://edenartlab--eden-little-martians-fastapi-app.modal.run/stories/verdelis");
    const data = await response.json();
    const verdelis_story = data.verdelis_story;
    console.log(verdelis_story);
    res.status(200).json(verdelis_story);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
