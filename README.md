# [Chloe's Component Library](https://chl0e-g.github.io/component-library/?path=/docs/feedback-toast--docs)

A reusable React component library built as a portfolio project to demonstrate the principles of implementing and maintaining a modern design system.

The project focuses on building accessible, composable and type-safe UI components with a strong emphasis on developer experience. It's a showcase of how I'd approach creating a production-quality component library.

Please note: It's quite small right now, I'm still adding components!

## Goals

- Target a use case of internal business applications.
- Prioritise accessibility.
- Create consistent and predictable component APIs.
- Utilise design tokens throughout.
- Prioritise composition over configuration.
- Provide excellent developer experience through consistent, intuitive component APIs, Typescript, and Storybook.
- Demonstrate testing and documentation.

## Non-Goals

- Target a use case of marketing websites or highly animated UIs.
- Build every possible component. Instead, focus on a smaller set of polished components.
- Spending effort on important but out-of-scope areas - this is a project in my spare time, so to focus effort on the core goals I will not be:
  - Implementing CI/CD
  - Spending lots of time on design (instead I'm using a fairly simple design, generated with Figma Make)

## Tech Stack

- React
- TypeScript
- Vite
- Storybook (including for component testing)
- Vitest
- CSS Variables (Design Tokens)
- ESLint
- Prettier

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Run Storybook

Storybook is the development environment for this project — there is no standalone app to run.

```bash
npm run storybook
```

### Run tests

```bash
npm test
```

### Build the library

Compiles the components in `src/` to a distributable ESM package (`dist/index.js` and `dist/index.d.ts`).

```bash
npm run build
```

### Generate design tokens

Regenerates the CSS variables and text-style utilities in `src/` from the token source files (`src/tokens/*.ts`). Run this after changing any token values.

```bash
npm run generate:tokens
```

## Documentation

Storybook is the primary source of documentation for the project. Every component includes interactive examples, and I will be adding API documentation, accessibility notes and usage guidance. View the [deployed Storybook here](https://chl0e-g.github.io/component-library/?path=/docs/feedback-toast--docs).