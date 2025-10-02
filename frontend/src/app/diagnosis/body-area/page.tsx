"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BodyDiagram } from "@/components/body-diagram"
import { ArrowLeft, ArrowRight } from "lucide-react"

function BodyAreaContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const gender = searchParams.get("gender") || "other"
  const [selectedArea, setSelectedArea] = useState<string>("")

  const handleContinue = () => {
    if (selectedArea) {
      router.push(`/diagnosis/concerns?gender=${gender}&area=${selectedArea}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/diagnosis" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Link>
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>ステップ 2 / 4</span>
            <span>部位選択</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/4 bg-primary transition-all duration-300" />
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              気になる部位を選択してください
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">スキンケアで悩んでいる部位をタップしてください</p>
          </div>

          <div className="mb-8">
            <BodyDiagram onAreaSelect={setSelectedArea} selectedArea={selectedArea} />
          </div>

          {selectedArea && (
            <div className="mb-8 text-center">
              <p className="text-lg text-muted-foreground">
                選択中: <span className="font-semibold text-foreground">{getAreaLabel(selectedArea)}</span>
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <Button size="lg" onClick={handleContinue} disabled={!selectedArea} className="gap-2">
              次へ進む
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getAreaLabel(areaId: string): string {
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
  return labels[areaId] || areaId
}

export default function BodyAreaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BodyAreaContent />
    </Suspense>
  )
}
