
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'new' | 'history'>('dashboard');
  const [records, setRecords] = useState<InspectionRecord[]>(INITIAL_RECORDS);

  const handleAddRecord = (newRecord: InspectionRecord) => {
    setRecords([newRecord, ...records]);
    setActiveTab('history');
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard records={records} />}
        {activeTab === 'new' && <InspectionForm onSave={handleAddRecord} />}
        {activeTab === 'history' && <HistoryView records={records} />}
      </div>
    </Layout>
  );
};

export default App;
