import React from 'react';
import { ShieldAlert, BarChart3, Activity, Layers } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'hero', label: 'Overview', icon: ShieldAlert },
    { id: 'analyzer', label: 'Live Detector', icon: Activity },
    { id: 'metrics', label: 'Model Metrics', icon: BarChart3 },
    { id: 'architecture', label: 'Architecture', icon: Layers },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('hero')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <ShieldAlert className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Sentinel<span className="text-blue-600">Mail</span></span>
            </div>
          </div>
          <div className="hidden sm:flex sm:space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile menu button could go here, omitting for brevity in this demo */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
