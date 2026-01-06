
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { InspectionForm } from './components/InspectionForm';
import { HistoryView } from './components/HistoryView';
import { InspectionRecord, InspectionStatus } from './types';

const INITIAL_RECORDS: InspectionRecord[] = [
  {
    id: 'INS-001',
    inspector: '张明',
    target: 'A座办公区',
    timestamp: '2024-05-15 10:30',
    totalScore: 92,
    status: InspectionStatus.PASSED,
    items: [],
  },
  {
    id: 'INS-002',
    inspector: '李华',
    target: '地库停车场',
    timestamp: '2024-05-14 14:20',
    totalScore: 78,
    status: InspectionStatus.WARNING,
    items: [],
  }
];

type TabType = 'dashboard' | 'new' | 'history';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [records, setRecords] = useState<InspectionRecord[]>(INITIAL_RECORDS);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') as TabType;
      const validTabs: TabType[] = ['dashboard', 'new', 'history'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        // Default to dashboard if hash is invalid or empty
        window.location.hash = '#/dashboard';
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddRecord = (newRecord: InspectionRecord) => {
    setRecords([newRecord, ...records]);
    window.location.hash = '#/history';
  };

  const onTabChange = (tab: TabType) => {
    window.location.hash = `#/${tab}`;
  };

  return (
    <Layout activeTab={activeTab} onTabChange={onTabChange}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard records={records} />}
        {activeTab === 'new' && <InspectionForm onSave={handleAddRecord} />}
        {activeTab === 'history' && <HistoryView records={records} />}
      </div>
    </Layout>
  );
};

export default App;
