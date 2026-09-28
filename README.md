# Muhammad Hassaan Masood | Research Portfolio (https://personal-portfolio-sepia-sigma-86.vercel.app/)

A premium research-oriented personal portfolio built with Vite, React, and Tailwind CSS for showcasing machine learning, computer vision, video understanding, multimodal AI, and scientific ML work.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Features

- Research-first dark premium design
- Sticky responsive navigation
- Hero section with identity-focused positioning
- Research map and trajectory sections
- Featured project cards with filtering and modal exploration
- Achievement and certificate galleries
- Experience timeline and skill group layout
- Contact section with email and phone information
- Fully static frontend suitable for deployment on Vercel

## Project Structure

```bash
src/
  App.jsx
  main.jsx
  index.css
  data/
    achievements.js
    experience.js
    projects.js
    research.js
    skills.js
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local preview in the browser:

```bash
http://localhost:5173/
```

## Build for Production

```bash
npm run build
```

The production build output will be generated in the `dist/` folder.

## Deployment on Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Use the default Vite settings.
4. Deploy.

This project is a static frontend, so no backend or database setup is required.

## Content Customization

Most portfolio content is stored in the data files under `src/data/`:

- `projects.js` — project list, filters, and metadata
- `experience.js` — timeline entries
- `achievements.js` — certificates and recognition cards
- `skills.js` — grouped skills and research areas
- `research.js` — research focus and trajectory content

## Image Assets

Certificates and profile images are stored in the `images/` folder.

For example:

- `images/Photo.png`
- `images/iaac.jpg`
- `images/openscience.jpg`
- `images/OpenScience_certificate.pdf`
- `images/FypExpo.jpg`
- `images/indusai.png`

## Notes

- External profile links are hardcoded in the UI.
- The site is designed to remain accurate and avoid invented academic or project claims.
- Project and achievements data can be updated easily by editing the corresponding JS files in `src/data/`.

## License

This project is intended for personal portfolio use.
