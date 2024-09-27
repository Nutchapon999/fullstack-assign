# Fullstack Assignment

## Libraries and Dependencies

This project uses the following libraries and dependencies:

### Main Dependencies

* **Next.js**: React framework for building web applications.
* **React**: JavaScript library for building user interfaces.
* **Hono**: Lightweight web framework for building APIs.
* **Drizzle ORM**: TypeScript ORM for SQL databases.
* **Zod**: TypeScript-first schema validation library.
* **React Query**: Data fetching and state management library for React.
* **React Hook Form**: Form handling library for React.
* **Auth.js (NextAuth.js)**: Authentication library for Next.js applications.
* **Tailwind CSS**: Utility-first CSS framework.
* **Jest**: JavaScript testing framework.
* **TypeScript**: Typed superset of JavaScript.
* **Zustand**: Small, fast state management library.
* **Radix UI**: Unstyled, accessible UI components for React.
* **Framer Motion**: Animation library for React.
* **Lucide React**: Icon library for React applications.

### Development Dependencies

* **@babel/preset-env**: Babel preset for compiling JavaScript down to a version compatible with the current environments.
* **@testing-library/** (jest-dom, react, etc.): Utilities for testing React components, focusing on accessibility and user interaction.
* **@types/** (bcryptjs, jest, etc.): TypeScript type definitions for various libraries.
* **babel-jest**: Jest transformer for Babel, allowing for ES6 module syntax.
* **dotenv**: Module to load environment variables from a .env file into process.env.
* **drizzle-kit**: Tooling for Drizzle ORM, likely for migrations and schema generation.
* **eslint**: Linter for identifying and reporting on patterns in JavaScript.
* **eslint-config-next**: ESLint configuration for Next.js projects.
* **postcss**: Tool for transforming CSS with JavaScript plugins.
* **tailwindcss**: Utility-first CSS framework for designing websites.
* **ts-jest**: TypeScript preprocessor for Jest, enabling TypeScript support in tests.
* **ts-node**: TypeScript execution environment for Node.js.
* **typescript**: Superset of JavaScript that adds static types, enhancing code quality and maintainability.

## Getting Started

To set up the development environment, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```
   npm install or bun install 
   ```
3. Start the development server:
   ```
   npm run dev or bun ren dev
   ```

### Available Scripts

- `npm run dev`: Starts the development server using Next.js
- `npm run build`: Builds the application for production
- `npm start`: Runs the built application in production mode
- `npm run lint`: Runs the linter to check for code quality issues
- `npm test`: Runs the Jest test suite

### Database Management

- `npm run db:generate`: Generates database migrations using Drizzle Kit
- `npm run db:migrate`: Applies database migrations
- `npm run db:studio`: Launches Drizzle Kit Studio for database management

