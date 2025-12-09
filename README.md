# Toy Shelf

A panorama scheme and 3D toy showcase platform built with SvelteKit, deployed on Azure Static Web Apps.

## Features

- 🎨 3D model display (supports Gaussian Splatting and panoramas)
- 🖼️ Panorama photo view
- 📱 Responsive design
- ⚡ Fast loading and smooth animations

## Tech Stack

- **Framework**: SvelteKit 2
- **3D Rendering**: Three.js, PlayCanvas
- **Styling**: Tailwind CSS 4
- **Internationalization**: Paraglide JS
- **Deployment**: Azure Static Web Apps
- **CI/CD**: GitHub Actions

## Local Development

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview Build

```bash
pnpm preview
```

## Deploy to Azure

For detailed deployment instructions, see [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md)

## Project Structure

```
toy-shelf/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components
│   │   ├── stores/         # State management
│   │   └── paraglide/      # Internationalization files
│   └── routes/             # Page routes
├── static/                 # Static assets
├── messages/               # Translation files
└── staticwebapp.config.json # Azure configuration
```

## License

MIT
