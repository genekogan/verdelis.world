// Eden API Client Library
// Based on https://github.com/edenartlab/hello-eden

const EDEN_API_BASE = process.env.EDEN_API_BASE || "https://api.eden.art";
const EDEN_API_KEY = process.env.EDEN_API_KEY;

// Types

export interface Task {
  _id: string;
  status: "pending" | "processing" | "completed" | "failed";
  creationId?: string;
  error?: string;
}

export interface Creation {
  _id: string;
  uri: string;
  width?: number;
  height?: number;
  mimeType?: string;
  prompt?: string;
  user?: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Agent {
  _id: string;
  name: string;
  username: string;
  description?: string;
  avatar?: string;
  persona?: string;
  voiceId?: string;
  llm?: string;
  tools?: string[];
}

export interface ToolCall {
  _id: string;
  tool: string;
  args: Record<string, unknown>;
  result?: unknown;
  cost?: number;
}

export interface SessionMessage {
  _id: string;
  role: "user" | "assistant" | "system";
  content: string;
  attachments?: string[];
  toolCalls?: ToolCall[];
  createdAt: string;
}

export interface Session {
  _id: string;
  agentId: string;
  messages: SessionMessage[];
  budget?: number;
  autonomy?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SessionCreateOptions {
  agentId: string;
  budget?: number;
  autonomy?: number;
  initialMessage?: string;
}

export interface CreationsResponse {
  creations: Creation[];
  nextCursor?: string;
}

export interface Collection {
  _id: string;
  name: string;
  description?: string;
  user?: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Helper for authenticated requests
async function edenFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${EDEN_API_BASE}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(EDEN_API_KEY ? { "X-Api-Key": EDEN_API_KEY } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Eden API error: ${response.status}`, error);
    throw new Error(`Eden API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Task Management

export async function createTask(
  prompt: string,
  options?: {
    model?: string;
    width?: number;
    height?: number;
  }
): Promise<Task> {
  return edenFetch<Task>("/v2/tasks/create", {
    method: "POST",
    body: JSON.stringify({
      prompt,
      ...options,
    }),
  });
}

export async function pollTask(taskId: string): Promise<Task> {
  return edenFetch<Task>(`/v2/tasks/${taskId}`);
}

// Creation Management

export async function getCreations(options?: {
  cursor?: string;
  limit?: number;
  type?: "image" | "video";
  userId?: string;
  agentId?: string;
  collectionId?: string;
}): Promise<CreationsResponse> {
  const params = new URLSearchParams();

  if (options?.cursor) params.set("cursor", options.cursor);
  if (options?.limit) params.set("limit", options.limit.toString());
  if (options?.type) params.set("type", options.type);
  if (options?.userId) params.set("userId", options.userId);
  if (options?.agentId) params.set("agentId", options.agentId);
  if (options?.collectionId) params.set("collectionId", options.collectionId);

  const queryString = params.toString();
  const endpoint = `/v2/feed-cursor/creations${queryString ? `?${queryString}` : ""}`;

  return edenFetch<CreationsResponse>(endpoint);
}

export async function getCreation(creationId: string): Promise<Creation> {
  return edenFetch<Creation>(`/v2/creations/${creationId}`);
}

// Collection Management

export async function getCollection(collectionId: string): Promise<Collection> {
  return edenFetch<Collection>(`/v2/collections/${collectionId}`);
}

export async function getCollectionCreations(
  collectionId: string,
  options?: {
    limit?: number;
    offset?: number;
  }
): Promise<Creation[]> {
  const params = new URLSearchParams();
  if (options?.limit) params.set("limit", options.limit.toString());
  if (options?.offset) params.set("offset", options.offset.toString());

  const queryString = params.toString();
  const endpoint = `/v2/collections/${collectionId}/creations${queryString ? `?${queryString}` : ""}`;

  return edenFetch<Creation[]>(endpoint);
}

export async function listUserCollections(): Promise<Collection[]> {
  return edenFetch<Collection[]>("/v2/collections/light");
}

// Agent Management

export async function listAgents(): Promise<Agent[]> {
  const response = await edenFetch<{ agents: Agent[] }>("/v2/agents");
  return response.agents;
}

export async function getAgent(agentId: string): Promise<Agent> {
  return edenFetch<Agent>(`/v2/agents/${agentId}`);
}

// Session Management

export async function createSession(
  options: SessionCreateOptions
): Promise<Session> {
  return edenFetch<Session>("/v2/sessions", {
    method: "POST",
    body: JSON.stringify(options),
  });
}

export async function getSession(sessionId: string): Promise<Session> {
  return edenFetch<Session>(`/v2/sessions/${sessionId}`);
}

export async function sendSessionMessage(
  sessionId: string,
  content: string,
  attachments?: string[]
): Promise<SessionMessage> {
  return edenFetch<SessionMessage>(`/v2/sessions/${sessionId}`, {
    method: "POST",
    body: JSON.stringify({
      content,
      attachments,
    }),
  });
}

// Artifact Types and Functions

export interface ArtifactCreation {
  creation: Creation;
  caption?: string;
}

export interface Artifact {
  _id: string;
  user?: {
    _id: string;
    username?: string;
    userImage?: string;
  };
  title: string;
  type: string;
  parent?: {
    _id: string;
    title: string;
    type: string;
  };
  agents?: Array<{
    _id: string;
    username?: string;
    name?: string;
    userImage?: string;
  }>;
  public: boolean;
  description?: string;
  session?: string;
  creations: ArtifactCreation[];
  createdAt: string;
  updatedAt: string;
}

export interface ArtifactsResponse {
  docs: Artifact[];
  total: number;
  limit: number;
  pages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

export async function listArtifacts(filters?: {
  page?: number;
  limit?: number;
  userId?: string;
  type?: string;
  agentId?: string;
  sessionId?: string;
}): Promise<ArtifactsResponse> {
  const params = new URLSearchParams();

  if (filters?.page) params.set("page", filters.page.toString());
  if (filters?.limit) params.set("limit", filters.limit.toString());
  if (filters?.userId) params.set("userId", filters.userId);
  if (filters?.type) params.set("type", filters.type);
  if (filters?.agentId) params.set("agentId", filters.agentId);
  if (filters?.sessionId) params.set("sessionId", filters.sessionId);

  const queryString = params.toString();
  const endpoint = `/v2/artifacts${queryString ? `?${queryString}` : ""}`;

  return edenFetch<ArtifactsResponse>(endpoint);
}

export async function getArtifact(artifactId: string): Promise<Artifact | null> {
  try {
    const response = await edenFetch<{ artifact: Artifact }>(`/v2/artifacts/${artifactId}`);
    return response.artifact || null;
  } catch {
    return null;
  }
}

// Utility: Wait for task completion with polling
export async function waitForTask(
  taskId: string,
  options?: {
    pollInterval?: number;
    maxAttempts?: number;
  }
): Promise<Task> {
  const pollInterval = options?.pollInterval || 2000;
  const maxAttempts = options?.maxAttempts || 60;

  for (let i = 0; i < maxAttempts; i++) {
    const task = await pollTask(taskId);

    if (task.status === "completed" || task.status === "failed") {
      return task;
    }

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error(`Task ${taskId} timed out after ${maxAttempts} attempts`);
}
