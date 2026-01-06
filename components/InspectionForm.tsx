
import React, { useState } from 'react';
import { CheckItem, InspectionRecord, InspectionStatus } from '../types';
import { getAIInspectionAdvice } from '../services/geminiService';

interface InspectionFormProps {
  onSave: (record: InspectionRecord) => void;
}

const CATEGORIES = [
  { 
    id: 'env', 
    name: '环境卫生', 
    items: [
      { id: 'env_1', title: '地面清洁', desc: '地面无垃圾、无积水、无油污。', maxScore: 10 },
      { id: 'env_2', title: '玻璃门窗', desc: '无灰尘指纹，亮丽洁净。', maxScore: 5 },
    ]
  },
  { 
    id: 'sec', 
    name: '安全检查', 
    items: [
      { id: 'sec_1', title: '消防设施', desc: '灭火器在有效期内，通道无堆物。', maxScore: 20 },
      { id: 'sec_2', title: '用电安全', desc: '插座不超负荷，无裸露线缆。', maxScore: 15 },
    ]
  },
  { 
    id: 'svc', 
    name: '服务礼仪', 
    items: [
      { id: 'svc_1', title: '着装规范', desc: '统一工服，佩戴工号牌。', maxScore: 10 },
    ]
  },
];

export const InspectionForm: React.FC<InspectionFormProps> = ({ onSave }) => {
  const [target, setTarget] = useState('');
  const [inspector, setInspector] = useState('超级管理员');
  const [formItems, setFormItems] = useState<CheckItem[]>(() => {
    const flatItems: CheckItem[] = [];
    CATEGORIES.forEach(cat => {
      cat.items.forEach(it => {
        flatItems.push({
          id: it.id,
          category: cat.name,
          title: it.title,
          description: it.desc,
          score: it.maxScore,
          maxScore: it.maxScore,
          status: 'Pass',
          comment: '',
        });
      });
    });
    return flatItems;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');

  const updateItem = (id: string, updates: Partial<CheckItem>) => {
    setFormItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const totalScore = formItems.reduce((acc, curr) => acc + curr.score, 0);
  const maxPossibleScore = formItems.reduce((acc, curr) => acc + curr.maxScore, 0);
  const scorePercent = (totalScore / maxPossibleScore) * 100;

  let status = InspectionStatus.PASSED;
  if (scorePercent < 60) status = InspectionStatus.FAILED;
  else if (scorePercent < 85) status = InspectionStatus.WARNING;

  const handleAISuggest = async () => {
    if (!target) {
      alert("请先填写考评目标");
      return;
    }
    setAiLoading(true);
    const mockRecord: InspectionRecord = {
      id: 'TEMP',
      inspector,
      target,
      timestamp: new Date().toLocaleString(),
      totalScore,
      status,
      items: formItems,
    };
    const advice = await getAIInspectionAdvice(mockRecord);
    setAiAdvice(advice);
    setAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;
    setIsSubmitting(true);
    
    const newRecord: InspectionRecord = {
      id: `INS-${Date.now()}`,
      inspector,
      target,
      timestamp: new Date().toLocaleString(),
      totalScore,
      status,
      items: formItems,
      aiAnalysis: aiAdvice,
    };

    setTimeout(() => {
      onSave(newRecord);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">执行新考评</h1>
          <p className="text-gray-500 mt-1">请如实填写各项巡查指标。</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">当前总得分</div>
          <div className={`text-4xl font-bold ${scorePercent >= 85 ? 'text-emerald-600' : scorePercent >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
            {totalScore}
            <span className="text-lg text-gray-400 font-normal"> / {maxPossibleScore}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">考评目标 / 区域</label>
            <input 
              required
              type="text" 
              value={target}
              onChange={e => setTarget(e.target.value)}
              placeholder="例如：1号楼大厅"
              className="w-full px-4 py-2 rounded-xl border-gray-200 border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">检查人</label>
            <input 
              type="text" 
              value={inspector}
              readOnly
              className="w-full px-4 py-2 rounded-xl border-gray-200 border bg-gray-50 text-gray-500"
            />
          </div>
        </div>

        {CATEGORIES.map(category => (
          <div key={category.id} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 pl-2 border-l-4 border-blue-600">{category.name}</h3>
            <div className="grid gap-4">
              {formItems.filter(i => i.category === category.name).map(item => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      {['Pass', 'Fail'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            updateItem(item.id, { 
                              status: s as any,
                              score: s === 'Pass' ? item.maxScore : 0
                            });
                          }}
                          className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                            item.status === s 
                              ? (s === 'Pass' ? 'bg-emerald-500 text-white shadow-md' : 'bg-rose-500 text-white shadow-md') 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {s === 'Pass' ? '合格' : '不合格'}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        value={item.score}
                        max={item.maxScore}
                        min={0}
                        onChange={e => updateItem(item.id, { score: Number(e.target.value) })}
                        className="w-16 px-2 py-1 text-center border rounded-lg font-bold text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <span className="text-gray-400">/ {item.maxScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-blue-900 flex items-center">
              <span className="mr-2">✨</span> AI 智能分析与建议
            </h3>
            <button 
              type="button"
              onClick={handleAISuggest}
              disabled={aiLoading}
              className="px-4 py-2 bg-white text-blue-600 rounded-xl font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center"
            >
              {aiLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  生成中...
                </>
              ) : '一键分析'}
            </button>
          </div>
          {aiAdvice ? (
            <div className="prose prose-blue max-w-none text-blue-800 text-sm bg-white/50 p-4 rounded-xl">
              {aiAdvice.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ) : (
            <p className="text-blue-500 text-sm italic">点击“一键分析”获取针对本次考评的 AI 改进建议。</p>
          )}
        </div>

        <div className="flex justify-end pt-8">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50"
          >
            {isSubmitting ? '正在保存...' : '确认并提交考评报告'}
          </button>
        </div>
      </form>
    </div>
  );
};
