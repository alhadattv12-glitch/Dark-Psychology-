import React, { useState } from 'react';
import { ImageStyle } from '../types';
import { IMAGE_STYLES } from '../constants';

interface PromptFormProps {
  isLoading: boolean;
  onSubmit: (idea: string, style: ImageStyle) => void;
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v3.546a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zM12.75 8.634a.75.75 0 00-1.5 0V12A.75.75 0 0012 12.75h3.366a.75.75 0 000-1.5H12.75V8.634zM15 4.5a.75.75 0 01.75.75v3.546a.75.75 0 01-1.5 0V5.25A.75.75 0 0115 4.5zM12 15.75a.75.75 0 01.75.75v3.546a.75.75 0 01-1.5 0v-3.546a.75.75 0 01.75-.75zM8.006 15a.75.75 0 00-1.5 0v.006a.75.75 0 001.5 0V15zm.75 3.75a.75.75 0 01.75.75v.006a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zm3-3.75a.75.75 0 00-1.5 0v.006a.75.75 0 001.5 0V15zm.75 3.75a.75.75 0 01.75.75v.006a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zm3-3.75a.75.75 0 00-1.5 0v.006a.75.75 0 001.5 0V15zm.75 3.75a.75.75 0 01.75.75v.006a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zM4.25 10.5a.75.75 0 01.75-.75h3.546a.75.75 0 010 1.5H5a.75.75 0 01-.75-.75zm10.5 0a.75.75 0 01.75-.75h3.546a.75.75 0 010 1.5h-3.546a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const PromptForm: React.FC<PromptFormProps> = ({ isLoading, onSubmit }) => {
  const [idea, setIdea] = useState('');
  const [style, setStyle] = useState<ImageStyle>(ImageStyle.CINEMATIC);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea, style);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <label htmlFor="idea" className="block text-sm font-medium text-slate-300 mb-2">
          Your Core Concept
        </label>
        <textarea
          id="idea"
          rows={3}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., A puppet master discovering their own strings"
          className="block w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-md shadow-sm placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          required
        />
      </div>

      <div>
        <label htmlFor="style" className="block text-sm font-medium text-slate-300 mb-2">
          Choose an Art Style
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value as ImageStyle)}
          className="block w-full pl-4 pr-10 py-3 bg-slate-800 border border-slate-600 rounded-md shadow-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        >
          {IMAGE_STYLES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !idea.trim()}
        className="w-full flex justify-center items-center gap-x-2 px-6 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
      >
        <SparklesIcon className="h-5 w-5" />
        {isLoading ? 'Conjuring...' : 'Forge Prompts'}
      </button>
    </form>
  );
};

export default PromptForm;