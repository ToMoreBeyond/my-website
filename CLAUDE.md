# Claude Code Spec-Driven Development

Kiro-style Spec Driven Development implementation using claude code slash commands, hooks and agents.

## Project Context

### Paths
- Steering: `.kiro/steering/`
- Specs: `.kiro/specs/`
- Commands: `.claude/commands/`

### Steering vs Specification

**Steering** (`.kiro/steering/`) - Guide AI with project-wide rules and context
**Specs** (`.kiro/specs/`) - Formalize development process for individual features

### Active Specifications
- **kiro-sdd-workflow**: Kiro-style Spec Driven Development workflow implementation using Claude Code slash commands, hooks and agents
- Use `/kiro:spec-status [feature-name]` to check progress

## Development Guidelines
- Think in English, but generate responses in Japanese (思考は英語、回答の生成は日本語で行うように)

## UI / Component Rules (MUST FOLLOW)
**アプリケーションのUIは原則すべて [shadcn/ui](https://ui.shadcn.com) のコンポーネントで構築する。**
独自の styled `div` を新規に作る前に、必ず該当する shadcn/ui コンポーネントが無いか確認すること。

- **基盤**: Next.js 16 (App Router) + React 19 + Tailwind CSS v4。設定は `components.json`（style: `radix-nova`, baseColor: `neutral`, iconLibrary: `lucide`）。
- **トーン**: teracy.io 参考の温かいクリーム基調（紙）、深い焦げ茶の文字（インク）、水色系のアクセント `brand`（ロゴ中央の青）1 色。ボタンや暗い区画（フッター・CTA）はインクの地にクリームの文字。見出しは Noto Sans JP を太く詰め（字間 -0.03em）、一言の言葉に BIZ UDPMincho（`font-mincho`）を混ぜ、英字は Bricolage Grotesque（`font-display`）、数字の遊びに DSEG7（`font-seg`）。余白は広く 1 区画 1 メッセージ。動きは framer-motion / gsap で控えめに、`prefers-reduced-motion` を必ず尊重する。アクセントカラーは増やさない。
- **コンポーネント追加**: `npx shadcn@latest add <name>`。導入済みは `src/components/ui/` を確認してから使う（再追加しない）。
- **セマンティックカラーのみ**: `bg-primary` / `text-muted-foreground` / `bg-card` 等を使う。`bg-blue-500` 等の生の色や `#1a1a1a` のインラインstyleは禁止。
- **className はレイアウト用**: コンポーネントの色・タイポgrafを上書きしない。バリアント（`variant="outline"`, `size="lg"` 等）を優先。
- **間隔は `gap-*`**（`space-x/y-*` は使わない）。縦積みは `flex flex-col gap-*`。
- **正方形は `size-*`**（`w-10 h-10` ではなく `size-10`）。
- **条件付きクラスは `cn()`**（`@/lib/utils`）を使う。
- **置き換えの指針**: ボタン→`Button`、カード→`Card`(+CardHeader/Title/Content/Footer)、バッジ→`Badge`、区切り線→`Separator`、フォーム→`Field`+`Input`/`Textarea`、モバイルメニュー→`Sheet`、ナビ→`NavigationMenu`、アバター→`Avatar`(+`AvatarFallback`)。
- 詳細ルールは shadcn スキル（`.agents/skills/shadcn/`）の `SKILL.md` / `rules/` を参照。新規UI実装・修正時は `npx shadcn@latest docs <component>` で最新APIを確認する。

## Workflow

### Phase 0: Steering (Optional)
`/kiro:steering` - Create/update steering documents
`/kiro:steering-custom` - Create custom steering for specialized contexts

Note: Optional for new features or small additions. You can proceed directly to spec-init.

### Phase 1: Specification Creation
1. `/kiro:spec-init [detailed description]` - Initialize spec with detailed project description
2. `/kiro:spec-requirements [feature]` - Generate requirements document
3. `/kiro:spec-design [feature]` - Interactive: "Have you reviewed requirements.md? [y/N]"
4. `/kiro:spec-tasks [feature]` - Interactive: Confirms both requirements and design review

### Phase 2: Progress Tracking
`/kiro:spec-status [feature]` - Check current progress and phases

## Development Rules
1. **Consider steering**: Run `/kiro:steering` before major development (optional for new features)
2. **Follow 3-phase approval workflow**: Requirements → Design → Tasks → Implementation
3. **Approval required**: Each phase requires human review (interactive prompt or manual)
4. **No skipping phases**: Design requires approved requirements; Tasks require approved design
5. **Update task status**: Mark tasks as completed when working on them
6. **Keep steering current**: Run `/kiro:steering` after significant changes
7. **Check spec compliance**: Use `/kiro:spec-status` to verify alignment

## Steering Configuration

### Current Steering Files
Managed by `/kiro:steering` command. Updates here reflect command changes.

### Active Steering Files
- `product.md`: Always included - Product context and business objectives
- `tech.md`: Always included - Technology stack and architectural decisions
- `structure.md`: Always included - File organization and code patterns

### Custom Steering Files
<!-- Added by /kiro:steering-custom command -->
<!-- Format:
- `filename.md`: Mode - Pattern(s) - Description
  Mode: Always|Conditional|Manual
  Pattern: File patterns for Conditional mode
-->

### Inclusion Modes
- **Always**: Loaded in every interaction (default)
- **Conditional**: Loaded for specific file patterns (e.g., "*.test.js")
- **Manual**: Reference with `@filename.md` syntax

