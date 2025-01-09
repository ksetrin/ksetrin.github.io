import React from 'react';

const ArticlesPage = () => {
  const articles = [
    {
      title: 'Understanding React Hooks',
      description: 'A deep dive into React Hooks and how to use them effectively.',
      link: '#',
    },
    {
      title: 'State Management in React',
      description: 'Comparing Redux, MobX, and Context API for state management.',
      link: '#',
    },
    {
      title: 'Optimizing React Performance',
      description: 'Tips and tricks to make your React apps faster.',
      link: '#',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Articles</h1>
      <p className="mt-2">Render your articles from a static JSON file here.</p>
      <div className="mt-4 space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-2xl font-semibold">{article.title}</h2>
            <p className="mt-2">{article.description}</p>
            <a
              href={article.link}
              className="mt-2 inline-block text-blue-500 hover:underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
