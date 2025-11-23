import { useState } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Video,
  ShoppingBag,
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
  Mail,
  Sparkles,
  Download,
  Copy,
  Loader2
} from 'lucide-react';

type ContentType =
  | 'product-description'
  | 'seo-article'
  | 'social-post'
  | 'youtube-script'
  | 'email-campaign'
  | 'blog-post'
  | 'shopee-listing'
  | 'fb-ad';

interface ContentTemplate {
  id: ContentType;
  name: string;
  icon: any;
  color: string;
  description: string;
  fields: {
    name: string;
    type: 'text' | 'textarea' | 'select';
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
  }[];
}

export default function ContentGenerationHub() {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const templates: ContentTemplate[] = [
    {
      id: 'product-description',
      name: '商品文案',
      icon: ShoppingBag,
      color: 'blue',
      description: '自動生成吸引人的商品描述',
      fields: [
        { name: 'productName', type: 'text', label: '商品名稱', placeholder: '例如:無線藍牙耳機', required: true },
        { name: 'features', type: 'textarea', label: '商品特色', placeholder: '列出主要特色...', required: true },
        { name: 'target', type: 'select', label: '目標受眾', options: ['年輕族群', '上班族', '家庭主婦', '銀髮族', '學生'] },
        { name: 'tone', type: 'select', label: '文案風格', options: ['專業', '活潑', '溫馨', '時尚', '實用'] }
      ]
    },
    {
      id: 'seo-article',
      name: 'SEO 文章',
      icon: FileText,
      color: 'green',
      description: '生成SEO優化的部落格文章',
      fields: [
        { name: 'keyword', type: 'text', label: '主關鍵字', placeholder: '例如:咖啡機推薦', required: true },
        { name: 'topic', type: 'text', label: '文章主題', placeholder: '例如:2024最新咖啡機評比', required: true },
        { name: 'wordCount', type: 'select', label: '字數', options: ['500字', '1000字', '1500字', '2000字+'] },
        { name: 'tone', type: 'select', label: '文章風格', options: ['專業評測', '使用心得', '新手教學', '產品比較'] }
      ]
    },
    {
      id: 'social-post',
      name: '社群貼文',
      icon: Instagram,
      color: 'pink',
      description: 'IG/FB/LINE 貼文自動生成',
      fields: [
        { name: 'platform', type: 'select', label: '發布平台', options: ['Instagram', 'Facebook', 'LINE', '全平台'], required: true },
        { name: 'topic', type: 'text', label: '貼文主題', placeholder: '例如:新品上市', required: true },
        { name: 'content', type: 'textarea', label: '內容重點', placeholder: '列出想要強調的內容...' },
        { name: 'hashtags', type: 'text', label: 'Hashtag數量', placeholder: '例如:5-10個' }
      ]
    },
    {
      id: 'youtube-script',
      name: 'YouTube 腳本',
      icon: Youtube,
      color: 'red',
      description: '影片腳本與開場白生成',
      fields: [
        { name: 'videoType', type: 'select', label: '影片類型', options: ['開箱評測', '教學指南', '產品比較', 'Vlog日常'], required: true },
        { name: 'product', type: 'text', label: '產品/主題', placeholder: '例如:iPhone 15 Pro', required: true },
        { name: 'duration', type: 'select', label: '影片長度', options: ['3-5分鐘', '5-10分鐘', '10-15分鐘', '15分鐘+'] },
        { name: 'style', type: 'select', label: '風格', options: ['專業', '輕鬆', '幽默', '詳細解說'] }
      ]
    },
    {
      id: 'email-campaign',
      name: 'EDM 郵件',
      icon: Mail,
      color: 'purple',
      description: '行銷郵件與電子報內容',
      fields: [
        { name: 'campaign', type: 'select', label: '活動類型', options: ['促銷優惠', '新品發布', '會員專屬', '節日活動'], required: true },
        { name: 'product', type: 'text', label: '產品/服務', placeholder: '例如:週年慶特賣', required: true },
        { name: 'offer', type: 'text', label: '優惠內容', placeholder: '例如:全館5折' },
        { name: 'cta', type: 'text', label: 'CTA按鈕文字', placeholder: '例如:立即搶購' }
      ]
    },
    {
      id: 'blog-post',
      name: '部落格文章',
      icon: FileText,
      color: 'indigo',
      description: '長篇內容文章生成',
      fields: [
        { name: 'title', type: 'text', label: '文章標題', placeholder: '例如:如何挑選適合的筆電', required: true },
        { name: 'outline', type: 'textarea', label: '文章大綱', placeholder: '列出想要包含的段落...' },
        { name: 'wordCount', type: 'select', label: '字數', options: ['800-1000字', '1500-2000字', '2500-3000字'] },
        { name: 'tone', type: 'select', label: '風格', options: ['專業', '輕鬆', '教學', '故事性'] }
      ]
    },
    {
      id: 'shopee-listing',
      name: '蝦皮商品描述',
      icon: ShoppingBag,
      color: 'orange',
      description: '蝦皮/Momo 商品頁優化',
      fields: [
        { name: 'productName', type: 'text', label: '商品名稱', required: true },
        { name: 'category', type: 'text', label: '商品分類', placeholder: '例如:3C配件' },
        { name: 'features', type: 'textarea', label: '商品特色', placeholder: '功能、規格、優勢...' },
        { name: 'keywords', type: 'text', label: '關鍵字', placeholder: '用逗號分隔' }
      ]
    },
    {
      id: 'fb-ad',
      name: 'Facebook 廣告',
      icon: Facebook,
      color: 'blue',
      description: 'FB/IG 廣告文案生成',
      fields: [
        { name: 'product', type: 'text', label: '推廣商品', required: true },
        { name: 'audience', type: 'select', label: '受眾群體', options: ['18-24歲', '25-34歲', '35-44歲', '45+歲', '全年齡'] },
        { name: 'objective', type: 'select', label: '廣告目標', options: ['品牌認知', '流量導入', '轉換銷售', '互動參與'] },
        { name: 'budget', type: 'select', label: '預算級別', options: ['小預算(<1000)', '中預算(1000-5000)', '大預算(5000+)'] }
      ]
    }
  ];

  const handleGenerate = async () => {
    if (!selectedType) return;

    setLoading(true);

    // 模擬 AI 生成
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockContent = generateMockContent(selectedType, formData);
    setGeneratedContent(mockContent);
    setLoading(false);
  };

  const generateMockContent = (type: ContentType, data: Record<string, string>): string => {
    // 根據不同類型生成模擬內容
    switch (type) {
      case 'product-description':
        return `【${data.productName || '商品'}】\n\n✨ 商品特色\n${data.features || '優質商品,值得推薦'}\n\n🎯 適合族群\n專為${data.target || '所有人'}設計\n\n💯 品質保證\n• 嚴選材料,品質保證\n• 完善售後服務\n• 快速出貨配送\n\n立即購買,享專屬優惠！`;

      case 'seo-article':
        return `# ${data.topic || '文章主題'}\n\n## 前言\n在${new Date().getFullYear()}年,關於「${data.keyword}」的討論越來越熱烈。本文將深入探討相關議題,為您提供完整的資訊與建議。\n\n## 主要內容\n${data.keyword || '關鍵字'}是現代生活中不可或缺的一環...\n\n## 結論\n綜合以上分析,我們可以得出以下結論...\n\n---\n字數: ${data.wordCount || '1000字'}\n風格: ${data.tone || '專業'}`;

      case 'social-post':
        return `📣 ${data.topic || '最新消息'}\n\n${data.content || '精彩內容即將揭曉！'}\n\n✨ 重點亮點:\n• 品質保證\n• 限時優惠\n• 快速配送\n\n#${data.topic?.replace(/\s/g, '') || 'hashtag'} #優惠活動 #限時特價 #品質保證 #立即購買\n\n平台: ${data.platform || 'Instagram'}`;

      case 'youtube-script':
        return `【${data.product || '產品'} ${data.videoType || '開箱'}】影片腳本\n\n[開場 0:00-0:30]\n哈囉大家好,歡迎回到我的頻道！\n今天要跟大家分享${data.product || '這個超棒的產品'}\n\n[開箱 0:30-2:00]\n首先我們來看看外觀和包裝...\n\n[功能介紹 2:00-5:00]\n接下來示範主要功能...\n\n[總結 5:00-結束]\n總的來說,這個${data.product || '產品'}非常值得推薦！\n\n影片長度: ${data.duration || '5-10分鐘'}\n風格: ${data.style || '專業'}`;

      case 'email-campaign':
        return `主旨: 🎉 ${data.campaign || '限時優惠'} | ${data.product || '超值商品'}\n\n親愛的會員您好,\n\n${data.campaign || '特別活動'}來囉！\n\n🎁 ${data.offer || '超值優惠等您拿'}\n\n【活動詳情】\n• 活動商品: ${data.product || '精選商品'}\n• 優惠內容: ${data.offer || '限時折扣'}\n• 活動期限: 即日起至售完為止\n\n[${data.cta || '立即選購'}]\n\n感謝您的支持！`;

      default:
        return `${data.title || '標題'}\n\n${data.outline || '這裡是生成的內容...'}\n\n生成完成！`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('已複製到剪貼簿！');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedType}-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI 內容生成中心</h1>
          <p className="text-gray-600">自動生成各類行銷內容,提升工作效率</p>
        </div>
      </div>

      {/* 內容類型選擇 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">選擇內容類型</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedType === template.id;
            return (
              <button
                key={template.id}
                onClick={() => {
                  setSelectedType(template.id);
                  setFormData({});
                  setGeneratedContent('');
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? `border-${template.color}-500 bg-${template.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`text-${template.color}-600 mb-2`} size={24} />
                <div className="font-semibold text-gray-800">{template.name}</div>
                <div className="text-xs text-gray-500 mt-1">{template.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 表單輸入 */}
      {selectedType && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">填寫內容資訊</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {templates.find(t => t.id === selectedType)?.fields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder={field.placeholder}
                  />
                )}
                {field.type === 'select' && (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">請選擇...</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  AI 生成中...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  開始生成
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 生成結果 */}
      {generatedContent && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">生成結果</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Copy size={18} />
                複製
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Download size={18} />
                下載
              </button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
              {generatedContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}