"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight } from "lucide-react"

function ConcernsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const gender = searchParams.get("gender") || "other"
  const area = searchParams.get("area") || ""

  const [skinType, setSkinType] = useState<string>("")
  const [concerns, setConcerns] = useState<string[]>([])

  const skinTypes = [
    { id: "dry", label: "乾燥肌", description: "カサつきやすい" },
    { id: "oily", label: "脂性肌", description: "テカリやすい" },
    { id: "combination", label: "混合肌", description: "部分的に乾燥・脂性" },
    { id: "sensitive", label: "敏感肌", description: "刺激を受けやすい" },
    { id: "normal", label: "普通肌", description: "バランスが良い" },
  ]

  const concernOptions = [
    { id: "acne", label: "ニキビ・吹き出物" },
    { id: "pores", label: "毛穴の開き・黒ずみ" },
    { id: "wrinkles", label: "シワ・たるみ" },
    { id: "dark-spots", label: "シミ・くすみ" },
    { id: "dryness", label: "乾燥・カサつき" },
    { id: "redness", label: "赤み・炎症" },
    { id: "dullness", label: "肌のくすみ" },
    { id: "texture", label: "肌のざらつき" },
  ]

  const handleConcernToggle = (concernId: string) => {
    setConcerns((prev) => (prev.includes(concernId) ? prev.filter((id) => id !== concernId) : [...prev, concernId]))
  }

  const handleContinue = () => {
    if (skinType && concerns.length > 0) {
      const params = new URLSearchParams({
        gender,
        area,
        skinType,
        concerns: concerns.join(","),
      })
      router.push(`/diagnosis/results?${params.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/diagnosis/body-area?gender=${gender}`} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Link>
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>ステップ 3 / 4</span>
            <span>肌悩み診断</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-3/4 bg-primary transition-all duration-300" />
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              肌質と悩みを教えてください
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">あなたに最適な製品を提案するための情報です</p>
          </div>

          {/* Skin Type Selection */}
          <Card className="mb-8 p-6">
            <h2 className="mb-6 text-2xl font-semibold text-card-foreground">肌質を選択</h2>
            <RadioGroup value={skinType} onValueChange={setSkinType}>
              <div className="space-y-3">
                {skinTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center space-x-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-card-foreground">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </Card>

          {/* Concerns Selection */}
          <Card className="mb-8 p-6">
            <h2 className="mb-6 text-2xl font-semibold text-card-foreground">肌の悩みを選択（複数選択可）</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {concernOptions.map((concern) => (
                <div
                  key={concern.id}
                  className="flex items-center space-x-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    id={concern.id}
                    checked={concerns.includes(concern.id)}
                    onCheckedChange={() => handleConcernToggle(concern.id)}
                  />
                  <Label htmlFor={concern.id} className="flex-1 cursor-pointer font-medium text-card-foreground">
                    {concern.label}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Summary */}
          {(skinType || concerns.length > 0) && (
            <Card className="mb-8 bg-muted/50 p-6">
              <h3 className="mb-3 font-semibold text-card-foreground">選択内容</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                {skinType && (
                  <p>
                    肌質:{" "}
                    <span className="font-medium text-foreground">
                      {skinTypes.find((t) => t.id === skinType)?.label}
                    </span>
                  </p>
                )}
                {concerns.length > 0 && (
                  <p>
                    悩み: <span className="font-medium text-foreground">{concerns.length}件選択中</span>
                  </p>
                )}
              </div>
            </Card>
          )}

          <div className="flex justify-center">
            <Button size="lg" onClick={handleContinue} disabled={!skinType || concerns.length === 0} className="gap-2">
              診断結果を見る
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConcernsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConcernsContent />
    </Suspense>
  )
}
