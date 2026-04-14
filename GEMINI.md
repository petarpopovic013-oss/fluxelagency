# Fluxel Project Context

## Project Overview
Fluxel (`fluxel.rs`) is a web agency portfolio and landing page built with Next.js (App Router), React, TypeScript, and Tailwind CSS. The agency, based in Novi Sad, Serbia, specializes in creating online scheduling systems and automation solutions for service businesses (salons, therapists, rent-a-car, etc.).

### Key Technologies:
- **Framework:** Next.js (version 16) utilizing the App Router architecture (`app/` directory).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS v4 with a heavily customized dark mode aesthetic (black backgrounds with cyan, blue, and violet glowing accents).
- **Animations:** Framer Motion is used extensively for scroll reveals (`FadeIn`, `SlideIn`, `ScaleIn`), hover effects, and magnetic interactions.
- **3D Graphics:** Three.js and React Three Fiber (`@react-three/fiber`, `@react-three/drei`) are used for advanced visual effects, likely in hero sections (e.g., `EtherealBeamsHero`).
- **Icons:** Lucide React.
- **Forms:** Integration with Web3Forms for contact form submissions.

## Building and Running

You can use the following npm scripts to interact with the project:

- **Start Development Server:**
  ```bash
  npm run dev
  ```
  The application will be available at [http://localhost:3000](http://localhost:3000).

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Start Production Server:**
  ```bash
  npm run start
  ```

- **Lint Codebase:**
  ```bash
  npm run lint
  ```

## Development Conventions

- **Component Architecture:** Reusable UI components are stored in the `components/ui/` directory. The project utilizes utility libraries like `clsx`, `tailwind-merge`, and `class-variance-authority` indicating a component pattern similar to `shadcn/ui`.
- **File Structure:** 
  - `app/`: Next.js App Router pages, layouts, and global styles.
  - `components/ui/`: Shared user interface building blocks.
  - `lib/`: Utility functions (e.g., `utils.ts`).
  - `public/`: Static assets such as images and SVGs.
- **Styling Paradigm:** Strict adherence to Tailwind CSS utility classes. The project uses custom inline animations and motion components rather than raw CSS keyframes where possible.
- **Language:** The primary content language of the application is Serbian (`sr`). Code variables and component names are mostly in English.
- **UI UX:** The design emphasizes a dark, modern, and "ethereal" look with smooth transitions, blurred background glows, and interactive hover states.

## Testing
Playwright is installed as a dev dependency (`@playwright/test`), suggesting end-to-end testing capabilities, although a specific test script might not be explicitly defined in `package.json`. Tests are likely run via `npx playwright test`.