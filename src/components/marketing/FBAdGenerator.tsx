import { useState } from 'react';
import { Facebook, Loader2, Wand2, Copy } from 'lucide-react';
import { ProductInfo } from '../../types/marketing';
import { CopywritingService } from '../../services/aiMarketingService';

// FB 廣告文案長度
enum FBCopyLength {
  SHORT = 'short',   // 100字以內
  LONG = 'long'      // 200字以內
}

// FB 廣告素材
interface FBAdCopy {
  id: string;
  headline: string;      // 標題 (40字以內)
  primaryText: string;   // 文案
  description: string;   // 說明 (30字以內)
}

export default function FBAdGenerator() {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: '',
    url: '',
    description: ''
  });

  const [adCount, setAdCount] = useState(3);
  const [copyLength, setCopyLength] = useState<FBCopyLength>(FBCopyLength.SHORT);
  const [ads, setAds] = useState<FBAdCopy[]>([]);
  const [loading, setLoading] = useState(false);

  // 生成廣告
  const handleGenerate = async () => {
    if (!productInfo.name && !productInfo.url) {
      alert('請輸入商品名稱或商品網址');
      return;
    }

    setLoading(true);
    try {
      let finalProductInfo = productInfo;

      // 如果有網址但沒有商品名稱，先分析網址
      if (productInfo.url && !productInfo.name) {
        const analyzedInfo = await CopywritingService.analyzeProductUrl(productInfo.url);
        finalProductInfo = { ...productInfo, ...analyzedInfo };
        setProductInfo(finalProductInfo);
      }

      // 生成廣告
      const generated = generateFBAds(finalProductInfo, adCount, copyLength);
      setAds(generated);
    } catch (error) {
      alert('廣告生成失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 生成 FB 廣告文案
  const generateFBAds = (product: ProductInfo, count: number, length: FBCopyLength): FBAdCopy[] => {
    const ads: FBAdCopy[] = [];

    // 標題模板 (40字以內)
    const headlines = [
      `限時優惠！${product.name}`,
      `${product.name} - 熱銷推薦`,
      `必買！${product.name}`,
      `${product.name} 超值特惠`,
      `${product.name} 品質保證`,
      `新品上市 ${product.name}`,
      `${product.name} 限量優惠中`,
      `${product.name} 免運特價`,
      `熱銷${product.name}`,
      `${product.name} 獨家優惠`
    ];

    // 說明模板 (30字以內)
    const descriptions = [
      '台灣現貨，快速出貨',
      '品質保證，安心購買',
      '限時優惠，把握機會',
      '滿額免運，超值優惠',
      '七天鑑賞，售後無憂',
      '熱銷推薦，好評不斷',
      '專業品質，值得信賴',
      '限量供應，售完為止',
      '會員專屬優惠價',
      '下單即享折扣'
    ];

    // 短文案模板 (100字以內)
    const shortTexts = [
      `🔥 ${product.name}限時特惠中！\n\n✨ 優質材料，品質保證\n📦 台灣現貨，快速出貨\n🛡️ 七天鑑賞期\n\n立即購買，享專屬優惠！`,
      `💝 精選${product.name}\n\n• 高品質保證\n• 超值優惠價\n• 快速到貨\n\n數量有限，要買要快！`,
      `🌟 熱銷${product.name}！\n\n眾多顧客好評推薦\n品質保證，售後無憂\n\n現在下單享限時折扣`,
      `✨ ${product.name}超值優惠\n\n🎁 買就送好禮\n🚚 滿額免運\n💯 品質保證\n\n把握機會，立即搶購！`,
      `🎯 必買${product.name}\n\n專業品質，值得信賴\n台灣現貨，隔日到貨\n\n限時優惠中！`
    ];

    // 長文案模板 (200字以內)
    const longTexts = [
      `🔥 ${product.name}限時特惠！\n\n【為什麼選擇我們？】\n✓ 嚴選優質材料，品質有保障\n✓ 專業設計，滿足各種需求\n✓ 台灣在地倉儲，快速出貨\n\n【購物保障】\n📦 24小時內出貨\n🔄 七天鑑賞期，不滿意可退\n🛡️ 一年保固服務\n💬 專業客服即時回覆\n\n⏰ 限時優惠中，數量有限！\n立即下單，把握機會！`,
      `💝 ${product.name} - 熱銷推薦\n\n這款${product.name}是我們精心挑選的優質商品！\n\n【產品特色】\n• 採用優質材料，耐用持久\n• 時尚設計，美觀實用\n• 操作簡單，輕鬆上手\n\n【專屬優惠】\n🎁 現在下單送精美好禮\n🚚 滿額享免運優惠\n💰 會員再享額外折扣\n\n數量有限，手刀搶購！`,
      `🌟 萬人推薦！${product.name}\n\n累積超過千位滿意顧客好評！\n\n【顧客評價】\n⭐⭐⭐⭐⭐「品質超好，大推！」\n⭐⭐⭐⭐⭐「出貨快，客服親切」\n⭐⭐⭐⭐⭐「CP值超高！」\n\n【購買保障】\n✓ 品質保證\n✓ 快速出貨\n✓ 售後服務完善\n\n限時優惠進行中，立即購買！`,
      `✨ ${product.name} 超值組合\n\n【產品介紹】\n${product.name}是您生活中的好幫手！採用優質材料製作，經過嚴格品質把關。\n\n【五大優勢】\n1️⃣ 優質材料\n2️⃣ 精緻做工\n3️⃣ 時尚外觀\n4️⃣ 實用便利\n5️⃣ 超值價格\n\n🎉 現在購買即享專屬折扣！\n📦 台灣現貨，快速到貨！`,
      `🎯 ${product.name} 獨家優惠\n\n【限時活動】\n原價直接砍！超殺優惠價\n買越多省越多！\n\n【商品特色】\n✓ 高品質保證\n✓ 專業設計\n✓ 耐用持久\n✓ 美觀時尚\n\n【服務保障】\n📦 快速出貨\n🔄 七天鑑賞\n🛡️ 售後無憂\n\n⏰ 優惠倒數中，把握機會！`
    ];

    const texts = length === FBCopyLength.SHORT ? shortTexts : longTexts;

    for (let i = 0; i < count; i++) {
      ads.push({
        id: `fb_ad_${Date.now()}_${i}`,
        headline: headlines[i % headlines.length].substring(0, 40),
        primaryText: texts[i % texts.length],
        description: descriptions[i % descriptions.length]
      });
    }

    return ads;
  };

  // 複製單一廣告
  const handleCopy = (ad: FBAdCopy) => {
    const text = `【標題】\n${ad.headline}\n\n【文案】\n${ad.primaryText}\n\n【說明】\n${ad.description}`;
    navigator.clipboard.writeText(text);
    alert('已複製到剪貼簿！');
  };

  // 複製所有廣告
  const handleCopyAll = () => {
    const text = ads.map((ad, i) =>
      `=== 廣告 ${i + 1} ===\n【標題】\n${ad.headline}\n\n【文案】\n${ad.primaryText}\n\n【說明】\n${ad.description}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('已複製所有廣告到剪貼簿！');
  };

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">FB 廣告文案生成</h2>
        <p className="text-gray-600 mt-1">
          自動生成 Facebook 廣告標題、文案與說明
        </p>
      </div>

      {/* 商品資訊 */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">商品資訊</h3>

        {/* 商品網址 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            商品網址（選填，貼上後可自動分析）
          </label>
          <input
            type="url"
            value={productInfo.url}
            onChange={(e) => setProductInfo({ ...productInfo, url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/product"
          />
        </div>

        {/* 商品名稱 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            商品名稱
          </label>
          <input
            type="text"
            value={productInfo.name}
            onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="請輸入商品名稱"
          />
        </div>

        {/* 商品描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            商品描述（選填）
          </label>
          <textarea
            value={productInfo.description}
            onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="簡單描述商品特色..."
          />
        </div>
      </div>

      {/* 生成設定 */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">生成設定</h3>

        {/* 生成數量 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            生成數量
          </label>
          <select
            value={adCount}
            onChange={(e) => setAdCount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n} 組</option>
            ))}
          </select>
        </div>

        {/* 文案長度 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            文案長度
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setCopyLength(FBCopyLength.SHORT)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                copyLength === FBCopyLength.SHORT
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">短文案</div>
              <div className="text-sm text-gray-500">100字以內</div>
            </button>
            <button
              onClick={() => setCopyLength(FBCopyLength.LONG)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                copyLength === FBCopyLength.LONG
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">長文案</div>
              <div className="text-sm text-gray-500">200字以內</div>
            </button>
          </div>
        </div>
      </div>

      {/* 生成按鈕 */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading || (!productInfo.name && !productInfo.url)}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-3 text-lg font-medium shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Wand2 size={24} />
              開始生成廣告
            </>
          )}
        </button>
      </div>

      {/* 生成結果 */}
      {ads.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              生成結果（{ads.length} 組）
            </h3>
            <button
              onClick={handleCopyAll}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Copy size={18} />
              複製全部
            </button>
          </div>

          {ads.map((ad, index) => (
            <div
              key={ad.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="p-6">
                {/* 標題列 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Facebook className="text-blue-600" size={24} />
                    <span className="font-semibold text-gray-800">廣告 #{index + 1}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(ad)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1 text-sm"
                  >
                    <Copy size={14} />
                    複製
                  </button>
                </div>

                {/* 標題 */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">標題（40字以內）</div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-gray-900">{ad.headline}</div>
                    <div className="text-xs text-gray-400 mt-1">{ad.headline.length} / 40 字</div>
                  </div>
                </div>

                {/* 文案 */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    文案（{copyLength === FBCopyLength.SHORT ? '100' : '200'}字以內）
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-gray-800 whitespace-pre-wrap">{ad.primaryText}</div>
                    <div className="text-xs text-gray-400 mt-2">{ad.primaryText.length} 字</div>
                  </div>
                </div>

                {/* 說明 */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">說明（30字以內）</div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-gray-700">{ad.description}</div>
                    <div className="text-xs text-gray-400 mt-1">{ad.description.length} / 30 字</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}