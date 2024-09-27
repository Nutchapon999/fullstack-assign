# Fullstack Assignment

## 📄 Environment Variables

This project uses environment variables for configuration. Create a `.env.local` file in the root directory of the project and add the following variables:

```
NEXT_PUBLIC_APP_URL="http://localhost:3000"

DATABASE_URL=your_database_connection_string
AUTH_SECRET=your_auth_secret
```

### Variable Descriptions:

- `NEXT_PUBLIC_APP_URL`: The public URL of your application. Used for client-side references.
- `DATABASE_URL`: The connection string for your PostgreSQL database. This example uses a Neon database.
- `AUTH_SECRET`: A secret key used for authentication. This was added by `npx auth`. For more information, visit: https://cli.authjs.dev

## 📦 Libraries and Dependencies

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

## 🚀 Getting Started

To set up the development environment, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```
   bun install 
   ```
3. Start the development server:
   ```
   bun run dev
   ```
4. Create auth secret
   ```
   bunx auth secret
   ```
   
### Available Scripts

- `bun run dev`: Starts the development server using Next.js
- `bun run build`: Builds the application for production
- `bun run start`: Runs the built application in production mode
- `bun run lint`: Runs the linter to check for code quality issues
- `bun run test`: Runs the Jest test suite

### Database Management

- `bun run db:generate`: Generates database migrations using Drizzle Kit
- `bun run db:migrate`: Applies database migrations
- `bun run db:studio`: Launches Drizzle Kit Studio for database management

## 🧪 Test Unit

1. Create file name ```babel.config.json```
2. In file will be
   ```
   {
     "presets": ["@babel/preset-env"]
   }
   ```
3. Uncomment in ``` @/db/dizzle.ts ```
   config({ path: ".env.local" });

   ```
   config({ path: ".env.local" });
   
   if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set.");
   }
   ```
4. Start the unit test:
   ```
   bun run test
   ```
   
* Swap to Development Mode (Do Opposite)
  
## 📊 Architecture and Diagram

### Architecture
![Architecture](/public/architecture.png)

### Diagram
![Diagram](/public/diagram.png)


