# The Simpsons Explorer 🍩

Una aplicación web moderna y profesional para explorar el universo de Los Simpsons, construida con Next.js 16, React 19, TypeScript y Tailwind CSS 4.

## ✨ Características

### 🎯 Funcionalidades Principales

- **Exploración Completa**: Accede a 1182+ personajes, 768+ episodios y 477+ ubicaciones
- **Dashboard Interactivo**: Navegación por pestañas con diseño moderno y responsive
- **Búsqueda Avanzada**: Búsqueda en tiempo real en todas las secciones
- **Filtros Inteligentes**: Filtra por género, estado, temporada, tipo de ubicación y más
- **Sistema de Favoritos**: Guarda tus personajes, episodios y ubicaciones favoritas con persistencia local
- **Vista Detallada**: Modales con información completa de cada elemento
- **Estadísticas**: Dashboard con métricas y datos curiosos
- **Animaciones Suaves**: Transiciones fluidas con Framer Motion

### 🎨 Diseño

- **Paleta Temática**: Colores oficiales de Los Simpsons (amarillo #FFDE00, azul #70D1FE, naranja #F14E28)
- **Estilo Cartoon**: Bordes negros gruesos y sombras inspiradas en el diseño de la serie
- **Responsive**: Optimizado para mobile, tablet y desktop
- **Dark Mode Ready**: Soporte para tema oscuro
- **Accesibilidad**: Componentes accesibles con shadcn/ui

## 🚀 Stack Tecnológico

### Core
- **Next.js 16.0.3** - Framework React con App Router
- **React 19.2.0** - UI library con Server Components
- **TypeScript 5** - Type safety completo
- **Tailwind CSS 4** - Utility-first styling

### UI Components
- **shadcn/ui** - Componentes elegantes y accesibles
- **Framer Motion** - Animaciones y transiciones
- **Lucide React** - Iconos modernos

### API
- **The Simpsons API** - API REST pública ([thesimpsonsapi.com](https://thesimpsonsapi.com))

## 📦 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🎮 Funcionalidades

### 1. **Characters** (Personajes)
- Visualiza los 1182+ personajes de la serie
- Filtra por género (Male/Female) y estado (Alive/Deceased)
- Búsqueda por nombre
- Ver detalles: edad, ocupación, frases famosas

### 2. **Episodes** (Episodios)
- Explora los 768+ episodios
- Filtra por temporada (1-35)
- Búsqueda por título
- Ver sinopsis, fecha de emisión

### 3. **Locations** (Ubicaciones)
- Descubre las 477+ ubicaciones de Springfield
- Filtra por tipo (Home/Business/Landmark)
- Búsqueda por nombre

### 4. **Stats** (Estadísticas)
- Total de personajes vivos vs muertos
- Episodios por temporada
- Tus favoritos guardados
- Fun facts del universo Simpsons

## 🗂️ Estructura del Proyecto

```
simpsons-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard/          # Dashboard components
│   ├── characters/         # Characters section
│   ├── episodes/           # Episodes section
│   ├── locations/          # Locations section
│   └── shared/             # Shared components
├── lib/
│   ├── api-client.ts       # API client
│   └── favorites.ts        # Favorites manager
├── hooks/
│   └── use-favorites.ts    # Favorites hook
└── types/
    └── simpsons.ts         # TypeScript types
```

## 🎨 Paleta de Colores

Los colores están configurados en `app/globals.css`:

```css
--simpsons-yellow: #FFDE00   /* Amarillo principal */
--simpsons-blue: #70D1FE     /* Azul Maya */
--simpsons-orange: #F14E28   /* Naranja Bart */
--simpsons-black: #000000    /* Negro */
```

## 📱 Responsive Design

- **Mobile**: < 640px (1 columna)
- **Tablet**: 640px - 1024px (2-3 columnas)
- **Desktop**: > 1024px (4 columnas)

## ⚡ Performance

- Optimización de imágenes con Next.js Image
- Lazy loading de componentes
- Paginación (20 items/página)
- Caching con localStorage
- Build optimizado con tree shaking

## 🙏 Créditos

- **API**: [The Simpsons API](https://thesimpsonsapi.com)
- **UI**: [shadcn/ui](https://ui.shadcn.com)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)

---

**¡D'oh! Disfruta explorando el universo de Los Simpsons 🍩**
