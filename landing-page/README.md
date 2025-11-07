# ModernLand - React Landing Page

A modern, responsive landing page built with React, Vite, and Tailwind CSS v4.

## 🚀 Features

- **React 19** with latest stable version
- **Vite** for fast development and building
- **Tailwind CSS v4** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router DOM v7** for client-side routing
- **Lucide React** and **React Icons** for iconography
- **ESLint** with React and hooks plugins
- **TypeScript support** with type definitions
- **ES6 modules** configuration

## 🛠️ Tech Stack

- **Frontend**: React 19, JSX
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4, PostCSS, Autoprefixer
- **Animation**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Routing**: React Router DOM v7
- **Linting**: ESLint with React plugins
- **Package Manager**: npm

## 📦 Installation

1. Clone or navigate to the project directory:
   ```bash
   cd landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Project Structure

```
landing-page/
├── public/
├── src/
│   ├── App.jsx          # Main landing page component
│   ├── main.jsx         # App entry point with router
│   └── index.css        # Tailwind CSS imports
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── eslint.config.js     # ESLint configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🎯 Landing Page Sections

- **Header**: Navigation with logo and menu items
- **Hero**: Main call-to-action with gradient text and buttons
- **Features**: Three-column feature showcase with icons
- **Pricing**: Two-tier pricing plans with feature lists
- **Footer**: Company info and links

## 🎨 Styling Approach

- **Pure Tailwind CSS**: No custom CSS files, only utility classes
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Modern Gradients**: Beautiful gradient backgrounds and text effects
- **Smooth Animations**: Framer Motion for entrance and scroll animations

## 🔧 Configuration

The project uses ES6 modules (`"type": "module"`) and includes:

- Tailwind CSS v4 with PostCSS plugin
- ESLint with React, hooks, and refresh plugins
- React Router DOM for potential routing needs
- TypeScript type definitions for better development experience

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📝 License

This project is open source and available under the MIT License.
