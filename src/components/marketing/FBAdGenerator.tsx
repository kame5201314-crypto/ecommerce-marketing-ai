import { useState } from 'react';
import { Facebook, Loader2, Wand2, Copy } from 'lucide-react';
import { ProductInfo } from '../../types/marketing';
import { CopywritingService } from '../../services/aiMarketingService';

// FB 廣告文案長度
enum FBCopyLength {
  SHORT = 'short',   // 200字以內
  MEDIUM = 'medium', // 300字以內
  LONG = 'long'      // 500字以內
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
  const [customFooter, setCustomFooter] = useState('');
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
      const generated = generateFBAds(finalProductInfo, adCount, copyLength, customFooter);
      setAds(generated);
    } catch (error) {
      alert('廣告生成失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 生成 FB 廣告文案
  const generateFBAds = (product: ProductInfo, count: number, length: FBCopyLength, footer: string): FBAdCopy[] => {
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

    // 短文案模板 (200字以內)
    const shortTexts = [
      `🔥 ${product.name}限時特惠中！\n\n✨ 優質材料，品質保證\n📦 台灣現貨，快速出貨\n🛡️ 七天鑑賞期，購物無風險\n\n【產品亮點】\n• 嚴選材料，耐用持久\n• 專業品質，值得信賴\n• 售後服務完善\n\n立即購買，享專屬優惠！\n數量有限，售完為止！`,
      `💝 精選${product.name}\n\n為什麼選擇我們？\n✓ 高品質保證\n✓ 超值優惠價\n✓ 快速到貨\n✓ 專業客服服務\n\n【限時優惠】\n🎁 現在下單享折扣\n🚚 滿額免運費\n\n數量有限，要買要快！`,
      `🌟 熱銷${product.name}！\n\n眾多顧客好評推薦\n品質保證，售後無憂\n\n【購買保障】\n✓ 台灣現貨\n✓ 24小時出貨\n✓ 七天鑑賞期\n✓ 退換貨無憂\n\n現在下單享限時折扣！`,
      `✨ ${product.name}超值優惠\n\n🎁 買就送好禮\n🚚 滿額免運\n💯 品質保證\n🔄 七天退換\n\n【為什麼選我們】\n專業團隊精心挑選\n品質把關，值得信賴\n\n把握機會，立即搶購！`,
      `🎯 必買${product.name}\n\n專業品質，值得信賴\n台灣現貨，隔日到貨\n\n【獨家優勢】\n• 優質材料\n• 精緻工藝\n• 完善售後\n• 超值價格\n\n限時優惠中！立即搶購！`
    ];

    // 中文案模板 (300字以內)
    const mediumTexts = [
      `🔥 ${product.name}限時特惠！\n\n【為什麼選擇我們？】\n✓ 嚴選優質材料，品質有保障\n✓ 專業設計，滿足各種需求\n✓ 台灣在地倉儲，快速出貨\n✓ 眾多顧客好評推薦\n\n【購物保障】\n📦 24小時內出貨\n🔄 七天鑑賞期，不滿意可退\n🛡️ 一年保固服務\n💬 專業客服即時回覆\n\n【產品特色】\n這款${product.name}經過嚴格品質把關，採用優質材料製作，耐用持久。無論是送禮還是自用都非常適合！\n\n⏰ 限時優惠中，數量有限！\n立即下單，把握機會！`,
      `💝 ${product.name} - 熱銷推薦\n\n這款${product.name}是我們精心挑選的優質商品！\n\n【產品特色】\n• 採用優質材料，耐用持久\n• 時尚設計，美觀實用\n• 操作簡單，輕鬆上手\n• 適合各種場合使用\n\n【專屬優惠】\n🎁 現在下單送精美好禮\n🚚 滿額享免運優惠\n💰 會員再享額外折扣\n🔄 七天鑑賞，退換無憂\n\n【顧客好評】\n「品質很好，物超所值！」\n「出貨快，客服親切」\n\n數量有限，手刀搶購！`,
      `🌟 萬人推薦！${product.name}\n\n累積超過千位滿意顧客好評！\n\n【顧客評價】\n⭐⭐⭐⭐⭐「品質超好，大推！」\n⭐⭐⭐⭐⭐「出貨快，客服親切」\n⭐⭐⭐⭐⭐「CP值超高！」\n⭐⭐⭐⭐⭐「回購多次了！」\n\n【產品介紹】\n${product.name}採用優質材料，經過嚴格品質檢驗，確保每一件商品都達到最高標準。\n\n【購買保障】\n✓ 品質保證\n✓ 快速出貨\n✓ 售後服務完善\n✓ 七天無理由退換\n\n限時優惠進行中，立即購買！`,
      `✨ ${product.name} 超值組合\n\n【產品介紹】\n${product.name}是您生活中的好幫手！採用優質材料製作，經過嚴格品質把關，為您帶來最佳使用體驗。\n\n【五大優勢】\n1️⃣ 優質材料 - 嚴選用料\n2️⃣ 精緻做工 - 細節到位\n3️⃣ 時尚外觀 - 質感滿分\n4️⃣ 實用便利 - 輕鬆使用\n5️⃣ 超值價格 - 物超所值\n\n【購物保障】\n✓ 台灣現貨\n✓ 快速出貨\n✓ 完善售後\n\n🎉 現在購買即享專屬折扣！\n📦 台灣現貨，快速到貨！`,
      `🎯 ${product.name} 獨家優惠\n\n【限時活動】\n原價直接砍！超殺優惠價\n買越多省越多！\n\n【商品特色】\n✓ 高品質保證 - 嚴格把關\n✓ 專業設計 - 實用美觀\n✓ 耐用持久 - 物超所值\n✓ 美觀時尚 - 送禮自用兩相宜\n\n【產品說明】\n這款${product.name}深受顧客喜愛，品質優良，性價比超高！\n\n【服務保障】\n📦 快速出貨\n🔄 七天鑑賞\n🛡️ 售後無憂\n💬 專人客服\n\n⏰ 優惠倒數中，把握機會！`
    ];

    // 長文案模板 (500字以內)
    const longTexts = [
      `🔥 ${product.name}限時特惠！年度最強優惠來襲！\n\n【為什麼選擇我們？】\n✓ 嚴選優質材料，品質有保障，讓您買得安心用得放心\n✓ 專業設計團隊，滿足各種使用需求\n✓ 台灣在地倉儲，快速出貨不用等\n✓ 累積萬人購買，好評如潮\n\n【產品詳細介紹】\n${product.name}是我們精心打造的優質商品。採用頂級材料製作，經過多道工序嚴格把關，確保每一件商品都達到最高品質標準。\n\n無論您是自用還是送禮，這款${product.name}都是絕佳選擇。精緻的外觀設計，搭配優質的材料，為您帶來極致的使用體驗。\n\n【購物保障】\n📦 24小時內出貨 - 不讓您久等\n🔄 七天鑑賞期 - 不滿意可退\n🛡️ 一年保固服務 - 品質有保障\n💬 專業客服 - 即時回覆您的問題\n🚚 滿額免運 - 省更多\n\n【顧客真實評價】\n⭐⭐⭐⭐⭐「買了好幾次了，品質一直很穩定！」\n⭐⭐⭐⭐⭐「客服很親切，有問題都能快速解決」\n⭐⭐⭐⭐⭐「朋友推薦的，果然沒讓我失望」\n\n⏰ 限時優惠中，數量有限！錯過這次不知道要等多久！\n立即下單，把握機會！`,
      `💝 ${product.name} - 熱銷推薦｜萬人好評首選\n\n這款${product.name}是我們精心挑選的優質商品，上市以來深受顧客喜愛！\n\n【產品特色】\n• 採用優質材料，耐用持久，經得起時間考驗\n• 時尚設計，美觀實用，送禮自用兩相宜\n• 操作簡單，輕鬆上手，老少皆宜\n• 多種款式可選，滿足不同需求\n\n【品質保證】\n我們堅持使用優質材料，每件商品都經過嚴格的品質檢測。從原料篩選到成品出貨，層層把關，只為給您最好的產品體驗。\n\n【專屬優惠】\n🎁 現在下單送精美好禮 - 超值加碼\n🚚 滿額享免運優惠 - 省運費\n💰 會員再享額外折扣 - 省更多\n🔄 七天鑑賞，退換無憂 - 購物零風險\n\n【真實顧客回饋】\n「用了好幾個月，品質依然如新！」\n「送給朋友當禮物，大家都很喜歡」\n「價格實惠，品質卻一點都不馬虎」\n\n數量有限，手刀搶購！這個價格真的太划算了！`,
      `🌟 萬人推薦！${product.name}｜口碑熱銷第一名\n\n累積超過千位滿意顧客好評！銷售數字持續攀升中！\n\n【顧客真實評價】\n⭐⭐⭐⭐⭐「品質超好，大推！完全物超所值」\n⭐⭐⭐⭐⭐「出貨快，客服親切，購物體驗很棒」\n⭐⭐⭐⭐⭐「CP值超高！已經回購三次了」\n⭐⭐⭐⭐⭐「朋友都問我在哪買的，已推薦好幾個人」\n\n【產品詳細介紹】\n${product.name}採用優質材料，經過嚴格品質檢驗，確保每一件商品都達到最高標準。\n\n我們的產品不只追求外觀，更注重實用性。從設計到生產，每個環節都經過反覆測試與改良，只為帶給您最佳的使用體驗。\n\n【六大購買理由】\n1️⃣ 優質材料 - 嚴選用料，品質保證\n2️⃣ 專業設計 - 美觀實用兼具\n3️⃣ 快速出貨 - 台灣現貨，隔日到貨\n4️⃣ 完善售後 - 七天鑑賞，退換無憂\n5️⃣ 超值價格 - 同品質最優惠\n6️⃣ 好評如潮 - 萬人見證推薦\n\n限時優惠進行中，立即購買！別讓好康溜走！`,
      `✨ ${product.name} 超值組合｜年度必買清單\n\n【產品介紹】\n${product.name}是您生活中的好幫手！採用優質材料製作，經過嚴格品質把關，為您帶來最佳使用體驗。\n\n這款商品自上市以來，就受到廣大消費者的喜愛。無論是品質、設計還是價格，都是市場上的佼佼者。\n\n【五大優勢詳解】\n1️⃣ 優質材料 - 嚴選頂級原料，確保耐用性\n2️⃣ 精緻做工 - 匠心工藝，細節決定品質\n3️⃣ 時尚外觀 - 設計感滿分，質感升級\n4️⃣ 實用便利 - 人性化設計，使用更順手\n5️⃣ 超值價格 - 直營販售，省去中間商\n\n【購物保障】\n✓ 台灣現貨 - 庫存充足\n✓ 快速出貨 - 24小時內發貨\n✓ 完善售後 - 專人處理問題\n✓ 七天鑑賞 - 不滿意全額退\n\n【好評見證】\n「用過最好用的產品，已推薦給所有朋友！」\n「品質真的很棒，而且價格很實在」\n\n🎉 現在購買即享專屬折扣！機會難得！\n📦 台灣現貨，快速到貨！`,
      `🎯 ${product.name} 獨家優惠｜限時限量搶購中\n\n【限時活動】\n🔥 原價直接砍！超殺優惠價\n🔥 買越多省越多！組合價更優惠\n🔥 限量供應，售完就沒了！\n\n【商品特色詳解】\n✓ 高品質保證 - 每件商品都經過嚴格QC檢驗\n✓ 專業設計 - 結合美觀與實用的完美設計\n✓ 耐用持久 - 優質材料，使用壽命長\n✓ 美觀時尚 - 質感外觀，送禮超有面子\n\n【產品詳細說明】\n這款${product.name}是我們的明星商品，深受顧客喜愛。品質優良，性價比超高！\n\n從原料採購到成品出貨，我們嚴格把控每一個環節，確保您收到的每一件商品都是完美的。這就是我們對品質的堅持，也是顧客持續回購的原因。\n\n【完整服務保障】\n📦 快速出貨 - 下單後24小時內出貨\n🔄 七天鑑賞 - 不喜歡可以退\n🛡️ 售後無憂 - 一年保固服務\n💬 專人客服 - 問題即時解答\n🚚 滿額免運 - 省下運費更划算\n\n⏰ 優惠倒數中，把握機會！這次錯過，下次不知道什麼時候了！`
    ];

    let texts;
    if (length === FBCopyLength.SHORT) {
      texts = shortTexts;
    } else if (length === FBCopyLength.MEDIUM) {
      texts = mediumTexts;
    } else {
      texts = longTexts;
    }

    for (let i = 0; i < count; i++) {
      const baseText = texts[i % texts.length];
      const finalText = footer ? `${baseText}\n\n${footer}` : baseText;

      ads.push({
        id: `fb_ad_${Date.now()}_${i}`,
        headline: headlines[i % headlines.length].substring(0, 40),
        primaryText: finalText,
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
              <div className="text-sm text-gray-500">200字以內</div>
            </button>
            <button
              onClick={() => setCopyLength(FBCopyLength.MEDIUM)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                copyLength === FBCopyLength.MEDIUM
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">中文案</div>
              <div className="text-sm text-gray-500">300字以內</div>
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
              <div className="text-sm text-gray-500">500字以內</div>
            </button>
          </div>
        </div>

        {/* 固定文案 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            固定文案（選填）
          </label>
          <textarea
            value={customFooter}
            onChange={(e) => setCustomFooter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="輸入固定文案，會自動加在所有廣告文案的最下方...&#10;例如：&#10;🔥 立即私訊下單&#10;📞 Line: @yourshop&#10;📍 蝦皮賣場：https://..."
          />
          {customFooter && (
            <p className="text-xs text-gray-500 mt-1">
              此文案會自動加入所有生成的廣告文案末尾
            </p>
          )}
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
                    文案（{copyLength === FBCopyLength.SHORT ? '200' : copyLength === FBCopyLength.MEDIUM ? '300' : '500'}字以內）
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