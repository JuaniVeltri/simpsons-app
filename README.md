<div align="center">

# 🍩 The Simpsons Explorer

### A Modern, Full-Stack Web Application to Explore The Simpsons Universe

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://simpsons-app.vercel.app) · [Report Bug](https://github.com/JuaniVeltri/simpsons-app/issues) · [Request Feature](https://github.com/JuaniVeltri/simpsons-app/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About

**The Simpsons Explorer** is a modern, responsive web application that lets you dive deep into the beloved universe of The Simpsons. Browse through **1,182+ characters**, **768+ episodes**, and **477+ locations** from Springfield with an intuitive and beautifully designed interface.

Built with cutting-edge web technologies including **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**, this project demonstrates best practices in modern web development, state management, and responsive design.

### ✨ Highlights

- 🎨 **Neobrutalist Design** - Bold borders, vibrant colors, and eye-catching shadows
- ⚡ **Lightning Fast** - Optimized with React Query caching and Next.js SSR
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- 💾 **Persistent Favorites** - Save your favorite items with localStorage
- 🔍 **Advanced Search & Filters** - Find exactly what you're looking for
- 🎭 **Smooth Animations** - Delightful micro-interactions with Framer Motion

---

## 🚀 Features

### Core Functionality

#### 🎭 Characters Browser
- Browse **1,182+ characters** from The Simpsons universe
- Filter by **gender** (Male/Female) and **status** (Alive/Deceased)
- Real-time search by character name
- View detailed information including age, occupation, and famous phrases
- High-quality character portraits

#### 📺 Episodes Explorer
- Explore **768+ episodes** spanning 35 seasons
- Filter episodes by **season** (1-35)
- Search episodes by title
- View episode synopsis, air dates, and season information
- Episode thumbnails and metadata

#### 📍 Locations Directory
- Discover **477+ iconic locations** in Springfield
- Filter by **type** (Home, Business, Landmark, etc.)
- Search locations by name
- View location descriptions, town, and usage information

#### ⭐ Favorites System
- Save unlimited favorites across all categories
- Persistent storage using browser localStorage
- Organized tabs for Characters, Episodes, and Locations
- Bulk actions: Clear all or clear by category
- Real-time favorites counter in header

#### 📊 Statistics Dashboard
- Total characters breakdown (Alive vs Deceased)
- Episodes distribution by season
- Locations categorized by type
- Your personal favorites count
- Fun facts and trivia from The Simpsons universe

### Advanced Features

- **Smart Pagination** - Navigate through large datasets with ease (20 items per page)
- **Instant Search** - Case-insensitive, real-time filtering
- **Responsive Images** - Optimized loading from The Simpsons API CDN
- **Skeleton Loaders** - Smooth loading states while fetching data
- **Breadcrumb Navigation** - Always know where you are in the app
- **Animated Counters** - Scroll-triggered reveal animations
- **Toast Notifications** - User feedback for actions
- **Keyboard Accessible** - Full keyboard navigation support

