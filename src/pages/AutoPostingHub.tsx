import { useState } from 'react';
import {
  Calendar,
  Clock,
  Send,
  Facebook,
  MessageCircle,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Copy,
  Wand2
} from 'lucide-react';

type Platform = 'facebook' | 'line' | 'both';
type ContentLength = 'short' | 'medium' | 'long';
type PostStatus = 'scheduled' | 'publishing' | 'published' | 'failed';
type AIModel = 'gpt-4' | 'claude' | 'gemini';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface ScheduledPost {
  id: string;
  platform: Platform;
  content: string;
  scheduledTime: Date;
  status: PostStatus;
  contentType: string;
  aiModel: AIModel;
  length: ContentLength;
}

export default function AutoPostingHub() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('facebook');
  const [contentLength, setContentLength] = useState<ContentLength>('medium');
  const [selectedAI, setSelectedAI] = useState<AIModel>('gpt-4');
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      platform: 'facebook',
      content: '🎉 新品上市！限時優惠中...',
      scheduledTime: new Date(Date.now() + 3600000),
      status: 'scheduled',
      contentType: '促銷活動',
      aiModel: 'gpt-4',
      length: 'medium'
    },
    {
      id: '2',
      platform: 'line',
      content: '📢 會員專屬優惠來囉！',
      scheduledTime: new Date(Date.now() + 7200000),
      status: 'scheduled',
      contentType: '會員通知',
      aiModel: 'claude',
      length: 'short'
    }
  ]);

  const contentTemplates: ContentTemplate[] = [
    { id: '1', name: '促銷活動', description: '限時優惠、特價活動', category: '行銷' },
    { id: '2', name: '新品上市', description: '新產品發布公告', category: '行銷' },
    { id: '3', name: '會員通知', description: '會員專屬訊息', category: '通知' },
    { id: '4', name: '節日祝福', description: '節慶問候文案', category: '互動' },
    { id: '5', name: '知識分享', description: '產業知識、使用技巧', category: '內容' },
    { id: '6', name: '客戶見證', description: '好評分享、案例故事', category: '內容' },
    { id: '7', name: '幕後花絮', description: '品牌故事、團隊介紹', category: '互動' },
    { id: '8', name: '問卷調查', description: '意見徵集、互動問答', category: '互動' }
  ];

  const aiModels = [
    { id: 'gpt-4' as AIModel, name: 'GPT-4', provider: 'OpenAI', description: '強大的文案生成' },
    { id: 'claude' as AIModel, name: 'Claude', provider: 'Anthropic', description: '長文本處理專家' },
    { id: 'gemini' as AIModel, name: 'Gemini', provider: 'Google', description: '多模態理解' }
  ];

  const platforms = [
    { id: 'facebook' as Platform, name: 'Facebook', icon: Facebook, color: 'blue', connected: true },
    { id: 'line' as Platform, name: 'LINE', icon: MessageCircle, color: 'green', connected: true },
    { id: 'both' as Platform, name: '雙平台發布', icon: Send, color: 'purple', connected: true }
  ];

  const contentLengths = [
    { id: 'short' as ContentLength, name: '短文', description: '100-200字', chars: '~150字' },
    { id: 'medium' as ContentLength, name: '中文', description: '300-500字', chars: '~400字' },
    { id: 'long' as ContentLength, name: '長文', description: '800-1200字', chars: '~1000字' }
  ];

  // 生成 AI 文案
  const handleGenerateContent = async () => {
    if (!contentType || !topic) {
      alert('請選擇文章類型並輸入主題');
      return;
    }

    setLoading(true);
    // 模擬 AI 生成
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockContent = generateMockContent(contentType, topic, contentLength, selectedAI);
    setGeneratedContent(mockContent);
    setLoading(false);
  };

  // 模擬內容生成
  const generateMockContent = (
    type: string,
    topic: string,
    length: ContentLength,
    aiModel: AIModel
  ): string => {
    const templates = {
      short: `🎉 ${topic}\n\n限時優惠進行中！\n立即搶購 👉 [連結]\n\n#優惠活動 #${topic.replace(/\s/g, '')}`,
      medium: `🌟 ${topic}\n\n親愛的朋友們，今天要跟大家分享一個好消息！\n\n我們精心準備的「${topic}」活動正式開跑了！🎊\n\n【活動亮點】\n✨ 限時特惠價格\n✨ 買越多省越多\n✨ 滿額免運優惠\n✨ 會員額外折扣\n\n數量有限，售完為止！\n立即行動 👉 [連結]\n\n💬 歡迎留言分享，讓更多朋友知道！\n\n#${topic.replace(/\s/g, '')} #限時優惠 #品質保證\n\n--- 由 ${aiModel.toUpperCase()} 生成 ---`,
      long: `🎯 ${topic} - 完整介紹\n\n親愛的朋友們，大家好！\n\n今天要跟大家深入分享關於「${topic}」的所有細節。相信很多朋友都在期待這次的活動，現在就讓我們一起來了解吧！\n\n【活動背景】\n我們團隊經過數週的精心規劃，希望能為大家帶來最超值的優惠。這次活動不僅價格優惠，更重視品質與服務。\n\n【活動內容】\n✨ 全館商品特價優惠\n✨ 滿額贈送精美好禮\n✨ 會員專屬雙倍點數\n✨ 免運費配送服務\n✨ 7天鑑賞期保障\n\n【為什麼選擇我們？】\n• 嚴選優質商品\n• 快速到貨服務\n• 完善售後保障\n• 專業客服團隊\n\n【參加方式】\n1. 立即進入活動頁面\n2. 選擇喜愛的商品\n3. 結帳享優惠價格\n4. 坐等商品送到家\n\n【溫馨提醒】\n⏰ 活動時間有限\n📦 數量有限，售完為止\n💳 多種付款方式任選\n\n心動不如行動！立即把握機會 👉 [活動連結]\n\n💬 有任何問題歡迎留言，我們會盡快回覆！\n也歡迎分享給需要的朋友喔～\n\n#${topic.replace(/\s/g, '')} #限時活動 #優質推薦 #品質保證 #超值優惠\n\n--- 由 ${aiModel.toUpperCase()} AI 智能生成 ---`
    };

    return templates[length];
  };

  // 加入排程
  const handleSchedulePost = () => {
    if (!generatedContent || !scheduledDate || !scheduledTime) {
      alert('請先生成內容並設定發文時間');
      return;
    }

    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      platform: selectedPlatform,
      content: generatedContent,
      scheduledTime: new Date(`${scheduledDate}T${scheduledTime}`),
      status: 'scheduled',
      contentType: contentType,
      aiModel: selectedAI,
      length: contentLength
    };

    setScheduledPosts([...scheduledPosts, newPost]);
    alert('已加入發文排程！');
    setShowScheduler(true);

    // 清空表單
    setGeneratedContent('');
    setTopic('');
    setKeywords('');
    setScheduledDate('');
    setScheduledTime('');
  };

  // 立即發布
  const handlePublishNow = async (postId: string) => {
    setScheduledPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, status: 'publishing' as PostStatus } : post
      )
    );

    // 模擬發布過程
    await new Promise(resolve => setTimeout(resolve, 2000));

    setScheduledPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, status: 'published' as PostStatus } : post
      )
    );

    alert('發文成功！');
  };

  // 刪除排程
  const handleDeletePost = (postId: string) => {
    if (confirm('確定要刪除此排程嗎？')) {
      setScheduledPosts(posts => posts.filter(post => post.id !== postId));
    }
  };

  const getStatusColor = (status: PostStatus) => {
    switch (status) {
      case 'scheduled': return 'blue';
      case 'publishing': return 'yellow';
      case 'published': return 'green';
      case 'failed': return 'red';
    }
  };

  const getStatusText = (status: PostStatus) => {
    switch (status) {
      case 'scheduled': return '已排程';
      case 'publishing': return '發布中';
      case 'published': return '已發布';
      case 'failed': return '失敗';
    }
  };

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Send className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">自動發文系統</h1>
            <p className="text-gray-600">AI 智能生成 + 排程發布 FB/LINE</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowScheduler(!showScheduler)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
              showScheduler
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Calendar size={18} />
            排程管理 ({scheduledPosts.length})
          </button>
        </div>
      </div>

      {/* 統計 */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-blue-600" size={24} />
            <div className="text-3xl font-bold text-blue-600">
              {scheduledPosts.filter(p => p.status === 'scheduled').length}
            </div>
          </div>
          <div className="text-sm text-gray-600">排程中</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-600" size={24} />
            <div className="text-3xl font-bold text-green-600">
              {scheduledPosts.filter(p => p.status === 'published').length}
            </div>
          </div>
          <div className="text-sm text-gray-600">已發布</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="text-purple-600" size={24} />
            <div className="text-3xl font-bold text-purple-600">AI</div>
          </div>
          <div className="text-sm text-gray-600">智能生成</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <Send className="text-orange-600" size={24} />
            <div className="text-3xl font-bold text-orange-600">2</div>
          </div>
          <div className="text-sm text-gray-600">連接平台</div>
        </div>
      </div>

      {/* 主要內容區 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左側 - 內容生成 */}
        <div className={showScheduler ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">AI 內容生成器</h2>

            {/* 選擇平台 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                發布平台
              </label>
              <div className="grid grid-cols-3 gap-3">
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
                      <Icon className={`text-${platform.color}-600 mb-2 mx-auto`} size={24} />
                      <div className="font-medium text-gray-800 text-sm">{platform.name}</div>
                      {platform.connected && (
                        <div className="text-xs text-green-600 mt-1">● 已連接</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 選擇 AI 模型 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                AI 模型
              </label>
              <div className="grid grid-cols-3 gap-3">
                {aiModels.map((model) => {
                  const isSelected = selectedAI === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => setSelectedAI(model.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-800 text-sm">{model.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{model.provider}</div>
                      <div className="text-xs text-gray-400 mt-1">{model.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 選擇文章類型 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                文章類型
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">請選擇...</option>
                {contentTemplates.map((template) => (
                  <option key={template.id} value={template.name}>
                    {template.name} - {template.description}
                  </option>
                ))}
              </select>
            </div>

            {/* 主題與關鍵字 */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文章主題 *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="例如: 週年慶特賣"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  關鍵字 (選填)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="用逗號分隔"
                />
              </div>
            </div>

            {/* 文章長度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                文章長度
              </label>
              <div className="grid grid-cols-3 gap-3">
                {contentLengths.map((length) => {
                  const isSelected = contentLength === length.id;
                  return (
                    <button
                      key={length.id}
                      onClick={() => setContentLength(length.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-800">{length.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{length.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{length.chars}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 生成按鈕 */}
            <button
              onClick={handleGenerateContent}
              disabled={loading || !contentType || !topic}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  AI 生成中...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  生成文案
                </>
              )}
            </button>

            {/* 生成結果 */}
            {generatedContent && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">生成結果</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedContent);
                      alert('已複製到剪貼簿！');
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1 text-sm"
                  >
                    <Copy size={14} />
                    複製
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-800 text-sm font-sans">
                    {generatedContent}
                  </pre>
                </div>

                {/* 排程設定 */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3">設定發文時間</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-1">
                        日期
                      </label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-1">
                        時間
                      </label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSchedulePost}
                    disabled={!scheduledDate || !scheduledTime}
                    className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    加入排程
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右側 - 排程列表 */}
        {showScheduler && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">發文排程</h2>
            <div className="space-y-3 max-h-[800px] overflow-y-auto">
              {scheduledPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="mx-auto mb-3 text-gray-400" size={48} />
                  <p>尚無排程</p>
                </div>
              ) : (
                scheduledPosts.map((post) => {
                  const Icon = post.platform === 'facebook' ? Facebook : MessageCircle;
                  const statusColor = getStatusColor(post.status);

                  return (
                    <div
                      key={post.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon
                            className={`text-${post.platform === 'facebook' ? 'blue' : 'green'}-600`}
                            size={20}
                          />
                          <span className="font-medium text-gray-800 text-sm">
                            {post.contentType}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 bg-${statusColor}-100 text-${statusColor}-700 text-xs rounded-full`}
                        >
                          {getStatusText(post.status)}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {post.content}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Clock size={14} />
                        {post.scheduledTime.toLocaleString('zh-TW')}
                      </div>

                      {post.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePublishNow(post.id)}
                            className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded text-xs hover:bg-green-700 flex items-center justify-center gap-1"
                          >
                            <Play size={12} />
                            立即發布
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 flex items-center justify-center gap-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* 平台連接狀態 */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="font-bold text-gray-800 mb-4">🔌 平台連接設定</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Facebook className="text-blue-600" size={20} />
                <span className="font-medium">Facebook</span>
              </div>
              <span className="text-xs text-green-600 font-medium">● 已連接</span>
            </div>
            <div className="text-xs text-gray-500">
              粉絲專頁: 您的品牌專頁
            </div>
            <button className="mt-2 w-full px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">
              重新連接
            </button>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="text-green-600" size={20} />
                <span className="font-medium">LINE</span>
              </div>
              <span className="text-xs text-green-600 font-medium">● 已連接</span>
            </div>
            <div className="text-xs text-gray-500">
              官方帳號: @yourlineoa
            </div>
            <button className="mt-2 w-full px-3 py-1.5 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">
              重新連接
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
