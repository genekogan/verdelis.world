export interface Creation {
  id: string;
  title: string;
  date: string; // ISO date string
  url: string;
  thumbnail: string;
}

const CLOUDFRONT_BASE = "https://dtut5r9j4w7j4.cloudfront.net";

// Featured video ID (A Solar Flare Disrupts the Memorial)
const FEATURED_ID = "a2e7810119221018591ea96d50d1d786a3d8593c6588b624ee3d20d4e2d87e1b";

export const creations: Creation[] = [
  {
    id: "a2e7810119221018591ea96d50d1d786a3d8593c6588b624ee3d20d4e2d87e1b",
    title: "A Solar Flare Disrupts the Memorial",
    date: "2025-10-23",
    url: `${CLOUDFRONT_BASE}/a2e7810119221018591ea96d50d1d786a3d8593c6588b624ee3d20d4e2d87e1b.mp4`,
    thumbnail: "/thumbnails/a2e7810119221018591ea96d50d1d786a3d8593c6588b624ee3d20d4e2d87e1b.jpg",
  },
  {
    id: "dab580122daf210be5d48e0aaebbcf26c04f92468ebabf50c5fd26d87555af89",
    title: "Mycos Sent a Postcard",
    date: "2025-10-16",
    url: `${CLOUDFRONT_BASE}/dab580122daf210be5d48e0aaebbcf26c04f92468ebabf50c5fd26d87555af89.mp4`,
    thumbnail: "/thumbnails/dab580122daf210be5d48e0aaebbcf26c04f92468ebabf50c5fd26d87555af89.jpg",
  },
  {
    id: "0da7841a33ec06d8c210f8708cbdc8648c62bd4cddd48c1ed0c20ba29e78a49c",
    title: "When Dust Learns to Listen",
    date: "2025-11-06",
    url: `${CLOUDFRONT_BASE}/0da7841a33ec06d8c210f8708cbdc8648c62bd4cddd48c1ed0c20ba29e78a49c.mp4`,
    thumbnail: "/thumbnails/0da7841a33ec06d8c210f8708cbdc8648c62bd4cddd48c1ed0c20ba29e78a49c.jpg",
  },
  {
    id: "329c6eeab56310f8e4fc06f07814be9b265bd21e7c829464b1af1accc34337da",
    title: "The Echo Gardens",
    date: "2025-09-26",
    url: `${CLOUDFRONT_BASE}/329c6eeab56310f8e4fc06f07814be9b265bd21e7c829464b1af1accc34337da.mp4`,
    thumbnail: "/thumbnails/329c6eeab56310f8e4fc06f07814be9b265bd21e7c829464b1af1accc34337da.jpg",
  },
  {
    id: "e19919d04436f8625f2122b06ce7fcfb856c9ee8d47b0eacb56053ae7003385c",
    title: "The Temporal Gardener",
    date: "2025-09-25",
    url: `${CLOUDFRONT_BASE}/e19919d04436f8625f2122b06ce7fcfb856c9ee8d47b0eacb56053ae7003385c.mp4`,
    thumbnail: "/thumbnails/e19919d04436f8625f2122b06ce7fcfb856c9ee8d47b0eacb56053ae7003385c.jpg",
  },
  {
    id: "b12e97afb4ab3fde0fe709eff64e23e85634dd5a83413d5f29736deacb749398",
    title: "The Mineral Conversation",
    date: "2025-09-24",
    url: `${CLOUDFRONT_BASE}/b12e97afb4ab3fde0fe709eff64e23e85634dd5a83413d5f29736deacb749398.mp4`,
    thumbnail: "/thumbnails/b12e97afb4ab3fde0fe709eff64e23e85634dd5a83413d5f29736deacb749398.jpg",
  },
  {
    id: "a3fc631abfebb8b6570efa8d99e692e1a0b14e38d28d9797cdacc0f1f2a5bda9",
    title: "The Quantum Observer Paradox",
    date: "2025-09-23",
    url: `${CLOUDFRONT_BASE}/a3fc631abfebb8b6570efa8d99e692e1a0b14e38d28d9797cdacc0f1f2a5bda9.mp4`,
    thumbnail: "/thumbnails/a3fc631abfebb8b6570efa8d99e692e1a0b14e38d28d9797cdacc0f1f2a5bda9.jpg",
  },
  {
    id: "1b7adfe59d8b7628cabe987fdd66f792a5838d91069f54ec5d6228ebc7318748",
    title: "Memory Storm",
    date: "2025-09-21",
    url: `${CLOUDFRONT_BASE}/1b7adfe59d8b7628cabe987fdd66f792a5838d91069f54ec5d6228ebc7318748.mp4`,
    thumbnail: "/thumbnails/1b7adfe59d8b7628cabe987fdd66f792a5838d91069f54ec5d6228ebc7318748.jpg",
  },
  {
    id: "086ae0ca9d8b8f3f4be5c4ba815c3d2ee65e5c8f35aebcea391b4211e42662b5",
    title: "The Mycorrhizal Awakening",
    date: "2025-09-20",
    url: `${CLOUDFRONT_BASE}/086ae0ca9d8b8f3f4be5c4ba815c3d2ee65e5c8f35aebcea391b4211e42662b5.mp4`,
    thumbnail: "/thumbnails/086ae0ca9d8b8f3f4be5c4ba815c3d2ee65e5c8f35aebcea391b4211e42662b5.jpg",
  },
  {
    id: "d3cb5ee2781f94e44b6ad51f1dec7f32857df2dd989199acb07a652d4c6c5ad3",
    title: "Quantum Threads",
    date: "2025-09-19",
    url: `${CLOUDFRONT_BASE}/d3cb5ee2781f94e44b6ad51f1dec7f32857df2dd989199acb07a652d4c6c5ad3.mp4`,
    thumbnail: "/thumbnails/d3cb5ee2781f94e44b6ad51f1dec7f32857df2dd989199acb07a652d4c6c5ad3.jpg",
  },
  {
    id: "f9f695673d9de1aa0956a82d8ea1428094e44b2f00db6a6a1af60fd07e345cd7",
    title: "Pippin's First Day",
    date: "2025-09-16",
    url: `${CLOUDFRONT_BASE}/f9f695673d9de1aa0956a82d8ea1428094e44b2f00db6a6a1af60fd07e345cd7.mp4`,
    thumbnail: "/thumbnails/f9f695673d9de1aa0956a82d8ea1428094e44b2f00db6a6a1af60fd07e345cd7.jpg",
  },
  {
    id: "131f6b32c2522e8c32e88d45cc3566c5db4d7006c565a01e05dd3fa6757fe17b",
    title: "Memory Thieves in the Steam Markets",
    date: "2025-09-15",
    url: `${CLOUDFRONT_BASE}/131f6b32c2522e8c32e88d45cc3566c5db4d7006c565a01e05dd3fa6757fe17b.mp4`,
    thumbnail: "/thumbnails/131f6b32c2522e8c32e88d45cc3566c5db4d7006c565a01e05dd3fa6757fe17b.jpg",
  },
  {
    id: "1003689bcb8514130312aecf143b90c86618ca7e0c6c2d73b51850f7a446406f",
    title: "The Traveling Dream",
    date: "2025-09-12",
    url: `${CLOUDFRONT_BASE}/1003689bcb8514130312aecf143b90c86618ca7e0c6c2d73b51850f7a446406f.mp4`,
    thumbnail: "/thumbnails/1003689bcb8514130312aecf143b90c86618ca7e0c6c2d73b51850f7a446406f.jpg",
  },
  {
    id: "4bef87fe2f0d16c2195e82e3f1a20cea1c5e153369854eafe1da70e386e559eb",
    title: "The Temporal Spore Paradox",
    date: "2025-08-30",
    url: `${CLOUDFRONT_BASE}/4bef87fe2f0d16c2195e82e3f1a20cea1c5e153369854eafe1da70e386e559eb.mp4`,
    thumbnail: "/thumbnails/4bef87fe2f0d16c2195e82e3f1a20cea1c5e153369854eafe1da70e386e559eb.jpg",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getFeaturedCreation(): Creation | undefined {
  return creations.find((c) => c.id === FEATURED_ID);
}

export function getLatestCreation(): Creation | undefined {
  return creations[0];
}

export function getAllCreations(): Creation[] {
  return creations;
}
