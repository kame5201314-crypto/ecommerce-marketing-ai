import { Workflow, Zap, Plus } from 'lucide-react';

export default function AutomationEngine() {
  const workflows = [
    {
      name: '新訂單自動通知',
      trigger: '訂單產生',
      actions: ['發送 LINE 通知', '更新 Google Sheet', '同步庫存'],
      status: 'active'
    },
    {
      name: '客服訊息自動分類',
      trigger: 'LINE 訊息',
      actions: ['AI 分類', '情緒分析', '自動回覆或派工'],
      status: 'active'
    },
    {
      name: '每日業績報表',
      trigger: '每天 09:00',
      actions: ['拉取訂單數據', '生成報表', '發送 Email'],
      status: 'active'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Workflow className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">流程自動化引擎</h1>
            <p className="text-gray-600">整合 n8n、Webhook,串接所有服務</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <Plus size={20} />
          新增工作流程
        </button>
      </div>

      {/* 統計 */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <Workflow className="text-indigo-600 mb-2" size={24} />
          <div className="text-3xl font-bold text-gray-800">12</div>
          <div className="text-sm text-gray-600">活躍工作流程</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <Zap className="text-green-600 mb-2" size={24} />
          <div className="text-3xl font-bold text-gray-800">1,234</div>
          <div className="text-sm text-gray-600">今日執行次數</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-gray-800">99.8%</div>
          <div className="text-sm text-gray-600">成功率</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl font-bold text-gray-800">2.3秒</div>
          <div className="text-sm text-gray-600">平均執行時間</div>
        </div>
      </div>

      {/* 工作流程列表 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">工作流程</h2>
        <div className="space-y-4">
          {workflows.map((workflow, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{workflow.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    觸發條件: {workflow.trigger}
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {workflow.status === 'active' ? '運行中' : '已停止'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">執行動作:</span>
                {workflow.actions.map((action, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded"
                  >
                    {action}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 整合平台 */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">🔌 支援整合</h3>
        <div className="grid md:grid-cols-4 gap-3">
          {['Supabase', 'Google Sheets', 'LINE Notify', 'Slack', 'Discord', 'Airtable', 'Notion', 'Shopify'].map((platform) => (
            <div key={platform} className="bg-white rounded-lg p-3 text-center font-medium text-gray-700">
              {platform}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}