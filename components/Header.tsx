import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-indigo-600">
        Dark Psychology Prompt Alchemist
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
        Translate concepts of dark psychology and manipulation into deep, powerful, and evocative visual prompts for your content.
      </p>
    </header>
  );
};

export default Header;