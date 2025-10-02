"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface BodyDiagramProps {
  onAreaSelect: (area: string) => void
  selectedArea?: string
}

export function BodyDiagram({ onAreaSelect, selectedArea }: BodyDiagramProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  const areas = [
    { id: "forehead", label: "おでこ", top: "15%", left: "50%", transform: "translateX(-50%)" },
    { id: "eyes", label: "目元", top: "22%", left: "50%", transform: "translateX(-50%)" },
    { id: "nose", label: "鼻", top: "28%", left: "50%", transform: "translateX(-50%)" },
    { id: "cheeks", label: "頬", top: "32%", left: "50%", transform: "translateX(-50%)" },
    { id: "mouth", label: "口元", top: "38%", left: "50%", transform: "translateX(-50%)" },
    { id: "chin", label: "あご", top: "44%", left: "50%", transform: "translateX(-50%)" },
    { id: "neck", label: "首", top: "52%", left: "50%", transform: "translateX(-50%)" },
    { id: "hands", label: "手", top: "70%", left: "50%", transform: "translateX(-50%)" },
    { id: "body", label: "体", top: "62%", left: "50%", transform: "translateX(-50%)" },
  ]

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
      {/* Body Silhouette SVG */}
      <svg viewBox="0 0 200 300" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <ellipse cx="100" cy="50" rx="35" ry="45" fill="currentColor" className="text-muted" opacity="0.3" />

        {/* Neck */}
        <rect x="85" y="90" width="30" height="20" fill="currentColor" className="text-muted" opacity="0.3" />

        {/* Body */}
        <ellipse cx="100" cy="160" rx="50" ry="70" fill="currentColor" className="text-muted" opacity="0.3" />

        {/* Arms */}
        <ellipse cx="50" cy="140" rx="15" ry="60" fill="currentColor" className="text-muted" opacity="0.3" />
        <ellipse cx="150" cy="140" rx="15" ry="60" fill="currentColor" className="text-muted" opacity="0.3" />

        {/* Hands */}
        <circle cx="50" cy="210" r="12" fill="currentColor" className="text-muted" opacity="0.3" />
        <circle cx="150" cy="210" r="12" fill="currentColor" className="text-muted" opacity="0.3" />

        {/* Legs */}
        <ellipse cx="80" cy="250" rx="18" ry="45" fill="currentColor" className="text-muted" opacity="0.3" />
        <ellipse cx="120" cy="250" rx="18" ry="45" fill="currentColor" className="text-muted" opacity="0.3" />

        {/* Facial Features */}
        {/* Forehead area */}
        <ellipse cx="100" cy="30" rx="28" ry="12" fill="currentColor" className="text-muted" opacity="0.2" />

        {/* Eyes area */}
        <ellipse cx="85" cy="45" rx="8" ry="6" fill="currentColor" className="text-muted" opacity="0.2" />
        <ellipse cx="115" cy="45" rx="8" ry="6" fill="currentColor" className="text-muted" opacity="0.2" />

        {/* Nose area */}
        <ellipse cx="100" cy="55" rx="6" ry="10" fill="currentColor" className="text-muted" opacity="0.2" />

        {/* Cheeks area */}
        <ellipse cx="75" cy="60" rx="12" ry="15" fill="currentColor" className="text-muted" opacity="0.2" />
        <ellipse cx="125" cy="60" rx="12" ry="15" fill="currentColor" className="text-muted" opacity="0.2" />

        {/* Mouth area */}
        <ellipse cx="100" cy="70" rx="15" ry="8" fill="currentColor" className="text-muted" opacity="0.2" />

        {/* Chin area */}
        <ellipse cx="100" cy="82" rx="20" ry="10" fill="currentColor" className="text-muted" opacity="0.2" />
      </svg>

      {/* Interactive Areas */}
      {areas.map((area) => (
        <button
          key={area.id}
          onClick={() => onAreaSelect(area.id)}
          onMouseEnter={() => setHoveredArea(area.id)}
          onMouseLeave={() => setHoveredArea(null)}
          className={cn(
            "absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all",
            selectedArea === area.id
              ? "border-primary bg-primary text-primary-foreground shadow-lg scale-110"
              : hoveredArea === area.id
                ? "border-accent bg-accent/20 text-accent scale-105"
                : "border-border bg-background/80 text-foreground hover:border-accent hover:bg-accent/10",
          )}
          style={{
            top: area.top,
            left: area.left,
            transform: area.transform,
          }}
        >
          <span className="text-xs font-medium text-center leading-tight">{area.label}</span>
        </button>
      ))}
    </div>
  )
}
