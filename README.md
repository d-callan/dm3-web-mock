# Datamonkey Web Client

Datamonkey is a free public web application for comparative analysis of sequence alignments using state-of-the-art statistical models. This SvelteKit-based frontend provides a modern, responsive interface for running HyPhy methods, managing analyses, and visualizing results. It connects to the Datamonkey API to perform complex phylogenetic analyses in the cloud or locally via WebAssembly.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Project Structure

```
├── scripts/                # Build and utility scripts
├── src/
│   ├── app.css            # Global CSS
│   ├── app.html           # HTML template
│   ├── lib/               # Shared components and utilities
│   │   ├── api/           # Generated API client code
│   │   ├── components/    # Reusable UI components
│   │   ├── data/          # Generated and static data files
│   │   ├── model/         # Generated TypeScript interfaces
│   │   └── stores/        # Svelte stores for state management
│   ├── routes/            # SvelteKit routes (pages)
│   └── styles/            # CSS styles and design system
└── static/                # Static assets (images, fonts, etc.)
```

## Generated Files and API Integration

This project uses OpenAPI to generate TypeScript interfaces and API clients from the Datamonkey API specification. The following scripts automate this process:

### API and Model Generation

```bash
# Fetch the latest OpenAPI spec and generate TypeScript files
npm run update-generated-types
```

This command performs the following steps:
1. Downloads the latest OpenAPI spec from the Datamonkey API repository
2. Generates TypeScript interfaces and API client code
3. Moves the generated files to the appropriate directories
4. Generates method data files for the frontend

### Method Data Generation

The application automatically generates two important data files from the API models:

- `src/lib/data/methods.ts` - Contains information about available HyPhy methods
- `src/lib/data/methodParameters.ts` - Contains parameter definitions for each method

To regenerate these files manually:

```bash
npm run generate-method-data
```

### Adding New Methods

When adding a new HyPhy method to the application:

1. Update the OpenAPI spec to include the new method and its parameters
2. Run `npm run update-generated-types` to regenerate all files
3. If needed, add the method to the name mapping in `scripts/generate-method-data.js`:
   ```javascript
   const methodNameMapping = {
     // existing methods...
     'newmethod': 'NewMethod', // Add your new method here with proper formatting
   };
   ```
4. Add a description for the method:
   ```javascript
   const methodDescriptions = {
     // existing descriptions...
     'newmethod': 'Description of what the new method does',
   };
   ```

The script will automatically extract parameters from the generated interface files.
