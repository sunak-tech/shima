export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  ingredients: string[]
  description: string
  rating: number
  category: string
  targetConcerns: string[]
  matchScore?: number
}

// 悩みに有効な成分のマッピング
const concernIngredients: Record<string, string[]> = {
  acne: ["サリチル酸", "ナイアシンアミド", "ティーツリーオイル", "ベンゾイルペルオキシド"],
  pores: ["ナイアシンアミド", "レチノール", "AHA", "BHA"],
  wrinkles: ["レチノール", "ペプチド", "ビタミンC", "ヒアルロン酸"],
  "dark-spots": ["ビタミンC", "ナイアシンアミド", "アルブチン", "トラネキサム酸"],
  dryness: ["ヒアルロン酸", "セラミド", "グリセリン", "スクワラン"],
  redness: ["センテラアジアティカ", "ナイアシンアミド", "アロエベラ", "グリーンティー"],
  dullness: ["ビタミンC", "AHA", "ナイアシンアミド", "酵素"],
  texture: ["AHA", "BHA", "レチノール", "酵素"],
}

// サンプル商品データ
export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "ハイドレーティング セラム",
    brand: "スキンケアラボ",
    price: 3500,
    image: "/hydrating-serum-bottle.jpg",
    ingredients: ["ヒアルロン酸", "セラミド", "ナイアシンアミド"],
    description: "乾燥肌に潤いを与える高保湿美容液",
    rating: 4.5,
    category: "美容液",
    targetConcerns: ["dryness", "dullness"],
  },
  {
    id: "2",
    name: "ビタミンC ブライトニング クリーム",
    brand: "グローラディアンス",
    price: 4200,
    image: "/vitamin-c-cream-jar.jpg",
    ingredients: ["ビタミンC", "ナイアシンアミド", "アルブチン"],
    description: "シミ・くすみをケアする美白クリーム",
    rating: 4.7,
    category: "クリーム",
    targetConcerns: ["dark-spots", "dullness"],
  },
  {
    id: "3",
    name: "アクネケア トリートメント",
    brand: "クリアスキン",
    price: 2800,
    image: "/acne-treatment-tube.jpg",
    ingredients: ["サリチル酸", "ティーツリーオイル", "ナイアシンアミド"],
    description: "ニキビ・吹き出物を集中ケア",
    rating: 4.3,
    category: "トリートメント",
    targetConcerns: ["acne", "pores"],
  },
  {
    id: "4",
    name: "レチノール リニューアル セラム",
    brand: "エイジレス",
    price: 5500,
    image: "/retinol-serum-bottle.jpg",
    ingredients: ["レチノール", "ペプチド", "ヒアルロン酸"],
    description: "シワ・たるみをケアするエイジングケア美容液",
    rating: 4.8,
    category: "美容液",
    targetConcerns: ["wrinkles", "texture"],
  },
  {
    id: "5",
    name: "センシティブ スージング ジェル",
    brand: "カームスキン",
    price: 3200,
    image: "/soothing-gel-jar.jpg",
    ingredients: ["センテラアジアティカ", "アロエベラ", "グリーンティー"],
    description: "敏感肌の赤み・炎症を鎮静",
    rating: 4.6,
    category: "ジェル",
    targetConcerns: ["redness", "sensitive"],
  },
  {
    id: "6",
    name: "ポアリファイニング トナー",
    brand: "ピュアポア",
    price: 2500,
    image: "/toner-bottle.jpg",
    ingredients: ["BHA", "ナイアシンアミド", "AHA"],
    description: "毛穴の開き・黒ずみをケアする化粧水",
    rating: 4.4,
    category: "化粧水",
    targetConcerns: ["pores", "texture"],
  },
  {
    id: "7",
    name: "ディープモイスチャー クリーム",
    brand: "ハイドラプラス",
    price: 4800,
    image: "/moisturizer-cream-jar.jpg",
    ingredients: ["セラミド", "スクワラン", "グリセリン"],
    description: "極度の乾燥肌に深い潤いを",
    rating: 4.9,
    category: "クリーム",
    targetConcerns: ["dryness"],
  },
  {
    id: "8",
    name: "エクスフォリエーティング マスク",
    brand: "グローブースト",
    price: 3800,
    image: "/exfoliating-mask-tube.jpg",
    ingredients: ["AHA", "酵素", "ビタミンC"],
    description: "肌のざらつき・くすみを除去するピーリングマスク",
    rating: 4.5,
    category: "マスク",
    targetConcerns: ["texture", "dullness"],
  },
]

// マッチングスコアを計算
export function calculateMatchScore(product: Product, userConcerns: string[]): number {
  let score = 0

  // 悩みとの一致度
  const matchingConcerns = product.targetConcerns.filter((concern) => userConcerns.includes(concern))
  score += matchingConcerns.length * 30

  // 有効成分の一致度
  userConcerns.forEach((concern) => {
    const effectiveIngredients = concernIngredients[concern] || []
    const matchingIngredients = product.ingredients.filter((ing) => effectiveIngredients.includes(ing))
    score += matchingIngredients.length * 20
  })

  // 評価による加点
  score += product.rating * 5

  return Math.min(score, 100)
}

// 商品をマッチングしてソート
export function matchProducts(concerns: string[], skinType: string): Product[] {
  return sampleProducts
    .map((product) => ({
      ...product,
      matchScore: calculateMatchScore(product, concerns),
    }))
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
}

// フィルタリング
export function filterProducts(
  products: Product[],
  filters: {
    priceRange?: [number, number]
    brands?: string[]
    categories?: string[]
    minRating?: number
  },
): Product[] {
  return products.filter((product) => {
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      if (product.price < min || product.price > max) return false
    }

    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(product.brand)) return false
    }

    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(product.category)) return false
    }

    if (filters.minRating) {
      if (product.rating < filters.minRating) return false
    }

    return true
  })
}
