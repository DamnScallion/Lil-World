import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
  params: { project: string };
};

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project = await getProject(slug);

  const createdAt = project.createdAt
    ? new Date(project.createdAt).toLocaleString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      hour12: false,
    })
    : "N/A";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
      {/* Featured Image */}
      <div className="w-full rounded-lg overflow-hidden mb-6">
        <Image
          src={project.image}
          alt={project.name}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Project Info */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
        {project.name}
      </h1>
      <p className="text-sm text-gray-500 mb-6">发布于 {createdAt}</p>

      {/* Project Content */}
      <div className="prose prose-lg text-gray-700">
        <PortableText value={project.content} />
      </div>
    </div>
  );
}
