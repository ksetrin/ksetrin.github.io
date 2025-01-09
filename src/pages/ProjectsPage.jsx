import React from 'react';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website built with React and Tailwind CSS.',
      link: '#',
    },
    {
      title: 'E-commerce App',
      description: 'A React Native app for online shopping with integrated payment gateway.',
      link: '#',
    },
    {
      title: 'Task Manager',
      description: 'A web app to manage tasks and projects collaboratively.',
      link: '#',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Projects</h1>
      <p className="mt-2">Showcase your projects here.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="mt-2">{project.description}</p>
            <a
              href={project.link}
              className="mt-4 inline-block text-blue-500 hover:underline"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
