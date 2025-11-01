# 🎬 CineView# CineView



A modern, responsive movie discovery web application built with Angular 20, featuring AI-powered search and personalized watchlists.This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.



![Angular](https://img.shields.io/badge/Angular-20.3.0-red?logo=angular)## Development server

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38bdf8?logo=tailwindcss)To start a local development server, run:

![License](https://img.shields.io/badge/License-MIT-green)

```bash

## ✨ Featuresng serve

```

- 🎥 **Browse Trending Movies** - Discover the latest popular movies from TMDB

- 🔍 **Smart Search** - Search movies by title with real-time resultsOnce the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

- 🤖 **AI Vibe Search** - Use Google Gemini AI to find movies based on mood or description

- 📚 **Personal Watchlist** - Bookmark and manage your favorite movies## Code scaffolding

- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile

- 🎨 **Modern UI** - Custom scrollbars, smooth animations, and teal themeAngular CLI includes powerful code scaffolding tools. To generate a new component, run:

- 🔐 **User Authentication** - Login system with route protection

- ⚡ **Lazy Loading** - Optimized performance with code splitting```bash

ng generate component component-name

## 🚀 Quick Start```



### PrerequisitesFor a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:



Before you begin, ensure you have the following installed:```bash

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)ng generate --help

- [npm](https://www.npmjs.com/) (comes with Node.js)```

- [Angular CLI](https://angular.dev/tools/cli) version 20.3.6

## Building

```bash

npm install -g @angular/cliTo build the project run:

```

```bash

### Installationng build

```

1. **Clone the repository**

   ```bashThis will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

   git clone https://github.com/hussein1574/CineView.git

   cd CineView## Running unit tests

   ```

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

2. **Install dependencies**

   ```bash```bash

   npm installng test

   ``````



3. **Set up environment variables**## Running end-to-end tests

   

   Create your environment file from the example:For end-to-end (e2e) testing, run:

   ```bash

   copy src\app\environments\environment.example.ts src\app\environments\environment.ts```bash

   ```ng e2e

```

4. **Get your API Keys**

   Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

   **TMDB API Key:**

   - Visit [TMDB API](https://www.themoviedb.org/settings/api)## Additional Resources

   - Create a free account

   - Request an API key (v3 auth)For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

   - Copy your API key
   
   **Google Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

5. **Configure your environment**
   
   Open `src/app/environments/environment.ts` and replace the placeholder values:
   ```typescript
   export const environment = {
     production: false,
     tmdbAPIKey: 'paste_your_tmdb_api_key_here',
     tmdbAPIUrl: 'https://api.themoviedb.org/3',
     tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500',
     geminiAPIKey: 'paste_your_gemini_api_key_here',
     geminiAPIUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
   };
   ```

6. **Start the development server**
   ```bash
   npm start
   ```
   
   Navigate to `http://localhost:4200/` in your browser. The app will automatically reload when you make changes.

## 📁 Project Structure

```
CineView/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   ├── guards/              # Route guards (auth, public)
│   │   │   ├── interceptors/        # HTTP interceptors (API keys)
│   │   │   └── services/            # Core services (auth, movies, AI, watchlist)
│   │   ├── features/                # Feature modules
│   │   │   ├── home/                # Home page component
│   │   │   ├── movies/              # Movie details & models
│   │   │   ├── search/              # Search functionality
│   │   │   ├── watchlist/           # User watchlist
│   │   │   └── auth/                # Login/authentication
│   │   ├── layout/                  # Layout components
│   │   │   ├── header/              # Navigation header
│   │   │   └── footer/              # Footer component
│   │   ├── shared/                  # Shared components & utilities
│   │   │   ├── components/          # Reusable components (movie-card)
│   │   │   ├── pipes/               # Custom pipes (minutes-to-hours)
│   │   │   └── models/              # Shared interfaces
│   │   ├── environments/            # Environment configuration
│   │   ├── app.config.ts            # App configuration
│   │   ├── app.routes.ts            # Route definitions
│   │   └── app.ts                   # Root component
│   ├── styles.css                   # Global styles
│   └── index.html                   # HTML entry point
├── angular.json                     # Angular configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
└── tailwind.config.js               # Tailwind CSS configuration
```

## 🛠️ Technologies Used

### Frontend Framework
- **Angular 20.3.0** - Modern web framework with standalone components
- **TypeScript 5.9.2** - Type-safe JavaScript
- **RxJS 7.8.0** - Reactive programming library

### Styling
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Custom CSS** - Gradient scrollbars and animations
- **Responsive Design** - Mobile-first approach

### APIs & Services
- **TMDB API** - Movie database and metadata
- **Google Gemini AI** - AI-powered movie recommendations
- **LocalStorage** - Client-side data persistence

### State Management
- **Angular Signals** - Modern reactive state management
- **Computed Signals** - Derived state computation

### Architecture
- **Standalone Components** - Improved tree-shaking and performance
- **Lazy Loading** - Code splitting for faster initial load
- **Functional Guards** - Route protection with modern syntax
- **HTTP Interceptors** - Automatic API key injection

## 🎯 Key Features Explained

### AI Vibe Search
The app uses Google's Gemini AI to understand natural language queries like:
- "Feel-good movies for a rainy day"
- "Mind-bending sci-fi thrillers"
- "Movies like Inception"

The AI interprets your mood and returns relevant movie suggestions.

### Smart Bookmarking
- Uses signals for reactive state updates
- Persists bookmarks to localStorage
- Instant UI updates without page refresh
- Protected watchlist route (requires login)

### Responsive Navigation
- Mobile-friendly hamburger menu
- Active route highlighting
- Smooth transitions and animations

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on `http://localhost:4200` |
| `npm run build` | Build for production in `dist/` directory |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests with Karma |
| `ng generate component <name>` | Generate a new component |

## 🔒 Security Notes

⚠️ **Important:** Never commit your `environment.ts` file with real API keys!

The `.gitignore` file is configured to exclude:
```
/src/app/environments/environment*.ts
src/app/environments/environment.ts
```

Always use the `environment.example.ts` as a template and keep your real keys local.

## 🚀 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Production environment**
   Create `environment.prod.ts` with production API keys:
   ```typescript
   export const environment = {
     production: true,
     tmdbAPIKey: 'your_production_tmdb_key',
     // ... other config
   };
   ```

3. **Deploy**
   The build artifacts will be in the `dist/` directory. Deploy to:
   - Netlify
   - Vercel
   - Firebase Hosting
   - GitHub Pages
   - Any static hosting service

## 🧪 Testing

Run unit tests:
```bash
npm test
```

The project uses:
- **Jasmine** - Testing framework
- **Karma** - Test runner
- **Chrome Headless** - Browser for testing

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Hussein**
- GitHub: [@hussein1574](https://github.com/hussein1574)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - Movie data and images
- [Google Gemini AI](https://ai.google.dev/) - AI-powered search capabilities
- [Angular Team](https://angular.dev/) - Amazing framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling

## 📧 Support

If you have any questions or issues, please open an issue on GitHub or contact me directly.

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!
