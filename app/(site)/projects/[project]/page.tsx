"use client";

import { useState, useEffect } from "react";
import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Project() {
  const params = useParams();
  const slug = params?.project as string;
  const [project, setProject] = useState<any | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      const data = await getProject(slug);
      setProject(data);
    }
    fetchProject();
  }, [slug]);

  if (!project) return <div className="text-center py-10">Loading...</div>;
  if (!project.images || project.images.length === 0) return <div>No images available.</div>;

  const createdAt = project.createdAt
    ? new Date(project.createdAt).toLocaleString("zh-CN", {
      timeZone: "Australia/Sydney", // 🔥 Ensures it follows Sydney time
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    : "N/A";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Swiper Image Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg overflow-hidden mb-6"
      >
        {project.images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={project.name}
              width={1920}
              height={1080}
              className="w-full h-auto object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Project Info */}
      <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-3">
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
