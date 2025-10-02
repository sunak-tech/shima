import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>あなたの肌に最適なケアを</span>
            </div>

            <h1 className="mb-6 text-balance font-sans text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
              パーソナライズされた
              <br />
              <span className="text-primary">スキンケア診断</span>
            </h1>

            <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
              あなたの肌の悩みに合わせて、最適なスキンケア商品を提案します。
              <br />
              簡単な診断で、理想の肌へ導く製品が見つかります。
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/diagnosis">診断を始める</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <Link href="#features">詳しく見る</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">3つの特徴</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              科学的根拠に基づいた診断で、あなたに最適な製品を見つけます
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">パーソナライズ診断</h3>
              <p className="text-pretty text-muted-foreground">
                あなたの肌質、悩み、ライフスタイルに合わせて、最適な製品を提案します。
              </p>
            </div>

            <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">成分ベースのマッチング</h3>
              <p className="text-pretty text-muted-foreground">
                肌の悩みに有効な成分を分析し、科学的根拠に基づいた製品を推薦します。
              </p>
            </div>

            <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/30 text-secondary-foreground">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">簡単3ステップ</h3>
              <p className="text-pretty text-muted-foreground">
                性別選択、部位選択、悩み診断の3ステップで、すぐに結果が分かります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">診断の流れ</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              簡単なステップで、あなたに最適な製品が見つかります
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">性別を選択</h3>
                  <p className="text-pretty text-muted-foreground">
                    男性・女性・その他から選択して、性別に応じた製品を提案します。
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">気になる部位を選択</h3>
                  <p className="text-pretty text-muted-foreground">
                    人体模型から、スキンケアで悩んでいる部位を選択します。
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">具体的な悩みを診断</h3>
                  <p className="text-pretty text-muted-foreground">
                    ニキビ、乾燥、シミなど、具体的な肌の悩みを選択します。
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">最適な製品を提案</h3>
                  <p className="text-pretty text-muted-foreground">
                    あなたの悩みに有効な成分を含む製品を提案。価格帯やブランドで絞り込みも可能です。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/diagnosis">今すぐ診断を始める</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              あなたの肌に最適なケアを
              <br />
              今すぐ見つけましょう
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              無料で診断を始めて、理想の肌への第一歩を踏み出しましょう
            </p>
            <Button asChild size="lg" className="text-lg">
              <Link href="/diagnosis">無料で診断を始める</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 スキンケア診断. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
