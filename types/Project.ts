import { PortableTextBlock } from "sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  createdAt: Date; // 🔥 Changed from `_createdAt: Date` to `createdAt: string`
  name: string;
  slug: string;
  image: string;
  images: string[]; // 🔥 Updated: Now supports multiple images
  url: string;
  content: PortableTextBlock[];
};
