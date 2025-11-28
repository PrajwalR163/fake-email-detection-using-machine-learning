import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Next-Gen AI for</span>{' '}
                <span className="block text-blue-600 xl:inline">Email Security</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                A machine learning powered system detecting advanced phishing attacks, business email compromise, and zero-day spam variants with 98% accuracy.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onStart}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg transition-all"
                  >
                    Launch Live Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg transition-all"
                  >
                    View Project Report
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-50 border-l border-slate-100 flex items-center justify-center">
         {/* Abstract visualization */}
         <div className="grid grid-cols-2 gap-4 p-8 opacity-50 transform rotate-3">
            <div className="w-32 h-40 bg-blue-100 rounded-lg animate-pulse"></div>
            <div className="w-32 h-40 bg-slate-200 rounded-lg"></div>
            <div className="w-32 h-40 bg-slate-200 rounded-lg"></div>
            <div className="w-32 h-40 bg-blue-200 rounded-lg animate-pulse delay-75"></div>
         </div>
      </div>

      {/* Feature Grid */}
      <div id="features" className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                    <div className="p-3 bg-blue-50 rounded-full mb-4">
                        <ShieldCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">High Accuracy</h3>
                    <p className="mt-2 text-sm text-slate-500">Utilizing BERT transformers to understand context and sentiment, minimizing false positives.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                    <div className="p-3 bg-blue-50 rounded-full mb-4">
                        <Zap className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Real-time Analysis</h3>
                    <p className="mt-2 text-sm text-slate-500">Engineered for low latency to scan emails at the gateway level without delaying delivery.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                    <div className="p-3 bg-blue-50 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Header Inspection</h3>
                    <p className="mt-2 text-sm text-slate-500">Deep analysis of SMTP headers to catch domain spoofing and mismatched Reply-To addresses.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
