# AI Job Copilot

A React + Vite web application that helps users find jobs tailored to their skills and resume using AI matching.

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query
- **Icons**: Lucide React
- **Package Manager**: npm
- **Runtime**: Node.js 20

## Pages

- `/` — Home page with hero section, features, and stats
- `/jobs` — AI-matched job listings with search and filters
- `/resume` — Resume upload and AI analysis
- `/profile` — User profile and skills management

## Development

```bash
npm run dev   # Start dev server on port 5000
npm run build # Build for production
```

## Deployment

Configured as a static site deployment:
- Build command: `npm run build`
- Output directory: `dist`

## Project Structure

```
src/
  components/   Layout and shared components
  pages/        Page components (Home, Jobs, Resume, Profile)
  types/        TypeScript type definitions
  App.tsx       Root component with routing
  main.tsx      Entry point
  index.css     Global styles with Tailwind
```
