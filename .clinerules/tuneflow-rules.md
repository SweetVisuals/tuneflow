# Audio NFT Platform Implementation Guide

## Audio-Specific Design Tokens
### Waveform Colors:
- Progress: `#E75A7C` (Matches primary brand)
- Background: `#2C363F` (Dark base)
- Cursor: `#F2F5EA` (High contrast)
- Peaks: `#BBC7A4` (Accent color)

### Player Controls:
- Play Button: `w-12 h-12 bg-primary rounded-full`
- Timeline: `h-1.5 bg-secondary/30`
- Volume: `w-24 h-1.5 bg-secondary/30`

## Audio UI Components
### Waveform Player
- Dimensions: Full-width container
- Responsive: Scales from mobile to desktop
- Features:
  - Seekable waveform
  - Time display
  - Playback controls

### NFT Audio Cards
- Layout: Grid-based (2-4 columns responsive)
- Content:
  - Cover Art (1:1 aspect ratio)
  - Title/Artist metadata
  - Play button overlay
- Interactions:
  - Hover: Scale 1.03
  - Active: Scale 0.98

## Audio-Specific UI Components
### Waveform Player
- Colors:
  - Progress: `#9D4EDD`
  - Waveform: `#4A4A4A`
  - Cursor: `#F72585`
- Controls:
  - Play/Pause: `w-10 h-10` (Circle button)
  - Timeline: `h-1.5` (Thin progress bar)

### NFT Cards
- Dimensions: `w-full md:w-64`
- Border: `rounded-xl border border-gray-700`
- Hover: `transform transition hover:scale-105`
- Content:
  - Cover Art: `aspect-square object-cover`
  - Metadata: `p-4 text-sm`

## Navigation
### Main Nav
- Layout: `sticky top-0 z-50 bg-gray-900/80 backdrop-blur`
- Items: `hover:text-primary transition-colors`
- Active: `text-primary font-medium`

### Mobile Player Bar
- Fixed: `fixed bottom-0 left-0 right-0`
- Background: `bg-gray-800 border-t border-gray-700`
- Controls: `flex items-center justify-between p-3`

## Animations
### Micro-interactions
- Button Hover: `transition-transform hover:scale-105`
- Card Hover: `transition-all duration-300 hover:shadow-lg`
- Loading: `animate-pulse bg-gray-700 rounded`

### Audio Visualizers
- Equalizer Bars: `animate-pulse` with varying delays
- Play/Pulse: `animate-ping` on play state change

## Dark Mode Implementation
- Base: `dark` class on html element
- Tailwind Config:
```js
darkMode: 'class',
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#9D4EDD',
        dark: '#7B2CBF'
      }
    }
  }
}
```

## Technical Stack
### Core
- Next.js 14 (App Router)
- TypeScript (Strict mode)
- Tailwind CSS (JIT compiler)
- Web3.js / Ethers.js

### Authentication
- Particle Network (OAuth + Web3 Auth)
  - Social logins (Google, Twitter, etc.)
  - Wallet connections (MetaMask, WalletConnect)
  - Unified auth flow

### Database
- Supabase (PostgreSQL)
  - User profiles
  - Track metadata
  - Social graph (follows, likes)
  - Real-time subscriptions

### Audio
- Wavesurfer.js (Waveform rendering)
- Howler.js (Audio playback)
- Web Audio API (Advanced processing)

### NFT
- IPFS (Decentralized storage)
- Smart Contracts (ERC-721/1155)
- WalletConnect (Web3 transactions)

## File Structure
```
src/
├── app/
│   ├── (main)/          # Public routes
│   ├── (studio)/        # Creator dashboard
│   └── (player)/        # Audio player context
├── components/
│   ├── audio/           # Player components
│   ├── nft/             # NFT display components
│   └── ui/              # Shared UI elements
├── lib/
│   ├── audio/           # Audio processing utils
│   └── web3/            # Blockchain interactions
└── public/
    ├── audio/           # Sample tracks
    └── covers/          # Default artwork
