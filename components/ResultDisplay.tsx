import React, { useState, useEffect } from 'react';
import { GeneratedPrompts } from '../types';

interface ResultDisplayProps {
  prompts: GeneratedPrompts;
}

type PromptLength = keyof GeneratedPrompts;

const TABS: { key: PromptLength; label: string }[] = [
    { key: 'long', label: 'Detailed' },
    { key: 'medium', label: 'Balanced' },
    { key: 'short', label: 'Concise' },
];

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ prompts }) => {
  const [activeTab, setActiveTab] = useState<PromptLength>('medium');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const currentPrompt = prompts[activeTab];

  useEffect(() => {
    setCopyStatus('idle');
  }, [activeTab, prompts]);

  const handleCopy = () => {
    if (currentPrompt) {
      navigator.clipboard.writeText(currentPrompt);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      <div className="px-4 sm:px-6 border-b border-slate-700">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`${
                activeTab === tab.key
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
              aria-current={activeTab === tab.key ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6 relative">
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={handleCopy}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/70 rounded-md text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
              aria-label={copyStatus === 'copied' ? 'Copied!' : 'Copy prompt'}
            >
              {copyStatus === 'copied' ? (
                  <CheckIcon className="h-5 w-5 text-green-400" />
              ) : (
                  <ClipboardIcon className="h-5 w-5" />
              )}
            </button>
            <div
                aria-live="polite"
                className={`absolute top-1/2 -translate-y-1/2 -right-2 translate-x-[100%] whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white transition-opacity duration-300 pointer-events-none ${
                    copyStatus === 'copied' ? 'opacity-100' : 'opacity-0'
                }`}
            >
                Copied!
            </div>
          </div>
        </div>
        <p className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed min-h-[120px] pr-16">
            {currentPrompt}
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;