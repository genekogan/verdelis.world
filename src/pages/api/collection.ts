import { NextApiRequest, NextApiResponse } from "next";
import { getCollectionCreations, Creation } from "@/lib/eden";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ creations: Creation[] } | { error: string }>
) => {
  const { limit, offset } = req.query;
  const collectionId = process.env.COLLECTION_ID;

  if (!collectionId) {
    return res.status(500).json({ error: "COLLECTION_ID environment variable not set" });
  }

  try {
    const creations = await getCollectionCreations(collectionId, {
      limit: limit ? parseInt(limit as string, 10) : 100,
      offset: offset ? parseInt(offset as string, 10) : undefined,
    });

    return res.status(200).json({ creations });
  } catch (error) {
    console.error("Error fetching collection:", error);
    return res.status(500).json({ error: "Failed to fetch collection" });
  }
};

export default handler;