---

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 16.0.3](https://nextjs.org/)** - React framework with App Router and Server Components
- **[React 19.2.0](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety and better DX

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Framer Motion 12](https://www.framer.com/motion/)** - Production-ready animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### State Management & Data Fetching
- **[TanStack Query v5](https://tanstack.com/query)** - Powerful data synchronization for React
- **React Hooks** - useState, useEffect, custom hooks
- **localStorage** - Client-side persistence for favorites

### UI Primitives (Radix UI)
- Dialog, Tabs, Select, Tooltip, Scroll Area, and more
- Fully accessible, unstyled components

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS transformations
- **TypeScript Compiler** - Type checking

---

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/JuaniVeltri/simpsons-app.git
cd simpsons-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 📁 Project Structure

```
simpsons-app/
│
├── app/                          # Next.js 16 App Router
│   ├── characters/               # Characters pages
│   │   ├── page.tsx             # Characters list
│   │   └── [id]/page.tsx        # Character detail
│   ├── episodes/                 # Episodes pages
│   │   ├── page.tsx             # Episodes list
│   │   └── [id]/page.tsx        # Episode detail
│   ├── locations/                # Locations pages
│   │   ├── page.tsx             # Locations list
│   │   └── [id]/page.tsx        # Location detail
│   ├── favorites/                # Favorites page
│   ├── stats/                    # Statistics page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ... (13 components)
│   ├── dashboard/                # Dashboard components
│   │   └── header.tsx            # App header with branding
│   ├── characters/               # Character components
│   │   ├── character-card.tsx
│   │   └── characters-section.tsx
│   ├── episodes/                 # Episode components
│   │   ├── episode-card.tsx
│   │   └── episodes-section.tsx
│   ├── locations/                # Location components
│   │   ├── location-card.tsx
│   │   └── locations-section.tsx
│   ├── layout/                   # Layout components
│   │   ├── navbar.tsx            # Main navigation
│   │   └── breadcrumbs.tsx       # Breadcrumb navigation
│   └── shared/                   # Shared components
│       ├── favorite-button.tsx
│       ├── search-bar.tsx
│       └── pagination.tsx
│
├── hooks/                        # Custom React hooks
│   ├── use-characters.ts         # Characters data fetching
│   ├── use-episodes.ts           # Episodes data fetching
│   ├── use-locations.ts          # Locations data fetching
│   ├── use-favorites.ts          # Favorites management
│   └── index.ts
│
├── lib/                          # Utility libraries
│   ├── api-client.ts             # Simpsons API client
│   ├── favorites.ts              # Favorites manager
│   └── utils.ts                  # Helper functions
│
├── providers/                    # React Context providers
│   └── query-provider.tsx        # React Query provider
│
├── types/                        # TypeScript definitions
│   └── simpsons.ts               # Type definitions
│
├── public/                       # Static assets
│
└── Configuration Files
    ├── next.config.ts            # Next.js config
    ├── tsconfig.json             # TypeScript config
    ├── tailwind.config.ts        # Tailwind config
    ├── components.json           # shadcn/ui config
    └── package.json              # Dependencies
```

---

## 📖 Usage Guide

### Navigation

The app features a modern navigation bar with 6 main routes:

1. **Home** (/) - Landing page with overview and quick links
2. **Characters** (/characters) - Browse all Simpsons characters
3. **Episodes** (/episodes) - Explore episodes by season
4. **Locations** (/locations) - Discover Springfield locations
5. **Favorites** (/favorites) - View your saved favorites
6. **Stats** (/stats) - Statistics and analytics dashboard

### Searching & Filtering

#### Character Filters
- **Gender**: Male, Female
- **Status**: Alive, Deceased
- **Search**: Type any character name

#### Episode Filters
- **Season**: Select from seasons 1-35
- **Search**: Type episode title

#### Location Filters
- **Type**: Home, Business, Landmark, etc.
- **Search**: Type location name

### Managing Favorites

1. Click the **heart icon** on any character, episode, or location card
2. Access all favorites from the **Favorites** page
3. Organize by tabs: Characters, Episodes, Locations
4. Use **Clear All** to remove all favorites or clear by category

### Keyboard Shortcuts

- `Tab` - Navigate between interactive elements
- `Enter` - Select/activate focused element
- `Esc` - Close modals and dialogs

---

## 🔌 API Integration

This project uses **[The Simpsons API](https://thesimpsonsapi.com/)** - a free, public REST API.

### Base URLs
- **API**: `https://thesimpsonsapi.com/api`
- **CDN**: `https://cdn.thesimpsonsapi.com`

### Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/characters?page={n}` | GET | List characters with pagination |
| `/characters/{id}` | GET | Get character by ID |
| `/episodes?page={n}` | GET | List episodes with pagination |
| `/episodes/{id}` | GET | Get episode by ID |
| `/locations?page={n}` | GET | List locations with pagination |
| `/locations/{id}` | GET | Get location by ID |

### Data Caching Strategy

- **React Query Cache**: 5-minute stale time, 10-minute cache retention
- **In-Memory Cache**: Full dataset cached after first fetch
- **Client-Side Operations**: Filtering, searching, and pagination

---

## 🎨 Design System

### Color Palette

The official Simpsons color scheme:

| Color | Hex | Usage |
|-------|-----|-------|
| Yellow | `#FFDE00` | Primary brand color, buttons, highlights |
| Blue | `#70D1FE` | Secondary color, episodes theme |
| Orange | `#F14E28` | Accent color, locations theme |
| Black | `#000000` | Borders, text, shadows |
| White | `#FFFFFF` | Backgrounds, cards |

### Typography

- **Display Font**: Bangers (Google Fonts)
- **Body Font**: Inter (Google Fonts)
- **Font Sizes**: Responsive scale from 14px to 72px

### Design Principles

- **Neobrutalism**: Thick borders (3-4px), bold shadows, high contrast
- **Playful**: Inspired by The Simpsons cartoon aesthetic
- **Accessible**: WCAG 2.1 AA compliant color contrast
- **Responsive**: Mobile-first approach

---

## 🤝 Contributing

Contributions are welcome! This is an open-source project, and we'd love your help making it better.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

### Reporting Bugs

Found a bug? Please open an issue with:
- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

---

## 🗺️ Roadmap

### Planned Features

- [ ] Dark mode toggle
- [ ] Export favorites to JSON
- [ ] Share favorites via URL
- [ ] Character comparison tool
- [ ] Episode watch tracker
- [ ] Trivia game mode
- [ ] Advanced statistics charts
- [ ] PWA support for offline access
- [ ] Multi-language support (ES, EN)

### Future Enhancements

- [ ] User authentication
- [ ] Public favorites sharing
- [ ] Character relationships graph
- [ ] Episode recommendations
- [ ] Voice actor information

---

## 📄 License

This project is **open source** and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

### API & Data
- **[The Simpsons API](https://thesimpsonsapi.com/)** - Free public API providing all the data

### UI & Design
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible primitives
- **[Lucide](https://lucide.dev/)** - Icon library

### Frameworks & Libraries
- **[Next.js](https://nextjs.org/)** - React framework
- **[TanStack Query](https://tanstack.com/query)** - Data fetching
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework

### Special Thanks
- Matt Groening and the entire Simpsons team for creating this amazing universe
- The open-source community for incredible tools and libraries

---

## 👨‍💻 Author

**Juan Veltri**

- Website: [jveltri.com.ar](https://www.jveltri.com.ar/es)
- GitHub: [@JuaniVeltri](https://github.com/JuaniVeltri)
- LinkedIn: [Juan Veltri](https://www.linkedin.com/in/juan-veltri/)

---

## 📞 Support

If you like this project, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

---

<div align="center">

### 🍩 D'oh! Enjoy exploring The Simpsons universe!

**Built with ❤️ using Next.js, React, and TypeScript**

[⬆ Back to Top](#-the-simpsons-explorer)

</div>
