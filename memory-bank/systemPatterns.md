# System Patterns: Melodify

## Architectural Overview
1. **Frontend Architecture**:
   - Single Page Application (SPA) with client-side routing
   - Component-based architecture with clear separation of concerns
   - Feature-based directory structure

2. **Data Layer**:
   - Direct Supabase client integration
   - Custom hooks for data fetching and mutations
   - React Query for server state management

## Key Technical Decisions
1. **Authentication**:
   - Supabase Auth with email/password
   - Session management via React Context
   - Protected routes using React Router

2. **Audio Handling**:
   - Web Audio API for playback
   - Custom audio player component
   - Buffering and pre-loading strategies

3. **State Management**:
   - Local state: React useState/useReducer
   - Global state: React Context
   - Complex state: Potential future migration to Zustand

## Component Patterns
1. **UI Components**:
   - Built on ShadCN UI primitives
   - Custom theming via CSS variables
   - Consistent prop interfaces

2. **Layout Components**:
   - Responsive layout system
   - Persistent navigation
   - Dynamic content areas

3. **Data Components**:
   - Data fetching hooks
   - Loading/error states
   - Optimistic updates

## Performance Patterns
1. **Code Splitting**:
   - Route-based splitting
   - Component-level lazy loading
   - Dynamic imports for heavy libraries

2. **Asset Optimization**:
   - Audio file compression
   - Image optimization
   - Font subsetting

3. **Rendering Optimization**:
   - Memoization
   - Virtualized lists
   - Debounced inputs
