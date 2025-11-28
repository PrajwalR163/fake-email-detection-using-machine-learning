import React, { useState } from 'react';
import { EmailData, AnalysisResult, EmailCategory } from '../types';
import { analyzeEmail } from '../services/gemini';
import { AlertTriangle, CheckCircle, Ban, ArrowRight, Loader2, AlertOctagon, FileText, Globe, User, Clock } from 'lucide-react';

const Analyzer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EmailData>({
    sender: '',
    replyTo: '',
    subject: '',
    body: '',
    hasAttachments: false,
    attachmentNames: '',
    links: '',
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFillSample = (type: 'phish' | 'spam' | 'legit') => {
    if (type === 'phish') {
      setFormData({
        sender: 'security@paypa1-support.com',
        replyTo: 'admin@xy-security-services.net',
        subject: 'URGENT: Your account has been suspended due to suspicious activity',
        body: 'Dear Customer,\n\nWe have detected unauthorized login attempts on your account. Your access has been temporarily limited. To restore your account features, please verify your identity immediately by clicking the link below.\n\nFailure to verify within 24 hours will result in permanent account closure.\n\nSincerely,\nSecurity Team',
        hasAttachments: false,
        attachmentNames: '',
        links: 'http://bit.ly/verify-paypal-now',
        timestamp: '03:15:00'
      });
    } else if (type === 'spam') {
      setFormData({
        sender: 'marketing@mega-deals-warehouse.com',
        replyTo: 'no-reply@mega-deals-warehouse.com',
        subject: 'CONGRATULATIONS! You won a $1000 Gift Card!',
        body: 'You have been selected as our lucky winner! Click here to claim your prize now. Limited time offer. Terms and conditions apply.',
        hasAttachments: false,
        attachmentNames: '',
        links: 'http://win-prizes-now.com/claim',
        timestamp: '14:20:00'
      });
    } else {
      setFormData({
        sender: 'alerts@chase.com',
        replyTo: 'alerts@chase.com',
        subject: 'Your statement is available',
        body: 'Your monthly statement for account ending in 1234 is now available. Log in to Chase.com or the mobile app to view your details.',
        hasAttachments: false,
        attachmentNames: '',
        links: 'https://www.chase.com',
        timestamp: '09:00:00'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeEmail(formData);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Column */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Email Input
            </h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleFillSample('legit')} className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition">Sample Legit</button>
              <button type="button" onClick={() => handleFillSample('spam')} className="text-xs px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full hover:bg-yellow-100 transition">Sample Spam</button>
              <button type="button" onClick={() => handleFillSample('phish')} className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition">Sample Phish</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">From (Sender Address)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="sender"
                    required
                    value={formData.sender}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    placeholder="e.g. support@apple.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reply-To Address</label>
                <input
                  type="text"
                  name="replyTo"
                  value={formData.replyTo}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  placeholder="Optional (if different)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject Line</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                placeholder="Email subject..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Body Content</label>
              <textarea
                name="body"
                required
                rows={6}
                value={formData.body}
                onChange={handleInputChange}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 font-mono"
                placeholder="Paste the email content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Links / URLs detected</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-slate-400" />
                  </div>
                <input
                  type="text"
                  name="links"
                  value={formData.links}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  placeholder="e.g. http://suspicious-site.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time Received (24h)</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                        type="text"
                        name="timestamp"
                        value={formData.timestamp}
                        onChange={handleInputChange}
                        className="pl-10 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                </div>
                <div className="flex items-center pt-6">
                    <input
                        id="hasAttachments"
                        name="hasAttachments"
                        type="checkbox"
                        checked={formData.hasAttachments}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasAttachments" className="ml-2 block text-sm text-slate-900">
                        Has Attachments?
                    </label>
                </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Analyzing with Sentinel Models...
                  </>
                ) : (
                  <>
                    Analyze Email Risk
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="space-y-6">
            {/* Initial State Placeholder */}
            {!result && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                        <AlertOctagon className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Ready to Analyze</h3>
                    <p className="text-slate-500 mt-2 max-w-sm">
                        Enter email details or select a sample to classify the email using our NLP Engine.
                    </p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-medium text-red-800">Analysis Failed</h4>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            )}

            {/* Results Display */}
            {result && (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-6 border-b ${
                        result.category === EmailCategory.PHISHING ? 'bg-red-50 border-red-100' :
                        result.category === EmailCategory.SPAM ? 'bg-yellow-50 border-yellow-100' :
                        'bg-green-50 border-green-100'
                    }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Classification</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    {result.category === EmailCategory.PHISHING && <Ban className="w-8 h-8 text-red-600" />}
                                    {result.category === EmailCategory.SPAM && <AlertTriangle className="w-8 h-8 text-yellow-600" />}
                                    {result.category === EmailCategory.LEGITIMATE && <CheckCircle className="w-8 h-8 text-green-600" />}
                                    <span className={`text-3xl font-bold ${
                                        result.category === EmailCategory.PHISHING ? 'text-red-700' :
                                        result.category === EmailCategory.SPAM ? 'text-yellow-700' :
                                        'text-green-700'
                                    }`}>
                                        {result.category}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Confidence</h3>
                                <div className="text-3xl font-bold text-slate-900 mt-1">{result.confidenceScore}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Executive Summary</h4>
                            <p className="text-slate-700 leading-relaxed">{result.summary}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Detected Risk Factors</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.riskFactors.length > 0 ? result.riskFactors.map((risk, idx) => (
                                    <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        {risk}
                                    </span>
                                )) : (
                                    <span className="text-sm text-slate-500 italic">No significant risks detected.</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                             <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Header Analysis</h5>
                                <p className="text-sm text-slate-700">{result.featureAnalysis.headerAnalysis}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Content / NLP Analysis</h5>
                                <p className="text-sm text-slate-700">{result.featureAnalysis.contentAnalysis}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Link & Attachment Analysis</h5>
                                <p className="text-sm text-slate-700">{result.featureAnalysis.linkAnalysis}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
