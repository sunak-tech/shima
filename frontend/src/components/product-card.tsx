import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Product } from "@/lib/product-matcher"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square bg-muted">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        {product.matchScore && product.matchScore >= 70 && (
          <Badge className="absolute right-2 top-2 bg-primary">{product.matchScore}% マッチ</Badge>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h3 className="font-semibold text-card-foreground">{product.name}</h3>
          </div>
          <p className="shrink-0 text-lg font-bold text-primary">¥{product.price.toLocaleString()}</p>
        </div>

        <div className="mb-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="flex flex-wrap gap-1">
          {product.ingredients.slice(0, 3).map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="text-xs">
              {ingredient}
            </Badge>
          ))}
          {product.ingredients.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{product.ingredients.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
