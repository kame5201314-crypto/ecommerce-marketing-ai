# 🚀 自動發文系統 - 完整使用指南

## 📋 功能介紹

**自動發文系統**整合了 AI 智能文案生成與社群平台自動發布功能,讓你可以:
- ✅ 自動生成 Facebook 和 LINE 的發文內容
- ✅ 選擇 GPT-4、Claude、Gemini 等 AI 模型
- ✅ 設定短、中、長篇文章長度
- ✅ 排程指定時間自動發布
- ✅ 管理所有發文排程

---

## 🎯 核心功能

### 1. AI 智能文案生成

支援多種 AI 模型:
- **GPT-4** (OpenAI) - 強大的文案生成能力
- **Claude** (Anthropic) - 長文本處理專家
- **Gemini** (Google) - 多模態理解

### 2. 多平台發布

支援平台:
- 🔵 **Facebook** 粉絲專頁
- 🟢 **LINE** 官方帳號
- 🟣 **雙平台同時發布**

### 3. 靈活的文章長度

根據需求選擇:
- **短文** (100-200字) - 快速互動貼文
- **中文** (300-500字) - 標準行銷內容
- **長文** (800-1200字) - 深度內容分享

### 4. 多種內容類型

預設 8 種文章模板:
1. **促銷活動** - 限時優惠、特價活動
2. **新品上市** - 新產品發布公告
3. **會員通知** - 會員專屬訊息
4. **節日祝福** - 節慶問候文案
5. **知識分享** - 產業知識、使用技巧
6. **客戶見證** - 好評分享、案例故事
7. **幕後花絮** - 品牌故事、團隊介紹
8. **問卷調查** - 意見徵集、互動問答

### 5. 發文排程管理

完整的排程系統:
- 📅 設定發文日期與時間
- 📊 查看所有排程狀態
- ▶️ 立即發布功能
- 🗑️ 刪除排程
- 📈 發布狀態追蹤

---

## 🚀 快速開始

### 步驟 1: 進入自動發文系統

1. 登入系統後,點擊側邊欄的「自動發文」
2. 或訪問: `http://localhost:5173/auto-posting`

### 步驟 2: 選擇設定

1. **選擇發布平台**
   - Facebook
   - LINE
   - 雙平台同時發布

2. **選擇 AI 模型**
   - GPT-4 (推薦)
   - Claude (長文本)
   - Gemini (多模態)

3. **選擇文章類型**
   - 從下拉選單選擇 (促銷活動、新品上市等)

4. **選擇文章長度**
   - 短文 (~150字)
   - 中文 (~400字)
   - 長文 (~1000字)

### 步驟 3: 生成文案

1. 輸入**文章主題** (必填)
   - 例如: "週年慶特賣"

2. 輸入**關鍵字** (選填)
   - 例如: "優惠,折扣,限時"

3. 點擊「生成文案」按鈕

4. AI 會根據設定自動產生文案

### 步驟 4: 設定發文時間

1. 查看生成的文案
2. 可點擊「複製」按鈕複製內容
3. 設定**發文日期**與**時間**
4. 點擊「加入排程」

### 步驟 5: 管理排程

1. 點擊右上角「排程管理」查看所有排程
2. 可以:
   - ▶️ 立即發布
   - 🗑️ 刪除排程
   - 👁️ 查看詳細內容

---

## 💡 使用範例

### 範例 1: 促銷活動貼文

**設定:**
- 平台: Facebook
- AI 模型: GPT-4
- 文章類型: 促銷活動
- 主題: "雙11購物節"
- 長度: 中文

**生成結果:**
```
🌟 雙11購物節

親愛的朋友們，今天要跟大家分享一個好消息！

我們精心準備的「雙11購物節」活動正式開跑了！🎊

【活動亮點】
✨ 限時特惠價格
✨ 買越多省越多
✨ 滿額免運優惠
✨ 會員額外折扣

數量有限，售完為止！
立即行動 👉 [連結]

💬 歡迎留言分享，讓更多朋友知道！

#雙11購物節 #限時優惠 #品質保證
```

---

### 範例 2: LINE 會員通知

**設定:**
- 平台: LINE
- AI 模型: Claude
- 文章類型: 會員通知
- 主題: "會員專屬優惠"
- 長度: 短文

**生成結果:**
```
🎉 會員專屬優惠

限時優惠進行中！
立即搶購 👉 [連結]

#優惠活動 #會員專屬優惠
```

---

### 範例 3: 知識分享長文

**設定:**
- 平台: 雙平台
- AI 模型: GPT-4
- 文章類型: 知識分享
- 主題: "如何挑選適合的咖啡機"
- 長度: 長文

**生成結果:**
詳細的咖啡機選購指南文章 (~1000字)

---

## 🔧 進階功能

### 1. 平台連接設定

**Facebook 連接:**
1. 進入設定區域
2. 點擊「重新連接」
3. 使用 Facebook 登入
4. 授權粉絲專頁管理權限
5. 選擇要發布的粉絲專頁

**LINE 連接:**
1. 建立 LINE 官方帳號
2. 取得 Channel Access Token
3. 在設定中輸入 Token
4. 測試連接

### 2. 自訂 AI 提示詞

未來版本將支援:
- 自訂文案風格
- 品牌語調設定
- 特定格式要求

### 3. 批次生成與發布

可以:
- 一次生成多篇文案
- 批次加入排程
- 設定週期性發布

---

## 📊 功能狀態

### 已完成功能 ✅

- [x] AI 文案生成 (GPT-4、Claude、Gemini)
- [x] 平台選擇 (Facebook、LINE、雙平台)
- [x] 文章長度選擇 (短、中、長)
- [x] 8 種內容類型模板
- [x] 發文排程系統
- [x] 排程管理介面
- [x] 立即發布功能
- [x] 刪除排程功能
- [x] 複製文案功能
- [x] 平台連接狀態顯示

