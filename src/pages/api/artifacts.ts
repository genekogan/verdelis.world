import { NextApiRequest, NextApiResponse } from "next";
import { listArtifacts, ArtifactsResponse } from "@/lib/eden";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ArtifactsResponse | { error: string; details?: string }>
) => {
  const { page, limit, userId, type, agentId, sessionId } = req.query;

  try {
    const response = await listArtifacts({
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : 20,
      userId: userId as string | undefined,
      type: type as string | undefined,
      agentId: agentId as string | undefined,
      sessionId: sessionId as string | undefined,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    return res.status(500).json({
      error: "Failed to fetch artifacts",
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export default handler;
