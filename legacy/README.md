# Portfolio Website — Magesh Kumar M

This is the source code for my personal portfolio website. The site showcases my professional profile, skills, projects, and credentials, and is deployed on Netlify.

## 🚀 Live Demo

View the live portfolio → [https://mageshportfolio.netlify.app/](https://mageshportfolio.netlify.app/)

## 📋 Prerequisites

Ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually installed with Node.js)
- [Git](https://git-scm.com/) (for version control)

## 🛠 Installation

1. **Clone the repository** (or download the source code)

   ```bash
   git clone <repository-url>
   cd portfolio-MK
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

   This will start the site locally, usually at `http://localhost:3000`.

## 📝 Local Changes & Running Tests

- **Development:** Run `npm run dev` for hot-reloading development server
- **Build:** Run `npm run build` to create production build
- **Test:** Run `npm test` to execute configured tests
- **Lint:** Run `npm run lint` to check for linting errors
- **Preview:** Run `npm run preview` to preview production build locally

## 🔐 Environment Variables (Local)

If the project uses environment variables (e.g., for API keys or external services), create a `.env` file in the project root with the following variables:

```env
EXAMPLE_API_KEY=your_key_here
```

**Note:** Never commit `.env` files to version control.

## 📚 Project Structure (Overview)

- **`/public`**: Static assets (images, fonts, favicon)
- **`/src`**:
  - **`/assets`**: Reusable assets (icons, images)
  - **`/components`**: Reusable React components
  - **`/pages`**: Main page components (Home, About, Projects, etc.)
  - **`/utils`**: Helper functions and constants
  - **`App.js`**: Root component
  - **`index.js`**: Entry point
- **`package.json`**: Project metadata and scripts
- **`README.md`**: Project documentation
