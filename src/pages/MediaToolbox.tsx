import { useState } from 'react';
import { Image, Mic, Video, Wand2, Download } from 'lucide-react';

type Tool = 'image-gen' | 'voice' | 'video' | 'image-edit';

export default function MediaToolbox() {
  const [selectedTool, setSelectedTool] = useState<Tool>('image-gen');

  const tools = [
    {
      id: 'image-gen' as Tool,
      name: 'AI 圖片生成',
      icon: Image,
      color: 'purple',
      description: '文字轉圖片、商品場景生成'
    },
    {
      id: 'voice' as Tool,
      name: 'AI 配音',
      icon: Mic,
      color: 'blue',
      description: '文字轉語音、多種聲音風格'
    },
    {
      id: 'video' as Tool,
      name: '短影音製作',
      icon: Video,
      color: 'red',
      description: '腳本自動產生影片'
    },
    {
      id: 'image-edit' as Tool,
      name: '圖片編輯',
      icon: Wand2,
      color: 'green',
      description: '去背、美化、尺寸調整'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Video className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">影音 AI 工具箱</h1>
          <p className="text-gray-600">AI 圖片生成、配音、影片製作一站搞定</p>
        </div>
      </div>

      {/* 工具選擇 */}
      <div className="grid md:grid-cols-4 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                isSelected
                  ? `border-${tool.color}-500 bg-${tool.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`text-${tool.color}-600 mb-3 mx-auto`} size={32} />
              <div className="font-bold text-gray-800 mb-1">{tool.name}</div>
              <div className="text-xs text-gray-500">{tool.description}</div>
            </button>
          );
        })}
      </div>

      {/* 工具介面 */}
      {selectedTool === 'image-gen' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">AI 圖片生成</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                圖片描述
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={4}
                placeholder="描述你想要生成的圖片,例如: 一個時尚的藍牙耳機放在木桌上,自然光線..."
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  圖片風格
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>寫實風格</option>
                  <option>插畫風格</option>
                  <option>3D 渲染</option>
                  <option>極簡風格</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  尺寸
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>1:1 (1024x1024)</option>
                  <option>16:9 (1920x1080)</option>
                  <option>9:16 (1080x1920)</option>
                  <option>4:3 (1600x1200)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  生成數量
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>1 張</option>
                  <option>3 張</option>
                  <option>5 張</option>
                  <option>10 張</option>
                </select>
              </div>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-medium flex items-center justify-center gap-2">
              <Wand2 size={20} />
              開始生成
            </button>
          </div>
        </div>
      )}

      {selectedTool === 'voice' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">AI 配音服務</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                配音文字
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="輸入要轉換成語音的文字..."
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  語言
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>繁體中文</option>
                  <option>英文</option>
                  <option>日文</option>
                  <option>韓文</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  聲音風格
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>女聲-專業</option>
                  <option>女聲-親和</option>
                  <option>男聲-渾厚</option>
                  <option>男聲-活潑</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  語速
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>正常</option>
                  <option>較慢</option>
                  <option>較快</option>
                </select>
              </div>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium flex items-center justify-center gap-2">
              <Mic size={20} />
              生成配音
            </button>
          </div>
        </div>
      )}

      {/* API整合說明 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-bold text-gray-800 mb-3">🔌 支援的 AI 服務</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium text-purple-600 mb-1">圖片生成</div>
            <div className="text-gray-600">Replicate, Midjourney, DALL-E</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium text-blue-600 mb-1">配音服務</div>
            <div className="text-gray-600">ElevenLabs, Azure Speech</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-medium text-red-600 mb-1">影片製作</div>
            <div className="text-gray-600">Runway, Pika Labs</div>
          </div>
        </div>
      </div>
    </div>
  );
}