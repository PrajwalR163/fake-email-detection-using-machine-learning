import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import ModelMetrics from './components/ModelMetrics';
import Architecture from './components/Architecture';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <Hero onStart={() => setActiveTab('analyzer')} />;
      case 'analyzer':
        return <Analyzer />;
      case 'metrics':
        return <ModelMetrics />;
      case 'architecture':
        return <Architecture />;
      default:
        return <Hero onStart={() => setActiveTab('analyzer')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
