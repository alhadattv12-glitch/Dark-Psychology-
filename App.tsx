import React, { useState } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ResultDisplay from './components/ResultDisplay';
import Spinner from './components/Spinner';
import { ImageStyle, GeneratedPrompts } from './types';
import { generateDetailedPrompt } from './services/geminiService';
import { initialPrompts } from './constants/initialPrompts';

const App: React.FC = () => {
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts | null>(initialPrompts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isExampleVisible, setIsExampleVisible] = useState<boolean>(true);

  const handleGeneratePrompt = async (idea: string, style: ImageStyle) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPrompts(null);
    setIsExampleVisible(false);

    try {
      const prompts = await generateDetailedPrompt(idea, style);
      setGeneratedPrompts(prompts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-3xl mx-auto">
        <Header />
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
          <PromptForm isLoading={isLoading} onSubmit={handleGeneratePrompt} />
        </div>
        
        <div className="mt-8">
            {isLoading && <Spinner />}
            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {generatedPrompts && (
              <>
                {isExampleVisible && (
                  <h2 className="text-lg font-semibold text-slate-400 mb-4 text-center">
                    Example: "Psychological Manipulation"
                  </h2>
                )}
                <ResultDisplay prompts={generatedPrompts} />
              </>
            )}
        </div>
      </main>
      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
