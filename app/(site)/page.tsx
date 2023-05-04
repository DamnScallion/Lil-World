import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

// export const revalidate = 0;

export default async function Home() {
  const projects = await getProjects();

  if (projects == null) {
    return <></>;
  }

  return (
    <div>
      <h1 className="text-7xl front-exrabold">
        Hello I&apos;m{" "}
        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
          George
        </span>
        !
      </h1>

      <p className="mt-3 text-xl text-gray-600">
        Aloha everyone! Checkout my projects!
      </p>

      <h2 className="mt-24 font-bold text-gray-700 text-3xl">My Projects</h2>

      <div className="mt-5 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            className="group flex flex-row shadow-[0px_10px_20px_5px_#e2e8f0] box-border bg-inherit rounded-lg hover:scale-105 hover:shadow-[0px_10px_20px_5px_#a3bffa] transition"
            key={project._id}
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                width={200}
                height={200}
                className="w-2/5 object-cover rounded-l-lg"
              />
            )}
            {/* <div className="w-3/5 border-l-0 rounded-r-lg flex justify-center items-center font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              {project.name}
            </div> */}
            <div className="w-3/5 border-l-0 rounded-r-lg flex justify-center items-center font-extrabold text-xl text-slate-400 group-hover:text-blue-400">
              {project.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
