import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line
} from 'recharts';

const ModelMetrics: React.FC = () => {
  // Mock data representing the results of the "Fake Email Detection" project
  const performanceData = [
    { name: 'Naive Bayes', accuracy: 88.5, precision: 86.2, recall: 89.1, f1: 87.6 },
    { name: 'SVM (Linear)', accuracy: 92.3, precision: 93.1, recall: 90.5, f1: 91.8 },
    { name: 'XGBoost', accuracy: 96.8, precision: 97.2, recall: 95.9, f1: 96.5 },
    { name: 'BERT (Transformer)', accuracy: 98.4, precision: 98.1, recall: 98.7, f1: 98.4 },
  ];

  const radarData = [
    { subject: 'Accuracy', A: 96.8, B: 98.4, fullMark: 100 },
    { subject: 'Precision', A: 97.2, B: 98.1, fullMark: 100 },
    { subject: 'Recall', A: 95.9, B: 98.7, fullMark: 100 },
    { subject: 'F1 Score', A: 96.5, B: 98.4, fullMark: 100 },
    { subject: 'Inference Speed', A: 95, B: 60, fullMark: 100 }, // XGBoost is faster
    { subject: 'Robustness', A: 85, B: 95, fullMark: 100 },
  ];

  const confusionMatrixData = [
    { name: 'Predicted Legitimate', Legitimate: 1250, Spam: 12, Phishing: 5 },
    { name: 'Predicted Spam', Legitimate: 15, Spam: 890, Phishing: 22 },
    { name: 'Predicted Phishing', Legitimate: 3, Spam: 18, Phishing: 450 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900">Model Evaluation Report</h2>
        <p className="mt-4 text-lg text-slate-600">
          Comparing the performance of traditional ML algorithms vs. Deep Learning (BERT) on the Enron + Phishing Corpus dataset (approx 30,000 emails).
        </p>
      </div>

      {/* Main Bar Chart Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Algorithm Performance Comparison</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[80, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" fill="#6366f1" name="F1-Score %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-sm text-slate-500 text-center">
          BERT achieves the highest F1-Score (98.4%), significantly outperforming Naive Bayes baselines.
        </p>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Radar Chart: XGBoost vs BERT */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Model Profile: XGBoost vs BERT</h3>
          <p className="text-sm text-slate-500 mb-6">Trade-off between predictive power and inference speed.</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="XGBoost" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Radar name="BERT" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Discriminative Features</h3>
          <div className="flex-1 space-y-4">
            {[
              { label: "URL Mismatch (Anchor vs Href)", score: 98, color: "bg-red-500" },
              { label: "Domain Age & Reputation", score: 85, color: "bg-orange-500" },
              { label: "Urgency Keywords (e.g. 'Immediate')", score: 72, color: "bg-yellow-500" },
              { label: "HTML/Script Tags Count", score: 65, color: "bg-blue-500" },
              { label: "Sender/Reply-To Discrepancy", score: 60, color: "bg-indigo-500" },
            ].map((feature, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{feature.label}</span>
                  <span className="text-slate-500">{feature.score} Importance</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${feature.color}`} style={{ width: `${feature.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600">
            <strong>Insight:</strong> The "URL Mismatch" feature is the single strongest indicator of Phishing attempts in our dataset, followed closely by domain reputation heuristics.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMetrics;
