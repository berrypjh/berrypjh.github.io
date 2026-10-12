/** Left-hand summary of one selected project. */
export type CaseSummary = {
  id: string
  /** The display heading, one word per line. */
  title: readonly [string, string]
  statement: readonly [string, string]
  /** Decisions first, technology last. */
  facts: readonly (readonly [label: string, value: string])[]
  /** Public repositories behind the case, each opened as its own link. */
  repositories?: readonly { name: string; href: string }[]
}

/**
 * One gallery slot. Its image is assets/<case id>-<slot id>.png|jpg|jpeg|webp|gif.
 * The first slot of a showcase is the main card (5:3); the rest are sub cards (6:5).
 * Slots run in the order the story needs: what goes in, what the consumer gets, how it is checked.
 */
export type Shot = {
  id: string
  title: string
  meta: string
}

/** A case told through screenshots. */
export type GalleryShowcase = CaseSummary & { kind: 'gallery'; shots: readonly Shot[] }

/** One repository in the ecosystem: its role, its name, and what it holds. Plain text, no logos. */
export type RepositoryNode = {
  role: string
  name: string
  lines: readonly string[]
}

/**
 * Separate repositories and how they relate.
 * The foundation feeds the products; the review sits outside that graph and only checks changes.
 */
export type Ecosystem = {
  foundation: RepositoryNode
  products: readonly RepositoryNode[]
  review: RepositoryNode & {
    flow: readonly string[]
    /** What the review runs on today, per repository; never more than is wired up. */
    coverage: readonly (readonly [repository: string, state: string])[]
  }
}

/** A case told as a set of repositories and their relationships. */
export type EcosystemShowcase = CaseSummary & { kind: 'ecosystem'; ecosystem: Ecosystem }

export type Showcase = GalleryShowcase | EcosystemShowcase

export const SHOWCASES: readonly Showcase[] = [
  {
    kind: 'ecosystem',
    id: 'engineering-ecosystem',
    title: ['Engineering', 'Ecosystem'],
    statement: ['공통 기반을 실제 제품에서 쓰고,', '변경은 독립된 검증 시스템에서 한 번 더 확인합니다'],
    facts: [
      ['Foundation', 'Shared UI · Tokens · Config · Tooling'],
      ['Products', 'Snapdone · IT Tech Blog'],
      ['Review', 'PR 변경 검증 · 승인'],
      ['Next', '접근성 · 테스트 · 성능 · 일관성'],
    ],
    repositories: [
      { name: 'Shared Stack', href: 'https://github.com/berrypjh/shared-stack' },
      { name: 'IT Tech Blog', href: 'https://github.com/berrypjh/it-tech-blog' },
      { name: 'Snapdone', href: 'https://github.com/berrypjh/snapdone' },
      { name: 'Review Platform', href: 'https://github.com/berrypjh/review-platform' },
    ],
    ecosystem: {
      foundation: {
        role: 'Foundation',
        name: 'Shared Stack',
        lines: ['React UI · React Native UI', 'Design Tokens · Config · Consumer Tooling'],
      },
      products: [
        {
          role: 'Product',
          name: 'Snapdone',
          lines: ['Next.js Web · Expo / React Native', 'Go API · LLM Processing'],
        },
        {
          role: 'Product',
          name: 'IT Tech Blog',
          lines: ['Next.js Multi-Zone', 'Accessibility · React / Next Deep Dives', 'Playwright E2E'],
        },
      ],
      review: {
        role: 'Review product',
        name: 'Review Platform',
        lines: ['PR 변경 검증 · 승인', 'Reusable GitHub Actions workflow'],
        flow: ['PR', 'Workflow', 'Review · Approve'],
        coverage: [
          ['Shared Stack', 'Workflow connected'],
          ['Snapdone', 'Workflow connected'],
          ['IT Tech Blog', 'Not connected yet'],
        ],
      },
    },
  },
]
