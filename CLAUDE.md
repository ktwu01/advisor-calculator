# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Chinese academic advisor evaluation tool called "这个导师坑不坑·测算版" (Is This Advisor a Trap? Calculator Version). It's a Next.js application that helps students scientifically evaluate and compare multiple academic advisors across various dimensions.

## Core Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **UI Components**: Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS with custom components
- **Internationalization**: next-intl for multi-language support (Chinese, English, Japanese)
- **Type Checking**: TypeScript with strict configuration
- **Linting**: ESLint with Next.js rules + Biome for formatting

### Key File Structure
- `src/app/[locale]/` - Internationalized pages using Next.js App Router
- `src/app/legacy-page.tsx` - Main calculator component (currently the core functionality)
- `src/components/ui/` - Reusable UI components based on shadcn/ui
- `src/i18n/` - Internationalization configuration and locale files
- `src/middleware.ts` - Next-intl middleware for locale handling

## Common Development Commands

### Development
```bash
npm run dev          # Start development server on 0.0.0.0
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run TypeScript check + ESLint
npm run format       # Format code with Biome
```

## Key Architecture Patterns

### Advisor Evaluation System
The core logic is in `src/app/legacy-page.tsx`:
- **AdvisorData Interface**: Defines the structure for advisor information (lines 15-48)
- **Scoring Algorithm**: Complex multi-dimensional scoring system with weighted calculations
- **Real-time Calculations**: Dynamic score updates based on user input
- **Detailed Analysis**: Generates advantages, risks, and suggestions for each advisor

### Scoring Components
- **Base Scores**: 20 evaluation dimensions (personality, research, funding, etc.)
- **Multipliers**: Title-based (Nobel Prize to regular professor), school-level, gender/age
- **Weighted Scoring**: Configurable weights between school prestige vs advisor qualities
- **Detailed Breakdown**: Four main categories (personality, academic, treatment, prospect)

### Internationalization Setup
- Uses next-intl with locale prefix strategy
- Middleware handles locale routing automatically
- Supports Chinese (default), English, and Japanese

### UI Component System
- Based on shadcn/ui with Radix UI primitives
- Consistent styling with Tailwind CSS
- Modular component architecture in `src/components/ui/`

## Development Guidelines

### Working with the Calculator
- Main functionality is in `legacy-page.tsx` - this is the primary component
- The `[locale]/page.tsx` is currently a simple placeholder
- Complex scoring logic includes multiple multipliers and weighted calculations

### Adding New Features
- Follow the existing shadcn/ui pattern for new components
- Use the established TypeScript interfaces for data structures
- Maintain the responsive grid layout for advisor comparisons

### Internationalization
- Add new strings to locale files in `src/i18n/locales/`
- Use the `useTranslations` hook for client components
- Test with different locales using URL prefixes (e.g., `/en`, `/ja`)

## Configuration Notes

### Next.js Configuration
- Webpack fallbacks configured for client-side compatibility
- Image optimization enabled but unoptimized for static export compatibility
- Trailing slash set to false for proper routing

### Middleware
- Handles locale detection and routing
- Logs requests for debugging (may want to remove in production)
- Excludes API routes and static assets from locale handling

## Current Architecture Status
The project appears to be in transition from a single-page application to a properly internationalized multi-page structure. The main calculator logic is currently in `legacy-page.tsx` and may need to be integrated into the new locale-based page structure.