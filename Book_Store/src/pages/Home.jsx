import React from "react";

const Home = () => {
return ( <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 px-6"> <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-12 text-center">
📚 Book Store </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
    <a
      href="/books"
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 p-8"
    >
      <span className="text-3xl mb-3">📖</span>
      <span className="text-lg font-semibold text-gray-800">Books</span>
    </a>

    <a
      href="/journals"
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 p-8"
    >
      <span className="text-3xl mb-3">📰</span>
      <span className="text-lg font-semibold text-gray-800">Journals</span>
    </a>

    <a
      href="/comics"
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 p-8"
    >
      <span className="text-3xl mb-3">🎨</span>
      <span className="text-lg font-semibold text-gray-800">Comics</span>
    </a>
  </div>
</div>


);
};

export default Home;
