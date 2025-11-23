import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const features = [
    {
      title: 'AI 內容生成中心',
      description: '自動生成商品文案、SEO文章、社群貼文',
      icon: Sparkles,
      color: 'blue',
      link: '/content',
      stats: [
        { label: '文案類型', value: '10+' },
        { label: '平台支援', value: '5+' },
        { label: '語言支援', value: '多國' }
      ]
    },
    {
      title: '行銷自動化中心',
      description: '廣告腳本優化、自動排程、CTA優化建議',
      icon: Zap,
      color: 'purple',
      link: '/marketing',
      stats: [
        { label: '廣告平台', value: 'FB/Google' },
        { label: '自動排程', value: '支援' },
        { label: '轉換率', value: '+150%' }
      ]
    },
    {
      title: '智能客服系統',
      description: 'LINE/Telegram機器人、自動分類、情緒分析',
      icon: Shield,
      color: 'green',
      link: '/customer-service',
      stats: [
        { label: '通道支援', value: '3+' },
        { label: '回應速度', value: '<1秒' },
        { label: '處理量', value: '無限' }
      ]
    },
    {
      title: 'AI 數據分析',
      description: '訂單分析、顧客分群、競品監控',
      icon: TrendingUp,
      color: 'orange',
      link: '/analytics',
      stats: [
        { label: '數據源', value: '10+' },
        { label: '分析維度', value: '20+' },
        { label: '更新頻率', value: '即時' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* 歡迎橫幅 */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-white">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={40} />
            <h1 className="text-4xl font-bold">你的一站式 AI 自動化平台</h1>
          </div>
          <p className="text-xl opacity-90 mb-8">
            整合多個 AI 工具,幫助您自動化內容生成、行銷、客服、數據分析等所有業務流程
          </p>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold">8+</div>
              <div className="text-sm opacity-90">AI 功能模組</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold">20+</div>
              <div className="text-sm opacity-90">自動化工具</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold">10x</div>
              <div className="text-sm opacity-90">效率提升</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-90">全天候運作</div>
            </div>
          </div>
        </div>
      </div>

      {/* 核心功能模組 */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">核心功能模組</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 bg-${feature.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`text-${feature.color}-600`} size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                  {feature.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-xl font-bold text-${feature.color}-600`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  開始使用
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 完整功能列表 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">完整功能列表</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-blue-600 mb-3">📝 內容生成</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 商品文案產生</li>
              <li>• SEO 文章生成</li>
              <li>• 社群貼文創作</li>
              <li>• YouTube 腳本</li>
              <li>• EDM 郵件內容</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-purple-600 mb-3">📢 行銷自動化</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• FB/Google 廣告</li>
              <li>• 內容排程發布</li>
              <li>• CTA 優化建議</li>
              <li>• 行銷漏斗設計</li>
              <li>• A/B 測試分析</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-600 mb-3">💬 智能客服</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• LINE Bot 自動回覆</li>
              <li>• Telegram 機器人</li>
              <li>• 客戶分類派工</li>
              <li>• 情緒分析報告</li>
              <li>• 常見問題彙整</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-orange-600 mb-3">📊 數據分析</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 訂單數據分析</li>
              <li>• 顧客行為分群</li>
              <li>• 競品價格監控</li>
              <li>• 銷售趨勢預測</li>
              <li>• ROI 投報分析</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-600 mb-3">🎨 影音工具</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• AI 圖片生成</li>
              <li>• AI 配音服務</li>
              <li>• 影片腳本產生</li>
              <li>• 圖片去背美化</li>
              <li>• 短影音製作</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-600 mb-3">🔄 流程自動化</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• n8n 工作流程</li>
              <li>• Webhook 整合</li>
              <li>• API 串接服務</li>
              <li>• 定時任務排程</li>
              <li>• 多平台同步</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-600 mb-3">👑 SaaS 訂閱</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 會員分級制度</li>
              <li>• 額度使用管理</li>
              <li>• Stripe 金流</li>
              <li>• 綠界支付整合</li>
              <li>• 用量統計報表</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-pink-600 mb-3">👥 虛擬團隊</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• AI 美編助理</li>
              <li>• AI 影片剪輯員</li>
              <li>• AI 內容編輯</li>
              <li>• AI 行銷助理</li>
              <li>• AI 數據分析員</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 使用流程 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          三步驟開始使用
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white shadow-lg">
              1
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">選擇功能模組</h3>
            <p className="text-gray-600">
              從 8 大功能模組中選擇您需要的工具
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white shadow-lg">
              2
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">輸入基本資訊</h3>
            <p className="text-gray-600">
              提供簡單的商品或需求描述
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white shadow-lg">
              3
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">AI 自動產出</h3>
            <p className="text-gray-600">
              AI 即時生成並可自動執行流程
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">準備好提升您的效率了嗎?</h2>
        <p className="text-lg opacity-90 mb-6">
          立即開始使用 AI 自動化平台,讓 AI 成為您最強大的工作夥伴
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/content"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            開始使用
          </Link>
          <Link
            to="/subscription"
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            查看方案
          </Link>
        </div>
      </div>
    </div>
  );
}