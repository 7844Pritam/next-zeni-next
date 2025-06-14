import React from "react";

const FreeResourcesPage = () => {
  const resources = [
    {
      title: "English Grammar PDF",
      description: "Comprehensive grammar notes to improve your fundamentals.",
      link: "/downloads/english-grammar.pdf",
      type: "PDF",
    },
    {
      title: "Personality Development Guide",
      description: "E-book to help you boost confidence and soft skills.",
      link: "/downloads/pd-guide.pdf",
      type: "E-Book",
    },
    {
      title: "Group Discussion Tips",
      description: "Cheat sheet for acing GD rounds in college or interviews.",
      link: "/downloads/gd-tips.pdf",
      type: "Cheat Sheet",
    },
    {
      title: "Public Speaking Practice Video",
      description: "Watch and learn techniques to speak better in public.",
      link: "https://www.youtube.com/watch?v=example123",
      type: "Video",
    },
  ];

  return (
    <section className="bg-white text-gray-800 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Free Resources</h1>
      <p className="text-center mb-10 text-lg max-w-2xl mx-auto">
        Download PDFs, watch videos, and explore learning material to level up your skills — completely free!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, index) => (
          <div key={index} className="border p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">{res.title}</h3>
            <p className="mb-4 text-sm text-gray-600">{res.description}</p>
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              {res.type === "Video" ? "Watch Now" : "Download"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FreeResourcesPage;
