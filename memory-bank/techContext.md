# Technical Context: Melodify

## Core Technologies
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + ShadCN UI components
- **State Management**: React Context + Zustand (potential future migration)
- **Routing**: React Router 6
- **API Client**: Supabase JavaScript Client

## Supabase Integration
- **Project ID**: fbgncijhtbplnepysbld
- **URL**: https://fbgncijhtbplnepysbld.supabase.co
- **Auth**: Email/password with potential OAuth providers
- **Database**: PostgreSQL with Row Level Security
- **Storage**: Audio file storage bucket

## Development Setup
1. **Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   ```env
   REACT_APP_SUPABASE_URL=https://fbgncijhtbplnepysbld.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ25jaWpodGJwbG5lcHlzYmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzU0OTAsImV4cCI6MjA2Mjk1MTQ5MH0.Vfgl9ExKjODdOGsvEFDzyBbU_5L1Rm8sSdDhXGRzX70
   ```

3. **Scripts**:
   - `dev`: Start development server
   - `build`: Create production build
   - `preview`: Preview production build
   - `lint`: Run ESLint

## Architecture Patterns
1. **Component Structure**:
   - Atomic design principles
   - Compound components for complex UIs
   - Custom hooks for business logic

2. **Data Flow**:
   - Supabase client for direct database access
   - React Query for server state management
   - Zustand for global client state (if needed)

3. **Performance**:
   - Code splitting with React.lazy
   - Dynamic imports for heavy components
   - Optimized audio loading with pre-fetching
