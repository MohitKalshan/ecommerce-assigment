# Product Dashboard Application

A modern product dashboard application built with React, Redux Toolkit, and TypeScript. This application demonstrates proficiency in building frontend applications with state management, API integration, filtering, searching, and comprehensive testing.

## Features

- **Product Listing**: Browse products in a responsive grid layout
- **Search**: Debounced search by product title
- **Filtering**: Filter products by category
- **Sorting**: Sort products by price (ascending/descending)
- **Product Details**: View detailed information about each product
- **Favorites**: Add and manage favorite products
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## Tech Stack

- **React 19** - UI library with functional components and hooks
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities

## Project Structure

```
assignment/
├── src/
│   ├── app/
│   │   └── store.ts                 # Redux store configuration
│   ├── features/
│   │   ├── products/
│   │   │   ├── productsSlice.ts     # Products state slice
│   │   │   ├── productsThunks.ts    # Async thunks for API calls
│   │   │   └── productsSelectors.ts # Memoized selectors
│   │   ├── filters/
│   │   │   └── filtersSlice.ts       # Search, category, sort state
│   │   └── favorites/
│   │       └── favoritesSlice.ts    # Favorites state management
│   ├── components/
│   │   ├── ProductCard.tsx           # Reusable product card component
│   │   ├── SearchBar.tsx             # Debounced search input
│   │   ├── CategoryFilter.tsx       # Category dropdown filter
│   │   ├── SortSelector.tsx         # Price sort selector
│   │   ├── LoadingSpinner.tsx       # Loading state component
│   │   └── ErrorMessage.tsx         # Error display component
│   ├── pages/
│   │   ├── ProductListingPage.tsx   # Main listing with filters
│   │   ├── ProductDetailPage.tsx    # Product details view
│   │   └── FavoritesPage.tsx        # Favorites list page
│   ├── services/
│   │   └── api.ts                   # Fake Store API client
│   ├── types/
│   │   └── product.ts               # TypeScript interfaces
│   ├── utils/
│   │   └── debounce.ts              # Debounce utility
│   ├── App.tsx                      # Main app component with routing
│   └── main.tsx                     # Entry point
├── src/__tests__/
│   ├── features/
│   │   ├── productsSlice.test.ts    # Redux slice unit tests
│   │   ├── filtersSlice.test.ts
│   │   └── favoritesSlice.test.ts
│   ├── components/
│   │   ├── ProductCard.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   └── CategoryFilter.test.tsx
│   └── integration/
│       ├── searchFilter.test.tsx    # E2E search/filter tests
│       └── favorites.test.tsx       # E2E favorites tests
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── jest.config.js
├── vercel.json                      # Vercel deployment config
├── netlify.toml                     # Netlify deployment config
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (install with `npm install -g pnpm`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assignment
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:coverage` - Run tests with coverage report
- `pnpm run lint` - Run ESLint

## API Integration

The application uses the [Fake Store API](https://fakestoreapi.com) to fetch product data:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch product by ID
- `GET /products/categories` - Fetch all categories

## State Management

The application uses Redux Toolkit for state management with three main slices:

1. **Products Slice**: Manages product data, loading states, and selected product
2. **Filters Slice**: Manages search query, selected category, and sort option
3. **Favorites Slice**: Manages favorite product IDs

### Selectors

Memoized selectors are used for efficient data filtering and transformation:

- `selectFilteredProducts`: Combines search, category filter, and sort
- `selectFavoriteProducts`: Returns products that are favorited
- `selectIsFavorite`: Checks if a product is favorited

## Testing

The application includes comprehensive test coverage:

### Unit Tests

- **Redux Slices**: Test actions, reducers, and state updates
- **Components**: Test rendering, user interactions, and props

### Integration Tests

- **Search & Filter Flow**: Test search, category filter, and sorting together
- **Favorites Flow**: Test adding, viewing, and removing favorites

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Generate coverage report
pnpm run test:coverage
```

### Test Coverage Goals

- Redux slices: 90%+ coverage
- Components: 80%+ coverage
- Integration tests: Cover main user flows

## Deployment

The application can be deployed to various platforms:

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy!

The `vercel.json` file is already configured.

### Netlify

1. Push your code to GitHub
2. Import the repository in Netlify
3. Set build command: `pnpm run build`
4. Set publish directory: `dist`
5. Deploy!

The `netlify.toml` file is already configured.

### Other Platforms

For other platforms (Render, Railway, etc.), use the standard Vite build process:

```bash
pnpm run build
```

The `dist` folder contains the production-ready files.

## Key Implementation Details

### Debounced Search

The search functionality uses a custom debounce utility (300ms delay) to prevent excessive state updates and filter recalculations while the user is typing.

### Memoized Selectors

Redux Toolkit's `createSelector` is used to create memoized selectors that only recalculate when relevant state changes, improving performance.

### Error Handling

- Global error state in Redux
- User-friendly error messages
- Retry mechanisms for failed API calls

### Performance Optimizations

- Memoized selectors prevent unnecessary recalculations
- Debounced search reduces filter operations
- Lazy loading for images
- Responsive images with proper sizing

## Accessibility

The application follows accessibility best practices:

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states for all interactive elements
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of a frontend developer assignment.

## Author

Frontend Developer Assignment
