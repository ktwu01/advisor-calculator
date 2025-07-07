# Is This Advisor a Trap? Calculator Version
Scientific evaluation of advisor comprehensive strength, helping you make informed academic choices.
Scientifically compare multiple advisors to help you avoid problematic supervisors.
![Banner](assets/Banner-advisor-calculator.png)
[![Website](https://img.shields.io/website?url=https%3A//ktwu01.github.io/advisor-calculator)](https://ktwu01.github.io/advisor-calculator/) [![GitHub stars](https://img.shields.io/github/stars/ktwu01/advisor-calculator)](https://github.com/ktwu01/advisor-calculator) [![GitHub forks](https://img.shields.io/github/forks/ktwu01/advisor-calculator)](https://github.com/ktwu01/advisor-calculator/fork) ![cc-by-nc-nd](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md) [![中文](https://img.shields.io/badge/lang-中文-brown.svg)](README.CN.md) [![Español](https://img.shields.io/badge/lang-Espa%C3%B1ol-red.svg)](README.es.md) [![Français](https://img.shields.io/badge/lang-Fran%C3%A7ais-purple.svg)](README.fr.md) [![日本語](https://img.shields.io/badge/lang-日本語-green.svg)](README.ja.md)

---

## 🎯 Product Features

### 🔍 New 20-Dimension Evaluation System
- **Personality Assessment**: Advisor's character, communication skills, management style, student-advisor relationship.
- **Academic Capability**: Research strength, academic reputation, career prospects, research funding.
- **Work Environment**: Work-life balance, lab conditions, geographical location, research group size.
- **Career Development**: Graduation difficulty, internship policy, salary and benefits, peer relationships.

### 🎚️ Smart Weight System
- **Master's Recommendation**: School 60% | Advisor 40%
- **PhD Recommendation**: School 30% | Advisor 70%
- **Postdoc Recommendation**: School 20% | Advisor 80%
- **Manual Adjustment**: Supports personalized weight configuration.
- **Smart Tips**: Detailed explanations of weight definitions.

### 📊 Intelligent Analysis Report
- **Sub-score Visualization**: Personality score, academic score, treatment score, prospect score.
- **Precise Risk Identification**: Automatically identifies all specific evaluation metrics scoring below 3 points.
- **Personalized Advantage Analysis**: Highlights excellent performance (4-5 points).
- **Targeted Suggestions**: Decision guidance based on specific risk points.
- **Collapsible Detailed Report**: Full analysis can be expanded.

### 💾 Comprehensive Data Management
- **Import/Export Functionality**: JSON format data backup.
- **Advisor Nickname System**: Supports pseudonyms for privacy protection.
- **Local Storage**: Data is secure and not uploaded to servers.
- **Version Control**: Data files include version information.

### 🎨 Excellent User Experience
- **Descriptive Scoring**: Intuitive text descriptions (e.g., "996/007") instead of numbers.
- **Responsive Design**: Perfect support for desktop and mobile devices.
- **Real-time Calculation**: Instantaneous score and suggestion updates.
- **Multi-Advisor Comparison**: Supports simultaneous evaluation of up to 3 advisors.
- **Accessibility Design**: Supports keyboard navigation and screen readers.

## 🚀 Quick Start

### Environment Requirements
- Node.js 16+
- npm/yarn/pnpm/bun

### Installation and Running

```bash
# Clone the repository
git clone https://github.com/ktwu01/advisor-calculator.git
cd advisor-calculator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Deployment

```bash
# Build for production
npm run build

# Start the production server
npm start
```

## 📋 Detailed Usage Guide

### 1. Basic Information Setup
- **Advisor Nickname**: Use a pseudonym (e.g., "Prof. X") for easy identification and data management.
- **Advisor Gender**: Influences management style weight calculation.
- **Age Range**: Young/Mid-career/Senior faculty, influences experience assessment.
- **Advisor Title**: From Assistant/Associate Prof to Academician, automatically adjusts academic weights.
- **School Level**: 7 levels from Community College to Ivy League / Top Tier Research University.
- **Degree Program**: Automatically adjusts weight configuration after selection.

### 2. 20 Evaluation Metrics Explained
**Personality Dimension (4 items)**
- Advisor's character, communication skills, management style, student-advisor relationship.

**Academic Dimension (4 items)**
- Research strength, academic reputation, career prospects, research funding.

**Work Dimension (6 items)**
- Work-life balance, research group funding, lab conditions, geographical location, research group size, gender ratio.

**Development Dimension (6 items)**
- Graduation difficulty, mentoring frequency, internship policy, salary and benefits, living costs, peer relationships.

### 3. Intelligent Evaluation System
- **Real-time Calculation**: Results update immediately after each rating.
- **Decimal Precision**: All scores displayed to one decimal place.
- **Level Assessment**: Excellent Advisor, Good Advisor, Average, Somewhat Problematic, Major Red Flags.

### 4. Detailed Analysis Report
**Basic Information**
- Total score and level assessment.
- Current weight configuration display.

**Sub-scores**
- Personality score, academic score, treatment score, prospect score.
- 2x2 grid layout, color-coded.

**Detailed Analysis (Collapsible)**
- **Main Advantages**: High-scoring metrics and sub-category advantages.
- **Potential Risks**: Detailed listing of all metrics scoring below 3 points.
- **Personalized Suggestions**: Targeted guidance based on specific problem areas.

### 5. Data Management
- **Export Data**: Saves as a JSON file, including a timestamp.
- **Import Data**: Restores previous evaluation data.
- **Multi-Advisor Comparison**: Supports simultaneous evaluation of up to 3 advisors.

## 🛠️ Technical Architecture

### Frontend Technology Stack
- **Framework**: Next.js 15 + TypeScript
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Components**: Collapsible panels, tooltips, etc.

### Core Algorithm
- **Smart Weight System**: Dynamic weights based on degree type and advisor title.
- **Risk Identification Algorithm**: Comprehensive detection of low-scoring metrics and generation of personalized risk reports.
- **Advantage Analysis Algorithm**: Multi-level advantage identification and deduplication.
- **Suggestion Generation Algorithm**: Targeted suggestion system based on specific issues.

### Data Processing
- **Local Storage**: Uses localStorage for visit statistics.
- **File Operations**: JSON format import/export.
- **Real-time Calculation**: Responsive calculation based on React state.

## 📦 Project Structure

```
advisor-calculator/
├── README.md, README.CN.md          # Project Documentation
├── assets/                          # Assets
│   ├── Banner-advisor-calculator.png
│   └── todo.md                     # Development Log
├── src/
│   ├── app/
│   │   ├── page.tsx                # Main Application Component
│   │   ├── layout.tsx              # Application Layout
│   │   └── globals.css             # Global Styles
│   ├── components/ui/              # UI Component Library
│   │   ├── badge.tsx, button.tsx, card.tsx
│   │   ├── collapsible.tsx         # Collapsible Component
│   │   ├── input.tsx, label.tsx, select.tsx
│   │   ├── slider.tsx, tooltip.tsx
│   └── lib/
│       └── utils.ts                # Utility Functions
├── tailwind.config.ts              # Tailwind Configuration
├── components.json                 # shadcn/ui Configuration
└── deploy/                         # Deployment Configuration
    └── netlify.toml
```

## 🔬 Algorithm Features

### Precise Risk Identification
- **Comprehensive Coverage**: Detects items scoring <3 points across all 20 evaluation metrics.
- **Intelligent Summary**: If ≤3 items, lists them; if >3 items, shows "first 3 + total count".
- **Special Warnings**: Specific checks for critical metrics (e.g., 996/007, graduation difficulty).
- **Layered Analysis**: Specific metric risks + sub-score risks.

### Personalized Suggestion System
- **High Score Range (≥80)**: Highly recommended.
- **Mid-High Score (70-79)**: Generally recommended.
- **Mid Score Range (60-69)**: Specific attention to risk points advised.
- **Low Score Range (<60)**: Detailed listing of major issues.

### Multi-Dimensional Weight Algorithm
- **Base Weights**: Preset weights based on degree type.
- **Title Bonus**: Academician, Distinguished Chair, etc., provide academic weight bonuses.
- **School Influence**: 7 levels of school prestige provide brand weight bonuses.
- **Gender and Age**: Subtle adjustments based on management experience.

## 🤝 Contribution Guide

### Development Workflow
1. Fork this project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### Code Standards
- Use TypeScript for type checking.
- Follow ESLint + Biome code standards.
- Components use functional programming.
- Use Tailwind CSS for styling.

### Testing Requirements
- Ensure all functionalities work correctly.
- Test various scoring combinations.
- Verify import/export functions.
- Check responsive layout.

## 📄 License

This project is licensed under the [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) License.
- ✅ Allows download, use, and sharing.
- ❌ Prohibits commercial use.
- ❌ Prohibits modifications and adaptations.

## ⚠️ Disclaimer

- **Reference Tool**: This tool is for reference only. Please make rational choices based on actual circumstances.
- **Privacy Protection**: Data is stored locally only and not uploaded to servers.
- **Subjective Evaluation**: Evaluation results are based on subjective judgment and do not represent absolute accuracy.
- **Decision Responsibility**: Final decision responsibility rests solely with the user.

## 🔗 Related Links

- [🌐 Live Demo](https://ktwu01.github.io/advisor-calculator/)
- [🐛 Bug Reports](https://github.com/ktwu01/advisor-calculator/issues)
- [💡 Feature Suggestions](https://github.com/ktwu01/advisor-calculator/discussions)
- [📖 Chinese README](README.CN.md)

## 🎉 Changelog

### v2.1.0 Latest Version
- ✅ English, Chinese, Spanish, French, Japanese 5-Language Support
- ✅ New 20-Dimension Evaluation System
- ✅ Smart Risk Identification Algorithm
- ✅ Collapsible Detailed Analysis Report
- ✅ Descriptive Scoring Interface
- ✅ Complete Import/Export Functionality
- ✅ Multi-Advisor Comparison System
- ✅ Personalized Weight Configuration

### Historical Versions
- **v2.0.0**: Added smart weight system and data management.
- **v1.5.0**: New economic dimension evaluation.
- **v1.0.0**: Basic evaluation system launched.

---

**If this project is helpful to you, please give it a ⭐ Star!**

> May every student find their ideal advisor and avoid pitfalls on their academic journey! 🎓