// OpenAI API 整合服務

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * 呼叫 OpenAI API
 */
export async function callOpenAI(
  prompt: string,
  systemMessage: string = '你是一位專業的電商行銷文案撰寫專家。',
  model: string = 'gpt-4'
): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.warn('⚠️ 未設定 OPENAI_API_KEY，使用模擬資料');
    throw new Error('未設定 API Key');
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API 錯誤: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API 呼叫失敗:', error);
    throw error;
  }
}

/**
 * 抓取網頁內容（使用第三方服務或自建後端）
 */
export async function fetchWebContent(url: string): Promise<string> {
  // 方案一：使用免費的 API（例如 allorigins.win）
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error('無法抓取網頁內容');
    }

    const data = await response.json();
    const html = data.contents;

    // 簡單的 HTML 清理，提取文字內容
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return text.substring(0, 3000); // 限制長度
  } catch (error) {
    console.error('網頁抓取失敗:', error);
    throw error;
  }
}

/**
 * 使用 OpenAI 分析網頁內容
 */
export async function analyzeProductFromUrl(url: string): Promise<any> {
  try {
    // 1. 抓取網頁內容
    const webContent = await fetchWebContent(url);

    // 2. 使用 GPT 分析
    const prompt = `
請分析以下網頁內容，提取商品資訊，並以 JSON 格式回傳：

網頁內容：
${webContent}

請回傳格式：
{
  "name": "商品名稱",
  "description": "商品簡短描述",
  "category": "商品分類",
  "price": 價格數字（如果有的話），
  "attributes": {
    "color": ["顏色1", "顏色2"],
    "size": ["尺寸1"],
    "material": "材質",
    "usage": ["用途1", "用途2"]
  }
}

只需回傳 JSON，不要其他說明文字。
    `;

    const result = await callOpenAI(
      prompt,
      '你是一位專業的商品資訊分析專家，擅長從網頁內容中提取結構化的商品資訊。',
      'gpt-4'
    );

    // 解析 JSON
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('無法解析商品資訊');
  } catch (error) {
    console.error('商品分析失敗:', error);
    throw error;
  }
}

/**
 * 生成商品文案
 */
export async function generateProductCopy(
  productName: string,
  productDescription: string,
  copyType: string
): Promise<{ title: string; content: string; keywords: string[] }> {
  const prompts: Record<string, string> = {
    seo: `
請為以下商品撰寫 SEO 優化版文案：

商品名稱：${productName}
商品描述：${productDescription}

要求：
1. 標題要包含主要關鍵字，60字以內
2. 內容要自然融入關鍵字，150-200字
3. 提供 5-8 個相關關鍵字

回傳 JSON 格式：
{
  "title": "標題",
  "content": "內容",
  "keywords": ["關鍵字1", "關鍵字2", ...]
}
    `,
    ecommerce: `
請為以下商品撰寫電商銷售版文案：

商品名稱：${productName}
商品描述：${productDescription}

要求：
1. 標題要吸引人，強調優惠或特色
2. 內容要包含：特色列表、優惠資訊、CTA
3. 使用 emoji 增加吸引力
4. 200-300字

回傳 JSON 格式：
{
  "title": "標題",
  "content": "內容（可使用 emoji 和換行）",
  "keywords": ["關鍵字1", "關鍵字2"]
}
    `,
    emotional: `
請為以下商品撰寫感性故事版文案：

商品名稱：${productName}
商品描述：${productDescription}

要求：
1. 用故事化的方式呈現
2. 創造情感共鳴
3. 避免過度推銷
4. 200-300字

回傳 JSON 格式：
{
  "title": "標題",
  "content": "故事內容",
  "keywords": ["關鍵字1", "關鍵字2"]
}
    `,
    short_title: `
請為以下商品撰寫簡短標題：

商品名稱：${productName}
商品描述：${productDescription}

要求：
1. 標題 20-30 字
2. 簡潔有力
3. 包含核心賣點

回傳 JSON 格式：
{
  "title": "簡短標題",
  "content": "一句話描述",
  "keywords": ["關鍵字1", "關鍵字2"]
}
    `,
    shopee_spec: `
請為以下商品撰寫蝦皮格式文案：

商品名稱：${productName}
商品描述：${productDescription}

要求：
1. 標題 60 字以內，包含規格
2. 內容要包含：完整規格、賣點列表
3. 使用蝦皮常見格式（✓ 符號、分段清楚）

回傳 JSON 格式：
{
  "title": "標題",
  "content": "規格＋賣點內容",
  "keywords": ["關鍵字1", "關鍵字2"]
}
    `
  };

  try {
    const prompt = prompts[copyType] || prompts.ecommerce;
    const result = await callOpenAI(prompt, '你是專業的電商文案撰寫專家。');

    // 解析 JSON
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('無法解析文案');
  } catch (error) {
    console.error('文案生成失敗:', error);
    throw error;
  }
}

/**
 * 生成受眾分析
 */
export async function analyzeAudience(productName: string, productDescription: string): Promise<any> {
  const prompt = `
請分析以下商品的目標受眾：

商品名稱：${productName}
商品描述：${productDescription}

請提供詳細的受眾分析，包含：
1. 3-5 個建議受眾群體（名稱、描述、市場規模、相關性分數 0-100、建議平台）
2. 人口統計資訊（年齡範圍、性別分布、興趣、行為特徵）
3. 關鍵字建議
4. 目標市場

回傳 JSON 格式：
{
  "productName": "${productName}",
  "suggestedAudiences": [
    {
      "name": "受眾名稱",
      "description": "描述",
      "size": "small/medium/large",
      "relevanceScore": 95,
      "suggestedPlatforms": ["instagram", "facebook"]
    }
  ],
  "demographics": {
    "ageRange": ["18-24", "25-34"],
    "gender": ["女性 60%", "男性 40%"],
    "interests": ["興趣1", "興趣2"],
    "behaviors": ["行為1", "行為2"]
  },
  "keywords": ["關鍵字1", "關鍵字2"],
  "targetMarkets": ["台灣", "香港"]
}
  `;

  try {
    const result = await callOpenAI(prompt, '你是專業的市場分析專家。');

    // 解析 JSON
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('無法解析受眾分析');
  } catch (error) {
    console.error('受眾分析失敗:', error);
    throw error;
  }
}
