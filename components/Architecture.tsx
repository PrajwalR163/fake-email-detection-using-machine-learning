import React from 'react';
import { Server, Mail, Shield, AlertTriangle, UserCheck, Inbox, Globe, ArrowRight } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">System Architecture</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          How SentinelMail integrates into an enterprise email gateway (SMTP) to filter threats in real-time before they reach the user.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
          
          {/* Step 1: Internet */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center shadow-lg mb-4 z-10 relative">
              <Globe className="w-10 h-10 text-slate-400" />
              <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">1</div>
            </div>
            <h3 className="font-bold text-slate-900">Incoming Mail</h3>
            <p className="text-sm text-slate-500 text-center mt-2">External emails arrive from the internet via SMTP.</p>
          </div>

          {/* Step 2: Gateway */}
          <div className="flex flex-col items-center">
             <div className="hidden lg:block absolute top-1/2 -left-4 -translate-y-1/2 text-slate-300">
                <ArrowRight className="w-6 h-6" />
            </div>
            <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center shadow-lg mb-4 z-10 relative">
              <Server className="w-10 h-10 text-slate-600" />
              <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">2</div>
            </div>
            <h3 className="font-bold text-slate-900">Email Gateway</h3>
            <p className="text-sm text-slate-500 text-center mt-2">Postfix/Exchange server receives the raw message.</p>
          </div>

          {/* Step 3: The Model (Hero) */}
          <div className="flex flex-col items-center">
             <div className="hidden lg:block absolute top-1/2 -left-4 -translate-y-1/2 text-slate-300">
                <ArrowRight className="w-6 h-6" />
            </div>
            <div className="w-28 h-28 bg-blue-600 border-4 border-blue-100 rounded-2xl flex items-center justify-center shadow-xl mb-4 z-10 relative transform scale-110">
              <Shield className="w-12 h-12 text-white" />
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">ML Core</div>
            </div>
            <h3 className="font-bold text-blue-700">Sentinel Model</h3>
            <p className="text-sm text-slate-500 text-center mt-2">Feature extraction & inference (BERT/XGBoost).</p>
          </div>

          {/* Step 4: Routing */}
          <div className="flex flex-col items-center">
             <div className="hidden lg:block absolute top-1/2 -left-4 -translate-y-1/2 text-slate-300">
                <ArrowRight className="w-6 h-6" />
            </div>
            <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl flex flex-col items-center justify-center shadow-lg mb-4 z-10 relative space-y-2">
              <div className="flex gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <UserCheck className="w-6 h-6 text-green-500" />
              </div>
              <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">4</div>
            </div>
            <h3 className="font-bold text-slate-900">Decision Logic</h3>
            <p className="text-sm text-slate-500 text-center mt-2">Threshold based routing (Score > 90% = Block).</p>
          </div>

          {/* Step 5: Inbox/Quarantine */}
          <div className="flex flex-col items-center">
             <div className="hidden lg:block absolute top-1/2 -left-4 -translate-y-1/2 text-slate-300">
                <ArrowRight className="w-6 h-6" />
            </div>
            <div className="w-24 h-24 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center shadow-lg mb-4 z-10 relative">
              <Inbox className="w-10 h-10 text-slate-600" />
              <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">5</div>
            </div>
            <h3 className="font-bold text-slate-900">User Inbox</h3>
            <p className="text-sm text-slate-500 text-center mt-2">Clean mail delivered; Spam moved to Junk.</p>
          </div>

        </div>
      </div>

      <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Deployment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-semibold text-slate-800 mb-2">Preprocessing Pipeline</h4>
                <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                    <li>Header parsing (SPF/DKIM/DMARC checks).</li>
                    <li>HTML stripping and text normalization.</li>
                    <li>URL extraction and expansion (un-shortening).</li>
                    <li>TF-IDF Vectorization or Tokenization (for BERT).</li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-slate-800 mb-2">Inference Latency</h4>
                <p className="text-sm text-slate-600 mb-4">
                    To maintain email delivery speed, the model is optimized for sub-200ms inference.
                </p>
                 <h4 className="font-semibold text-slate-800 mb-2">Feedback Loop</h4>
                 <p className="text-sm text-slate-600">
                    User reports ("Mark as Spam") are fed back into the training set for nightly retraining cycles.
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
