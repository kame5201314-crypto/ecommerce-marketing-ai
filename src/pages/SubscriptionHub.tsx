import { Crown, Check, Zap } from 'lucide-react';

export default function SubscriptionHub() {
  const plans = [
    {
      name: '免費方案',
      price: 'NT$ 0',
      period: '/ 月',
      features: [
        '100 次 AI 生成',
        '基本內容模板',
        '3 個自動化流程',
        '社群支援',
        '單一使用者'
      ],
      limitations: [
        '無優先支援',
        '無API存取',
        '功能限制'
      ],
      color: 'gray',
      current: true
    },
    {
      name: '標準方案',
      price: 'NT$ 999',
      period: '/ 月',
      features: [
        '1,000 次 AI 生成',
        '所有內容模板',
        '10 個自動化流程',
        '優先客服支援',
        '3 個使用者',
        'API 存取',
        '數據分析報表',
        '自訂品牌設定'
      ],
      popular: true,
      color: 'blue',
      current: false
    },
    {
      name: '企業方案',
      price: 'NT$ 2,999',
      period: '/ 月',
      features: [
        '無限次 AI 生成',
        '所有進階功能',
        '無限自動化流程',
        '專屬客服經理',
        '無限使用者',
        '完整 API 存取',
        '進階數據分析',
        '客製化開發',
        '專屬訓練課程',
        'SLA 保證'
      ],
      color: 'purple',
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
          <Crown className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">SaaS 訂閱管理</h1>
          <p className="text-gray-600">選擇最適合您的方案,隨時升級</p>
        </div>
      </div>

      {/* 使用量統計 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">本月使用量</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">AI 生成次數</span>
              <span className="text-sm font-medium">45 / 100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">自動化流程</span>
              <span className="text-sm font-medium">2 / 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">儲存空間</span>
              <span className="text-sm font-medium">1.2 GB / 5 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '24%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 方案比較 */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-medium">
                最受歡迎
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`text-${plan.color}-600 flex-shrink-0 mt-0.5`} size={18} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <button className="w-full py-3 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed">
                  目前方案
                </button>
              ) : (
                <button
                  className={`w-full py-3 bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-700 text-white rounded-lg hover:from-${plan.color}-700 hover:to-${plan.color}-800 font-medium flex items-center justify-center gap-2`}
                >
                  <Zap size={18} />
                  立即升級
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 支付方式 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">💳 支援付款方式</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {['信用卡 (Stripe)', '綠界科技', 'LINE Pay', 'Apple Pay'].map((method) => (
            <div key={method} className="bg-white rounded-lg p-4 text-center font-medium text-gray-700">
              {method}
            </div>
          ))}
        </div>
      </div>

      {/* 企業方案諮詢 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">需要客製化方案?</h2>
        <p className="mb-6 opacity-90">
          我們提供企業級客製化服務,包含專屬功能開發與技術支援
        </p>
        <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100">
          聯繫銷售團隊
        </button>
      </div>
    </div>
  );
}