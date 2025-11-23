import { useState } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  BarChart,
  Settings,
  Zap,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

type Platform = 'line' | 'telegram' | 'messenger' | 'whatsapp';

interface Message {
  id: string;
  platform: Platform;
  customer: string;
  message: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: string;
  timestamp: Date;
  status: 'pending' | 'auto-replied' | 'assigned';
}

export default function CustomerServiceHub() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('line');
  const [botEnabled, setBotEnabled] = useState(true);

  const platforms = [
    { id: 'line' as Platform, name: 'LINE', color: 'green', icon: MessageSquare },
    { id: 'telegram' as Platform, name: 'Telegram', color: 'blue', icon: Send },
    { id: 'messenger' as Platform, name: 'Messenger', color: 'indigo', icon: MessageSquare },
    { id: 'whatsapp' as Platform, name: 'WhatsApp', color: 'emerald', icon: MessageSquare }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      platform: 'line',
      customer: '王小明',
      message: '請問這個商品什麼時候會到貨?',
      sentiment: 'neutral',
      category: '詢問',
      timestamp: new Date(),
      status: 'auto-replied'
    },
    {
      id: '2',
      platform: 'line',
      customer: '李小華',
      message: '我要退貨',
      sentiment: 'negative',
      category: '退貨',
      timestamp: new Date(Date.now() - 3600000),
      status: 'assigned'
    }
  ];

  const stats = [
    { label: '今日訊息', value: '245', icon: MessageSquare, color: 'blue' },
    { label: 'AI 自動處理', value: '187', icon: Bot, color: 'green' },
    { label: '平均回應時間', value: '< 1秒', icon: Clock, color: 'purple' },
    { label: '客戶滿意度', value: '94%', icon: TrendingUp, color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">智能客服系統</h1>
            <p className="text-gray-600">24/7 AI 自動回覆與客戶管理</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">AI Bot</span>
          <button
            onClick={() => setBotEnabled(!botEnabled)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              botEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                botEnabled ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* 統計數據 */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`text-${stat.color}-600`} size={24} />
                <div className={`text-3xl font-bold text-${stat.color}-600`}>
                  {stat.value}
                </div>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* 平台選擇 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">通訊平台</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? `border-${platform.color}-500 bg-${platform.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`text-${platform.color}-600 mb-2`} size={24} />
                <div className="font-semibold text-gray-800">{platform.name}</div>
                <div className="text-xs text-green-600 mt-1">● 已連接</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 客服訊息列表 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 訊息列表 */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">客服訊息</h2>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {mockMessages.map((msg) => (
              <div key={msg.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                      {msg.customer[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{msg.customer}</div>
                      <div className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString('zh-TW')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        msg.sentiment === 'positive'
                          ? 'bg-green-100 text-green-700'
                          : msg.sentiment === 'negative'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {msg.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        msg.status === 'auto-replied'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {msg.status === 'auto-replied' ? 'AI已回覆' : '待處理'}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 ml-12">{msg.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 自動回覆設定 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">AI 自動回覆</h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-900 text-sm mb-1">商品詢問</div>
                <div className="text-xs text-blue-700">自動回覆商品資訊</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="font-medium text-green-900 text-sm mb-1">訂單查詢</div>
                <div className="text-xs text-green-700">自動查詢訂單狀態</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="font-medium text-orange-900 text-sm mb-1">退換貨</div>
                <div className="text-xs text-orange-700">轉交人工處理</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="font-medium text-purple-900 text-sm mb-1">問候語</div>
                <div className="text-xs text-purple-700">自動歡迎訊息</div>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Settings size={18} />
              編輯規則
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="text-green-600" size={20} />
              <h3 className="font-bold text-green-900">處理速度</h3>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{'<'} 1 秒</div>
            <div className="text-sm text-green-700">平均回應時間</div>
          </div>
        </div>
      </div>

      {/* 情緒分析報表 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">客戶情緒分析</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">67%</div>
            <div className="text-sm text-green-700">正面評價</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-600 mb-2">28%</div>
            <div className="text-sm text-gray-700">中立</div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-3xl font-bold text-red-600 mb-2">5%</div>
            <div className="text-sm text-red-700">負面回饋</div>
          </div>
        </div>
      </div>
    </div>
  );
}