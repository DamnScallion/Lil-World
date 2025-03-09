import { PortableTextBlock } from "sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  createdAt: string; // 🔥 Changed from `_createdAt: Date` to `createdAt: string`
  name: string;
  slug: string;
  image: string;
  url: string;
  content: PortableTextBlock[];
};
