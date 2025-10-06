import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, metadata } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text content required" }, { status: 400 })
    }

    // In production, this would use ML models to categorize content
    // Based on keywords, context, and document structure

    const categories = ["Engineering", "HR", "Procurement", "Safety", "Legal", "Finance"]
    const keywords = {
      Engineering: ["project", "technical", "infrastructure", "development", "specifications"],
      HR: ["employee", "policy", "training", "recruitment", "performance"],
      Procurement: ["vendor", "purchase", "contract", "supplier", "procurement"],
      Safety: ["safety", "compliance", "risk", "hazard", "incident"],
      Legal: ["legal", "contract", "agreement", "compliance", "regulatory"],
      Finance: ["budget", "cost", "financial", "expense", "revenue"],
    }

    // Simple keyword-based categorization (in production, use ML)
    let bestCategory = "General"
    let maxScore = 0

    for (const [category, categoryKeywords] of Object.entries(keywords)) {
      const score = categoryKeywords.reduce((acc, keyword) => {
        return acc + (text.toLowerCase().includes(keyword) ? 1 : 0)
      }, 0)

      if (score > maxScore) {
        maxScore = score
        bestCategory = category
      }
    }

    const result = {
      category: bestCategory,
      confidence: Math.min(0.95, 0.6 + maxScore * 0.1),
      subcategories: maxScore > 0 ? [bestCategory] : [],
      tags: keywords[bestCategory as keyof typeof keywords]?.slice(0, 3) || [],
      priority: maxScore > 2 ? "high" : maxScore > 1 ? "medium" : "low",
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Categorization error:", error)
    return NextResponse.json({ error: "Categorization failed" }, { status: 500 })
  }
}
