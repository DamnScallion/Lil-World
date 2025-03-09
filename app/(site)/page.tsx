import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return <></>;
  }

  return (
    <div className="px-1 sm:px-2 md:px-6 lg:px-8 py-6 max-w-[1300px] mx-auto">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
        我们是~
        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
          了了和星星
        </span>
        !
      </h1>

      <p className="text-lg text-gray-600 text-center mb-6">
        欢迎来到我们的2.5次元～
      </p>

      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {projects.map((project) => {

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
            <Link
              href={`/projects/${project.slug}`}
              key={project._id}
              className="block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 bg-white"
            >
              {project.image && (
                <div className="w-full aspect-square overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <h3 className="text-md md:text-lg font-bold text-gray-800">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{createdAt}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>

  );
}
