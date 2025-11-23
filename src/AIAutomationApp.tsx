import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import {
  FileText,
  Video,
  MessageSquare,
  BarChart3,
  Workflow,
  Users,
  Home,
  Menu,
  X,
  Send
} from 'lucide-react';

// 模組組件導入
import HomePage from './pages/HomePage';
import ContentGenerationHub from './pages/ContentGenerationHub';
import MarketingAutomation from './pages/MarketingAutomation';
import CustomerServiceHub from './pages/CustomerServiceHub';
import DataAnalyticsHub from './pages/DataAnalyticsHub';
import MediaToolbox from './pages/MediaToolbox';
import AutomationEngine from './pages/AutomationEngine';
import VirtualTeam from './pages/VirtualTeam';
import AutoPostingHub from './pages/AutoPostingHub';
import LoginPage from './pages/LoginPage';
import { useAuthStore } from './stores/authStore';

// 導航內容組件
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const modules = [
    {
      id: 'home',
      path: '/',
      label: '首頁',
      icon: Home,
      color: 'gray',
      component: HomePage
    },
    {
      id: 'content',
      path: '/content',
      label: 'AI內容生成',
      icon: FileText,
      color: 'blue',
      description: '文案、SEO、社群內容',
      component: ContentGenerationHub
    },
    {
      id: 'marketing',
      path: '/marketing',
      label: '行銷自動化',
      icon: BarChart3,
      color: 'purple',
      description: '廣告、排程、CTA優化',
      component: MarketingAutomation
    },
    {
      id: 'auto-posting',
      path: '/auto-posting',
      label: '自動發文',
      icon: Send,
      color: 'pink',
      description: 'FB/LINE AI智能排程發布',
      component: AutoPostingHub
    },
    {
      id: 'customer-service',
      path: '/customer-service',
      label: '智能客服',
      icon: MessageSquare,
      color: 'green',
      description: 'LINE/Telegram機器人',
      component: CustomerServiceHub
    },
    {
      id: 'analytics',
      path: '/analytics',
      label: '數據分析',
      icon: BarChart3,
      color: 'orange',
      description: '業績、受眾、競品分析',
      component: DataAnalyticsHub
    },
    {
      id: 'media',
      path: '/media',
      label: '影音工具箱',
      icon: Video,
      color: 'red',
      description: 'AI配音、圖片生成',
      component: MediaToolbox
    },
    {
      id: 'automation',
      path: '/automation',
      label: '流程自動化',
      icon: Workflow,
      color: 'indigo',
      description: 'n8n、Webhook整合',
      component: AutomationEngine
    },
    {
      id: 'virtual-team',
      path: '/virtual-team',
      label: 'AI虛擬團隊',
      icon: Users,
      color: 'teal',
      description: '美編、剪輯、行銷助理',
      component: VirtualTeam
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 側邊欄 */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Workflow className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI 自動化平台</h1>
              <p className="text-xs text-gray-400">一站式解決方案</p>
            </div>
          </div>
        </div>

        {/* 導航選單 */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = location.pathname === module.path;
            return (
              <Link
                key={module.id}
                to={module.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                <Icon size={20} className={`text-${module.color}-400`} />
                <div className="flex-1">
                  <div className="font-medium">{module.label}</div>
                  {module.description && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      {module.description}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* 底部用戶資訊 */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
              {useAuthStore.getState().user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <div className="font-medium">{useAuthStore.getState().user?.name || 'User'}</div>
              <div className="text-xs text-gray-400">{useAuthStore.getState().user?.email || 'user@example.com'}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 主內容區 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 頂部導航條 */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              歡迎使用 AI 自動化平台
            </div>
          </div>
        </header>

        {/* 頁面內容 */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            {modules.map((module) => (
              <Route
                key={module.id}
                path={module.path}
                element={<module.component />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// 主組件
export default function AIAutomationApp() {
  const { isAuthenticated } = useAuthStore();

  // 未登入時顯示登入頁
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}