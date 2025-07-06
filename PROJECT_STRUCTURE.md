# Project Structure Memo

## Advisor Calculator Repository Structure

```
/advisor-calculator/
├── README.md, README.CN.md, LICENSE          # Documentation
├── package.json, package-lock.json           # Dependencies
├── next.config.js, tsconfig.json             # Next.js config
├── tailwind.config.ts, postcss.config.mjs    # Styling config
├── biome.json, eslint.config.mjs             # Linting config
├── components.json                           # shadcn/ui config
├── bun.lock                                  # Bun lockfile
├── assets/
│   ├── Banner-advisor-calculator.png         # Banner image
│   └── todo.md                              # TODO list
├── deploy/
│   └── netlify.toml                         # Deployment config
├── src/
│   ├── app/
│   │   ├── layout.tsx                       # App layout
│   │   ├── page.tsx                         # Main advisor calculator
│   │   ├── ClientBody.tsx                   # Client wrapper
│   │   └── globals.css                      # Global styles
│   ├── components/ui/                       # shadcn/ui components
│   │   ├── badge.tsx, button.tsx, card.tsx
│   │   ├── input.tsx, label.tsx, select.tsx
│   │   ├── slider.tsx, tooltip.tsx
│   └── lib/
│       └── utils.ts                         # Utility functions
├── out/                                     # Build output
└── node_modules/                            # Dependencies
```

## Key Files

- **Main component**: `src/app/page.tsx` - Contains the advisor comparison logic
- **UI components**: `src/components/ui/` - Contains reusable UI components
- **Styling**: `src/app/globals.css` + Tailwind CSS
- **Configuration**: Uses Next.js 15 with TypeScript and shadcn/ui

## Dependencies

- **Framework**: Next.js 15 with TypeScript
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Linting**: ESLint + Biome

## Available UI Components

- Badge, Button, Card, Input, Label
- Select, Slider, Tooltip
- **Missing**: Collapsible (needs to be added)

## Current Development Status

Working on adding detailed evaluation results with collapsible sections. Main features implemented:
- Advisor comparison with scoring system
- Dynamic weight adjustment based on degree type
- Import/export functionality
- Detailed scoring breakdown

## Notes

- Uses bun as package manager (bun.lock present)
- Configured for Netlify deployment
- Chinese language interface
- Repository appears clean and legitimate