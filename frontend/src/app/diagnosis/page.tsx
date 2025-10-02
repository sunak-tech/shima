import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, User, Users } from "lucide-react"

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              トップに戻る
            </Link>
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>ステップ 1 / 4</span>
            <span>性別選択</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/4 bg-primary transition-all duration-300" />
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">性別を選択してください</h1>
          <p className="mb-12 text-pretty text-lg text-muted-foreground">
            性別に応じて、最適なスキンケア製品を提案します
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Female Option */}
            <Link href="/diagnosis/body-area?gender=female" className="group">
              <Card className="relative overflow-hidden border-2 border-border bg-card p-8 transition-all hover:border-accent hover:shadow-xl">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 transition-all group-hover:scale-110 group-hover:bg-accent/30">
                    <User className="h-12 w-12 text-accent" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-card-foreground">女性</h3>
                <p className="text-sm text-muted-foreground">女性向けの製品を提案</p>
              </Card>
            </Link>

            {/* Male Option */}
            <Link href="/diagnosis/body-area?gender=male" className="group">
              <Card className="relative overflow-hidden border-2 border-border bg-card p-8 transition-all hover:border-primary hover:shadow-xl">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/30">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-card-foreground">男性</h3>
                <p className="text-sm text-muted-foreground">男性向けの製品を提案</p>
              </Card>
            </Link>

            {/* Other Option */}
            <Link href="/diagnosis/body-area?gender=other" className="group">
              <Card className="relative overflow-hidden border-2 border-border bg-card p-8 transition-all hover:border-secondary hover:shadow-xl">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary/30 transition-all group-hover:scale-110 group-hover:bg-secondary/40">
                    <Users className="h-12 w-12 text-secondary-foreground" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-semibold text-card-foreground">その他</h3>
                <p className="text-sm text-muted-foreground">すべての製品を提案</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
