import { useState } from 'react';
import { Copy, Download, Wand2, Loader2 } from 'lucide-react';
import {
  ProductInfo,
  CopywritingType,
  CopyLength,
  TitleLength,
  GeneratedCopy
} from '../../types/marketing';
import { CopywritingService } from '../../services/aiMarketingService';

export default function CopywritingGenerator() {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: '',
    url: '',
    description: ''
  });

  // 生成選項
  const [introCount, setIntroCount] = useState(3);
  const [introLength, setIntroLength] = useState<CopyLength>(CopyLength.MEDIUM);
  const [titleCount, setTitleCount] = useState(3);
  const [titleLength, setTitleLength] = useState<TitleLength>(TitleLength.LONG);
  const [generateSpec, setGenerateSpec] = useState(true);
  const [keywordCount, setKeywordCount] = useState(10);

  const [generatedCopies, setGeneratedCopies] = useState<GeneratedCopy[]>([]);
  const [allKeywords, setAllKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 生成文案
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

      // 生成所有文案
      const copies = await CopywritingService.generateAllCopies(finalProductInfo, {
        introCount,
        introLength,
        titleCount,
        titleLength,
        generateSpec,
        keywordCount
      });

      setGeneratedCopies(copies.copies);
      setAllKeywords(copies.keywords);
    } catch (error) {
      alert('文案生成失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 複製單一文案
  const handleCopy = (copy: GeneratedCopy) => {
    const text = `${copy.title}\n\n${copy.content}`;
    navigator.clipboard.writeText(text);
    alert('已複製到剪貼簿！');
  };

  // 複製所有關鍵字
  const handleCopyKeywords = () => {
    navigator.clipboard.writeText(allKeywords.join(', '));
    alert('關鍵字已複製到剪貼簿！');
  };

  // 匯出全部內容
  const handleExportAll = () => {
    const introResults = generatedCopies.filter(c => c.type === CopywritingType.PRODUCT_INTRO);
    const titleResults = generatedCopies.filter(c => c.type === CopywritingType.PRODUCT_TITLE);
    const specResult = generatedCopies.find(c => c.type === CopywritingType.PRODUCT_SPEC);

    let content = `商品名稱：${productInfo.name}\n`;
    content += `=`.repeat(50) + '\n\n';

    if (titleResults.length > 0) {
      content += `【商品標題】\n`;
      titleResults.forEach((t, i) => {
        content += `${i + 1}. ${t.title}\n`;
      });
      content += '\n';
    }

    if (introResults.length > 0) {
      content += `【商品介紹＋賣點】\n`;
      introResults.forEach((intro, i) => {
        content += `--- 版本 ${i + 1} ---\n`;
        content += `${intro.content}\n\n`;
      });
    }

    if (specResult) {
      content += `【商品規格】\n`;
      content += `${specResult.content}\n\n`;
    }

    if (allKeywords.length > 0) {
      content += `【關鍵字】\n`;
      content += allKeywords.join(', ') + '\n';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `product_copy_${Date.now()}.txt`;
    link.click();
  };

  // 長度選項標籤
  const lengthLabels: Record<CopyLength, string> = {
    [CopyLength.SHORT]: '短 (100字)',
    [CopyLength.MEDIUM]: '中 (200字)',
    [CopyLength.LONG]: '長 (300字)'
  };

  const titleLengthLabels: Record<TitleLength, string> = {
    [TitleLength.LONG]: '長標題 (60字)',
    [TitleLength.SHORT]: '短標題 (30字)'
  };

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">AI 商品文案自動生成</h2>
        <p className="text-gray-600 mt-1">
          輸入商品資訊，AI 自動生成商品介紹、標題與規格
        </p>
      </div>

      {/* 商品資訊輸入 */}
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
            rows={3}
            placeholder="簡單描述商品特色..."
          />
        </div>
      </div>

      {/* 生成設定 */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">生成設定</h3>

        {/* 商品介紹設定 */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">商品介紹＋賣點</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">產出數量</label>
              <select
                value={introCount}
                onChange={(e) => setIntroCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n} 篇</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">文案長度</label>
              <div className="flex gap-2">
                {Object.values(CopyLength).map(len => (
                  <button
                    key={len}
                    onClick={() => setIntroLength(len)}
                    className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                      introLength === len
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {lengthLabels[len]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 商品標題設定 */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">商品標題</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">產出數量</label>
              <select
                value={titleCount}
                onChange={(e) => setTitleCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n} 個</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">標題長度</label>
              <div className="flex gap-2">
                {Object.values(TitleLength).map(len => (
                  <button
                    key={len}
                    onClick={() => setTitleLength(len)}
                    className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                      titleLength === len
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {titleLengthLabels[len]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 商品規格 */}
        <div className="border-b pb-4">
          <h4 className="font-medium text-gray-700 mb-3">商品規格</h4>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={generateSpec}
              onChange={(e) => setGenerateSpec(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span className="text-gray-700">產出商品規格</span>
          </label>
        </div>

        {/* 關鍵字設定 */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">關鍵字</h4>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">產出數量：</label>
            <input
              type="range"
              min="5"
              max="20"
              value={keywordCount}
              onChange={(e) => setKeywordCount(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-blue-600 font-medium w-16">{keywordCount} 個</span>
          </div>
        </div>
      </div>

      {/* 生成按鈕 */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading || (!productInfo.name && !productInfo.url)}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-3 text-lg font-medium shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              AI 生成中...
            </>
          ) : (
            <>
              <Wand2 size={24} />
              開始生成文案
            </>
          )}
        </button>
      </div>

      {/* 生成結果 */}
      {generatedCopies.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-xl font-semibold text-gray-800">生成結果</h3>
            <button
              onClick={handleExportAll}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Download size={18} />
              匯出全部
            </button>
          </div>

          {/* 商品標題結果 */}
          {generatedCopies.filter(c => c.type === CopywritingType.PRODUCT_TITLE).length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg">商品標題</h4>
              <div className="space-y-3">
                {generatedCopies
                  .filter(c => c.type === CopywritingType.PRODUCT_TITLE)
                  .map((copy, i) => (
                    <div key={copy.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-600 font-medium">{i + 1}.</span>
                      <span className="flex-1 text-gray-800">{copy.title}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(copy.title);
                          alert('已複製！');
                        }}
                        className="p-2 text-gray-500 hover:text-blue-600"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 商品介紹結果 */}
          {generatedCopies.filter(c => c.type === CopywritingType.PRODUCT_INTRO).length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg">商品介紹＋賣點</h4>
              <div className="space-y-4">
                {generatedCopies
                  .filter(c => c.type === CopywritingType.PRODUCT_INTRO)
                  .map((copy, i) => (
                    <div key={copy.id} className="border-l-4 border-blue-500 p-4 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600 font-medium">版本 {i + 1}</span>
                        <button
                          onClick={() => handleCopy(copy)}
                          className="p-2 text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm"
                        >
                          <Copy size={14} />
                          複製
                        </button>
                      </div>
                      <div className="text-gray-700 whitespace-pre-wrap">{copy.content}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 商品規格結果 */}
          {generatedCopies.filter(c => c.type === CopywritingType.PRODUCT_SPEC).length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg">商品規格</h4>
              {generatedCopies
                .filter(c => c.type === CopywritingType.PRODUCT_SPEC)
                .map(copy => (
                  <div key={copy.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() => handleCopy(copy)}
                        className="p-2 text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm"
                      >
                        <Copy size={14} />
                        複製
                      </button>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap">{copy.content}</div>
                  </div>
                ))}
            </div>
          )}

          {/* 關鍵字區塊 */}
          {allKeywords.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800 text-lg">
                  關鍵字（{allKeywords.length} 個）
                </h4>
                <button
                  onClick={handleCopyKeywords}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1 text-sm"
                >
                  <Copy size={14} />
                  複製全部
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {allKeywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(keyword);
                      alert(`已複製：${keyword}`);
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}