
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                IntelliInspect
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a 
                href="#/dashboard"
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors inline-flex items-center ${activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                工作台
              </a>
              <a 
                href="#/new"
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors inline-flex items-center ${activeTab === 'new' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                新建考评
              </a>
              <a 
                href="#/history"
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors inline-flex items-center ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                历史记录
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
              <div className="flex items-center space-x-2 border-l pl-4 ml-2">
                <img className="w-8 h-8 rounded-full" src="https://picsum.photos/32/32?random=1" alt="avatar" />
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-medium text-gray-700 leading-none">超级管理员</span>
                  <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Quality Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 text-xs text-gray-400">
          <p>© 2024 IntelliInspect 智能巡查考评系统. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-blue-500">隐私政策</a>
            <a href="#" className="hover:text-blue-500">服务条款</a>
            <a href="#" className="hover:text-blue-500">联系支持</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
