import React from "react";

const contact = {
  page: "https://example.com",
  emails: "user@example.com",
  projects: "https://example.com/projects",
  trending: ["React", "Frontend", "API"],
};

const workExperience = [
  {
    year: "2025 — Now",
    title: "Design Engineer at GitHub",
    location: "London, UK",
  },
  {
    year: "2023 — 2024",
    title: "Web Engineer at Intercom",
    location: "London, UK",
  },
  {
    year: "2020 — 2023",
    title: "Design Engineer at PicCollage",
    location: "Taipei, TW",
  },
];

const defaultSideProjects = [
  {
    title: "Cuboid",
    year: "2024",
    description: "3D design and prototyping tool.",
    techStack: "React, Three.js",
    imageUrl: "https://via.placeholder.com/56",
    link: "https://cuboid.example.com",
  },
  {
    title: "SnaqFellow",
    year: "2023",
    description: "A smart snack delivery scheduler.",
    techStack: "Vue, Firebase",
    imageUrl: "https://via.placeholder.com/56",
    link: "https://snaqfellow.example.com",
  },
];

const UserCard = ({ user, sideProjects = defaultSideProjects }) => {
  if (!user) {
    return (
      <p className="text-center text-gray-600">Data pengguna tidak tersedia.</p>
    );
  }

  return (
    <>
      <section className="flex flex-col items-center text-center">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-blue-300 shadow-md"
          loading="eager"
          decoding="async"
          width={96}
          height={96}
        />
        <h1 className="text-2xl md:text-3xl font-semibold">
          {user.first_name} {user.last_name}
        </h1>
        <span className="text-gray-500 text-sm mt-0.5">{user.email}</span>
      </section>

      <section className="mt-6 text-center">
        <p className="text-gray-700 text-sm md:text-base">
          Hi, I'm <strong>{user.first_name}</strong> 👋. I'm a passionate
          developer excited to work with modern technologies and build impactful
          digital experiences.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-lg mb-2">Work Experience</h2>
        <ul className="space-y-1">
          {workExperience.map((exp, idx) => (
            <li
              key={idx}
              className="flex flex-col md:flex-row md:justify-between text-sm"
            >
              <span className="font-medium text-gray-700">
                {exp.title}{" "}
                <span className="text-gray-500 font-normal">
                  ({exp.location})
                </span>
              </span>
              <span className="text-gray-500">{exp.year}</span>
            </li>
          ))}
        </ul>
      </section>

      {sideProjects.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold text-lg mb-2">Side Projects</h2>
          <div className="grid grid-cols-1 gap-4">
            {sideProjects.map((project, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow p-3 flex gap-3 items-start"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-14 h-14 object-cover rounded"
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={56}
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{project.title}</span>
                    <span className="text-xs text-gray-500">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {project.description}
                  </p>
                  <p className="text-xs mt-2">
                    <strong>Tech:</strong> {project.techStack}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs mt-1 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 text-[15px] text-gray-800">
        <h2 className="font-semibold text-lg mb-2">Contact</h2>
        <div className="space-y-1">
          <div>
            <strong>Page:</strong>{" "}
            <a
              href={contact.page}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.page}
            </a>
          </div>
          <div>
            <strong>Emails:</strong>{" "}
            <a
              href={`mailto:${contact.emails}`}
              className="text-blue-600 hover:underline"
            >
              {contact.emails}
            </a>
          </div>
          <div>
            <strong>Projects:</strong>{" "}
            <a
              href={contact.projects}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.projects}
            </a>
          </div>
          <div>
            <strong>Trending:</strong>{" "}
            {contact.trending.map((t, i) => (
              <span key={i} className="text-blue-600 mr-2">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCard;
