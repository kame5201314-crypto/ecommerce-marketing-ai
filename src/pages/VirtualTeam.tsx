import { useState } from 'react';
import { Users, MessageSquare, Sparkles } from 'lucide-react';

type Role = 'designer' | 'video-editor' | 'content-writer' | 'marketer' | 'analyst' | 'director';

interface VirtualStaff {
  id: Role;
  name: string;
  avatar: string;
  role: string;
  description: string;
  capabilities: string[];
  color: string;
}

export default function VirtualTeam() {
  const [selectedStaff, setSelectedStaff] = useState<Role | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  const virtualTeam: VirtualStaff[] = [
    {
      id: 'designer',
      name: 'Aria (美編助理)',
      avatar: '🎨',
      role: 'AI 美編助理',
      description: '專業設計圖片、Banner、社群貼圖',
      capabilities: ['商品圖製作', 'YouTube 縮圖', '社群貼文圖', 'Banner 設計'],
      color: 'purple'
    },
    {
      id: 'video-editor',
      name: 'Victor (剪輯師)',
      avatar: '🎥',
      role: 'AI 影片剪輯員',
      description: '根據腳本產出影片,字幕與配音',
      capabilities: ['短影音製作', '字幕生成', 'AI 配音', '片段剪輯'],
      color: 'red'
    },
    {
      id: 'content-writer',
      name: 'Chloe (內容編輯)',
      avatar: '✍️',
      role: 'AI 內容編輯',
      description: '產生各類文案、腳本、文章改寫',
      capabilities: ['商品文案', 'SEO 文章', '社群貼文', '腳本撰寫'],
      color: 'blue'
    },
    {
      id: 'marketer',
      name: 'Marcus (行銷助理)',
      avatar: '📣',
      role: 'AI 行銷助理',
      description: '建立活動腳本、自動排程發布',
      capabilities: ['活動企劃', '排程管理', '廣告優化', 'AB 測試'],
      color: 'green'
    },
    {
      id: 'analyst',
      name: 'Diana (數據分析員)',
      avatar: '📊',
      role: 'AI 數據分析員',
      description: '解釋銷售報表、客戶行為圖',
      capabilities: ['業績分析', '客戶分群', '趨勢預測', '競品監控'],
      color: 'orange'
    },
    {
      id: 'director',
      name: 'Maxwell (行銷總監)',
      avatar: '💼',
      role: 'AI 行銷總監',
      description: '規劃月度行銷計畫,給出策略建議',
      capabilities: ['策略規劃', '預算分配', '渠道選擇', '成效評估'],
      color: 'indigo'
    }
  ];

  const selectedStaffData = virtualTeam.find((s) => s.id === selectedStaff);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Users className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI 虛擬團隊</h1>
          <p className="text-gray-600">擁有完整的 AI 行銷與創作團隊</p>
        </div>
      </div>

      {/* 團隊成員 */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {virtualTeam.map((staff) => (
          <button
            key={staff.id}
            onClick={() => setSelectedStaff(staff.id)}
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              selectedStaff === staff.id
                ? `border-${staff.color}-500 bg-${staff.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-2">{staff.avatar}</div>
            <div className="font-bold text-gray-800 text-sm mb-1">{staff.name}</div>
            <div className="text-xs text-gray-500">{staff.role}</div>
          </button>
        ))}
      </div>

      {/* 對話介面 */}
      {selectedStaffData && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 成員資訊 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{selectedStaffData.avatar}</div>
              <h3 className="text-xl font-bold text-gray-800">{selectedStaffData.name}</h3>
              <p className="text-sm text-gray-600">{selectedStaffData.role}</p>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">專長能力</div>
              <div className="space-y-2">
                {selectedStaffData.capabilities.map((capability, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 bg-${selectedStaffData.color}-50 text-${selectedStaffData.color}-700 rounded-lg text-sm`}
                  >
                    • {capability}
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-4 bg-gradient-to-br from-${selectedStaffData.color}-50 to-${selectedStaffData.color}-100 rounded-lg border border-${selectedStaffData.color}-200`}>
              <div className="text-sm text-gray-700">{selectedStaffData.description}</div>
            </div>
          </div>

          {/* 對話區域 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg flex flex-col" style={{ height: '600px' }}>
            <div className="p-4 border-b flex items-center gap-3">
              <div className="text-3xl">{selectedStaffData.avatar}</div>
              <div>
                <div className="font-bold text-gray-800">{selectedStaffData.name}</div>
                <div className="text-xs text-green-600">● 線上</div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{selectedStaffData.avatar}</div>
                <div className={`bg-${selectedStaffData.color}-100 rounded-lg p-3 max-w-md`}>
                  <p className="text-gray-800">
                    您好!我是 {selectedStaffData.name},您的專屬 {selectedStaffData.role}。
                    我可以協助您完成 {selectedStaffData.capabilities.join('、')} 等工作。
                    請告訴我您需要什麼協助?
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="輸入您的需求..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
                  <MessageSquare size={20} />
                  發送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 說明 */}
      {!selectedStaff && (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-8 text-center">
          <Sparkles className="text-purple-600 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">選擇團隊成員開始協作</h3>
          <p className="text-gray-600">
            點擊上方任一成員,即可開始與 AI 虛擬團隊協作,讓他們協助您完成各項任務
          </p>
        </div>
      )}
    </div>
  );
}