"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCard } from "@/components/product-card"
import { matchProducts, filterProducts, sampleProducts } from "@/lib/product-matcher"
import { ArrowLeft, Filter, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

function ResultsContent() {
  const searchParams = useSearchParams()
  const concerns = searchParams.get("concerns")?.split(",") || []
  const skinType = searchParams.get("skinType") || ""
  const area = searchParams.get("area") || ""

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number>(0)

  const allBrands = Array.from(new Set(sampleProducts.map((p) => p.brand)))
  const allCategories = Array.from(new Set(sampleProducts.map((p) => p.category)))

  const matchedProducts = useMemo(() => {
    const matched = matchProducts(concerns, skinType)
    return filterProducts(matched, {
      priceRange,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      minRating: minRating > 0 ? minRating : undefined,
    })
  }, [concerns, skinType, priceRange, selectedBrands, selectedCategories, minRating])

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const resetFilters = () => {
    setPriceRange([0, 10000])
    setSelectedBrands([])
    setSelectedCategories([])
    setMinRating(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              トップに戻る
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                フィルター
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>フィルター設定</SheetTitle>
                <SheetDescription>条件を指定して製品を絞り込みます</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Price Range */}
                <div>
                  <Label className="mb-3 block">
                    価格帯: ¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    min={0}
                    max={10000}
                    step={500}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-2"
                  />
                </div>

                {/* Brands */}
                <div>
                  <Label className="mb-3 block">ブランド</Label>
                  <div className="space-y-2">
                    {allBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="cursor-pointer text-sm">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <Label className="mb-3 block">カテゴリー</Label>
                  <div className="space-y-2">
                    {allCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <Label htmlFor={`category-${category}`} className="cursor-pointer text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <Label className="mb-3 block">最低評価: {minRating > 0 ? `${minRating}+` : "指定なし"}</Label>
                  <Slider
                    min={0}
                    max={5}
                    step={0.5}
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                  />
                </div>

                <Button onClick={resetFilters} variant="outline" className="w-full bg-transparent">
                  フィルターをリセット
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Progress Indicator */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>ステップ 4 / 4</span>
            <span>診断結果</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-full bg-primary transition-all duration-300" />
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>診断完了</span>
          </div>
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">あなたにおすすめの製品</h1>
          <p className="text-pretty text-lg text-muted-foreground">{matchedProducts.length}件の製品が見つかりました</p>
        </div>

        {/* Diagnosis Summary */}
        <Card className="mx-auto mb-12 max-w-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-6">
          <h2 className="mb-4 text-xl font-semibold text-card-foreground">診断結果サマリー</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">肌質</p>
              <p className="font-medium text-card-foreground">{getSkinTypeLabel(skinType)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">気になる部位</p>
              <p className="font-medium text-card-foreground">{getAreaLabel(area)}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm text-muted-foreground">選択した悩み</p>
              <div className="flex flex-wrap gap-2">
                {concerns.map((concern) => (
                  <span key={concern} className="rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent">
                    {getConcernLabel(concern)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {matchedProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">条件に一致する製品が見つかりませんでした。</p>
            <Button onClick={resetFilters} variant="outline" className="mt-4 bg-transparent">
              フィルターをリセット
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/">新しい診断を始める</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function getSkinTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    dry: "乾燥肌",
    oily: "脂性肌",
    combination: "混合肌",
    sensitive: "敏感肌",
    normal: "普通肌",
  }
  return labels[type] || type
}

function getAreaLabel(area: string): string {
  const labels: Record<string, string> = {
    forehead: "おでこ",
    eyes: "目元",
    nose: "鼻",
    cheeks: "頬",
    mouth: "口元",
    chin: "あご",
    neck: "首",
    hands: "手",
    body: "体",
  }
  return labels[area] || area
}

function getConcernLabel(concern: string): string {
  const labels: Record<string, string> = {
    acne: "ニキビ・吹き出物",
    pores: "毛穴の開き・黒ずみ",
    wrinkles: "シワ・たるみ",
    "dark-spots": "シミ・くすみ",
    dryness: "乾燥・カサつき",
    redness: "赤み・炎症",
    dullness: "肌のくすみ",
    texture: "肌のざらつき",
  }
  return labels[concern] || concern
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  )
}
