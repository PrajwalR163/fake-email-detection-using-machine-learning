import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <span className="font-bold text-lg text-slate-700">Sentinel<span className="text-blue-600">Mail</span></span>
             <span className="text-slate-400 text-sm">| ML Security Project</span>
          </div>
          <div className="text-slate-500 text-sm text-center md:text-right">
            <p>Built with React, Tailwind & Gemini 2.5 Flash</p>
            <p className="mt-1">For demonstration purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