### 待整合功能 🔄

- [ ] 真實 Facebook Graph API 整合
- [ ] 真實 LINE Messaging API 整合
- [ ] 真實 OpenAI API 呼叫
- [ ] Supabase 資料庫儲存排程
- [ ] 定時任務執行器 (Cron Job)
- [ ] 圖片上傳與發布
- [ ] 發布結果通知
- [ ] 發文成效追蹤

---

## 🔌 API 整合指南

### Facebook Graph API

**所需設定:**
```env
VITE_FACEBOOK_APP_ID=your_app_id
VITE_FACEBOOK_APP_SECRET=your_app_secret
VITE_FACEBOOK_PAGE_ID=your_page_id
VITE_FACEBOOK_ACCESS_TOKEN=your_access_token
```

**發布貼文範例:**
```typescript
const publishToFacebook = async (content: string) => {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${PAGE_ID}/feed`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: content,
        access_token: ACCESS_TOKEN
      })
    }
  );
  return response.json();
};
```

---

### LINE Messaging API

**所需設定:**
```env
VITE_LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
VITE_LINE_CHANNEL_SECRET=your_channel_secret
```

**推播訊息範例:**
```typescript
const publishToLINE = async (content: string) => {
  const response = await fetch(
    'https://api.line.me/v2/bot/message/broadcast',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        messages: [
          {
            type: 'text',
            text: content
          }
        ]
      })
    }
  );
  return response.json();
};
```

---

### OpenAI GPT-4 API

**文案生成範例:**
```typescript
const generateContent = async (
  contentType: string,
  topic: string,
  length: string
) => {
  const response = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: '你是專業的社群媒體文案撰寫專家'
          },
          {
            role: 'user',
            content: `請為「${topic}」撰寫一篇${contentType}的${length}文案`
          }
        ],
        temperature: 0.7,
        max_tokens: length === 'short' ? 300 : length === 'medium' ? 600 : 1500
      })
    }
  );
  const data = await response.json();
  return data.choices[0].message.content;
};
```

---

## 🎓 最佳實踐

### 1. 文案撰寫技巧

**DO ✅**
- 明確的主題
- 包含 Call-to-Action (CTA)
- 使用表情符號增加互動
- 加入相關 Hashtag
- 段落分明,易於閱讀

**DON'T ❌**
- 過度使用表情符號
- 文案過長難以閱讀
- 缺少互動元素
- 沒有明確的行動呼籲

### 2. 排程建議

**最佳發文時間:**

**Facebook:**
- 週三 11:00-13:00
- 週四 13:00-16:00
- 週五 13:00-16:00

**LINE:**
- 週一至週五 12:00-13:00 (午休時間)
- 週一至週五 18:00-20:00 (下班時間)
- 週末 10:00-12:00

### 3. 內容規劃

**每週發文頻率建議:**
- Facebook: 3-5 則
- LINE: 2-3 則

**內容組合建議:**
- 40% 促銷/產品資訊
- 30% 知識/價值內容
- 20% 互動/娛樂內容
- 10% 品牌故事

---

## 📈 成效追蹤

### 追蹤指標

**Facebook:**
- 觸及人數
- 互動次數 (按讚、留言、分享)
- 點擊率 (CTR)
- 轉換率

**LINE:**
- 開啟率
- 點擊率
- 封鎖率
- 好友增減數

### 優化建議

1. **A/B 測試**
   - 測試不同文案風格
   - 測試不同發文時間
   - 測試不同 CTA

2. **數據分析**
   - 每週檢視成效
   - 調整內容策略
   - 優化發文時間

---

## ❓ 常見問題

### Q1: 如何連接 Facebook 粉絲專頁?

A:
1. 建立 Facebook App
2. 取得粉絲專頁存取權杖
3. 在設定中輸入權杖
4. 測試連接

### Q2: LINE 官方帳號如何設定?

A:
1. 申請 LINE Official Account
2. 建立 Messaging API Channel
3. 取得 Channel Access Token
4. 設定 Webhook (選用)

### Q3: 可以同時管理多個粉絲專頁嗎?

A: 目前版本支援單一粉絲專頁,未來將支援多專頁管理。

### Q4: 如果發文失敗怎麼辦?

A: 系統會顯示失敗狀態,可以:
- 檢查平台連接狀態
- 檢查權限設定
- 重新發布

### Q5: 可以編輯已排程的文案嗎?

A: 目前需要刪除後重新建立,未來版本將支援編輯功能。

---

## 🚀 未來發展

### 近期規劃

- [ ] Instagram 整合
- [ ] Twitter/X 整合
- [ ] 圖片/影片上傳
- [ ] 編輯排程功能
- [ ] 週期性發布設定

### 中期規劃

- [ ] 多帳號管理
- [ ] 團隊協作功能
- [ ] 發文審核流程
- [ ] 成效分析儀表板

### 長期規劃

- [ ] AI 自動優化文案
- [ ] 智能發文時間建議
- [ ] 競品追蹤分析
- [ ] 自動回覆整合

---

## 📞 技術支援

- **查看主文檔:** [AI_AUTOMATION_PLATFORM_README.md](./AI_AUTOMATION_PLATFORM_README.md)
- **問題回報:** GitHub Issues
- **技術諮詢:** support@example.com

---

## 🎉 開始使用

```bash
# 啟動開發伺服器
npm run dev

# 訪問自動發文系統
http://localhost:5173/auto-posting
```

**立即體驗 AI 智能發文,解放你的社群經營時間!** 🚀
