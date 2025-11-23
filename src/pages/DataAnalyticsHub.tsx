import { BarChart3, TrendingUp, Users, DollarSign, Package, Eye } from 'lucide-react';

export default function DataAnalyticsHub() {
  const metrics = [
    { label: '今日營收', value: 'NT$ 45,230', change: '+12.5%', icon: DollarSign, color: 'green' },
    { label: '訂單數量', value: '156', change: '+8.3%', icon: Package, color: 'blue' },
    { label: '新客戶', value: '43', change: '+15.2%', icon: Users, color: 'purple' },
    { label: '網站瀏覽', value: '2,345', change: '+5.7%', icon: Eye, color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
          <BarChart3 className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI 數據分析中心</h1>
          <p className="text-gray-600">智能業績分析、顧客洞察、競品監控</p>
        </div>
      </div>

      {/* 關鍵指標 */}
      <div className="grid md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`text-${metric.color}-600`} size={24} />
                <span className={`text-sm font-medium text-${metric.color}-600`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* 銷售趨勢圖 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">銷售趨勢</h2>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-blue-400" size={64} />
          <p className="text-gray-500 ml-4">圖表區域 (整合 Recharts)</p>
        </div>
      </div>

      {/* 客戶分群 */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">高價值客戶</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">127</div>
          <p className="text-sm text-gray-600">累計消費 {'>'} NT$ 10,000</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">活躍客戶</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">543</div>
          <p className="text-sm text-gray-600">近30天有購買記錄</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">流失風險</h3>
          <div className="text-4xl font-bold text-red-600 mb-2">89</div>
          <p className="text-sm text-gray-600">超過60天未消費</p>
        </div>
      </div>

      {/* AI 洞察建議 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">🤖 AI 洞察建議</h2>
        <div className="space-y-3">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="font-medium mb-1">• 建議針對高價值客戶推出會員專屬優惠</div>
            <div className="text-sm opacity-90">預計可提升 15-20% 的回購率</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="font-medium mb-1">• 偵測到競品降價,建議調整行銷策略</div>
            <div className="text-sm opacity-90">3個商品可能受影響</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="font-medium mb-1">• 流失客戶喚回活動建議執行時間: 本週五</div>
            <div className="text-sm opacity-90">預計喚回 30-40 位客戶</div>
          </div>
        </div>
      </div>
    </div>
  );
}