# Chloe's Component Library

Chloe's Component Library is a reusable React component library built as a portfolio project to demonstrate the principles of implementing and maintaining a modern design system.

The project focuses on building accessible, composable and type-safe UI components with a strong emphasis on developer experience, documentation and consistency. Rather than aiming to become a comprehensive UI framework, Chloe's Component Library is intended to showcase the engineering practices involved in creating a production-quality component library.

## Goals

* Target the library at internal business applications.
* Build accessible components by default.
* Create consistent and predictable component APIs.
* Separate design tokens from component implementation.
* Prioritise composition over configuration.
* Provide excellent developer experience through TypeScript and Storybook.
* Demonstrate testing and documentation practices expected of a modern design system.

## Non-Goals

* Replace established UI libraries such as Material UI or Mantine.
* Include application-specific business logic.
* Optimise for marketing websites or highly animated interfaces.
* Build every possible component—instead, focus on a smaller set of polished, production-quality components.
* Spending effort on important but out-of-scope areas - this is a project in my spare time, so to focus effort on the core goals I will not be:
  - Implementing CI/CD
  - Spending lots of time on creating the design (instead I'm using a fairly classic, simple design, utilising Figma Make)

## Tech Stack

* React
* TypeScript
* Vite
* Storybook
* Vitest
* React Testing Library
* CSS Variables (Design Tokens)
* ESLint
* Prettier
* GitHub Actions

## Getting Started

### Prerequisites

* Node.js 20+
* pnpm (recommended)

### Installation

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

The application will be available at:

```
http://localhost:5173
```

### Run Storybook

```bash
npm storybook
```

### Run tests

```bash
npm test
```

### Build the project

```bash
npm build
```

## Project Principles

Chloe's Component Library is guided by a small set of engineering principles:

* **Accessibility First** – Components should be usable with keyboard navigation and assistive technologies by default.
* **Composition Over Configuration** – Components provide reusable building blocks rather than exposing large numbers of configuration props.
* **Consistent APIs** – Similar components should share the same naming conventions and behaviours wherever possible.
* **Design Tokens Everywhere** – Colours, spacing, typography and other design values are defined as shared tokens rather than hard-coded into components.
* **Developer Experience** – Components should be intuitive to use, well documented and fully typed.

## Documentation

Storybook is the primary source of documentation for the project. Every component includes interactive examples, API documentation, accessibility notes and usage guidance.

## Status

This project is actively being developed and expanded as a demonstration of modern design system engineering practices.
