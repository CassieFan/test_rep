
import React, { useState } from 'react';
import { InspectionRecord, InspectionStatus } from '../types';

interface HistoryViewProps {
  records: InspectionRecord[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = records.filter(r => 
    r.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.inspector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">历史考评记录</h1>
          <p className="text-gray-500">管理和回溯所有过往的巡查详情。</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索考评目标或检查人..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-80 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(record => (
          <div key={record.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                  record.status === InspectionStatus.PASSED ? 'bg-emerald-100 text-emerald-600' :
                  record.status === InspectionStatus.WARNING ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {record.totalScore}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{record.target}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center"><span className="mr-1">👤</span> {record.inspector}</span>
                    <span className="flex items-center"><span className="mr-1">🕒</span> {record.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  record.status === InspectionStatus.PASSED ? 'bg-emerald-50 text-emerald-700' :
                  record.status === InspectionStatus.WARNING ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {record.status}
                </span>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            {record.aiAnalysis && (
              <div className="mt-4 pt-4 border-t border-dashed border-gray-100">
                <div className="text-xs font-bold text-blue-600 mb-2 flex items-center">
                  <span className="mr-1">✨</span> AI 分析摘要
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {record.aiAnalysis}
                </p>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-900">未发现匹配记录</h3>
            <p className="text-gray-500">尝试更改搜索词或新建考评记录。</p>
          </div>
        )}
      </div>
    </div>
  );
};
