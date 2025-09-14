import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.tsx', 'src/components/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  // CJS -> .js (package is type:commonjs), ESM -> .mjs, matching the
  // package.json exports map.
  fixedExtension: false,
  target: 'es2015',
  deps: { neverBundle: ['react', 'react-dom', 'next'] },
  plugins: [
    {
      name: 'use-client-banner',
      // Mark entry bundles client-only: the components/hooks use React hooks,
      // so this is a client module for Next.js App Router consumers (who then
      // don't need their own "use client" boundary). Scope to ESM entries only
      // (same approach as @hieupth/react-headless-ui).
      renderChunk(code, chunk) {
        if (chunk.isEntry && chunk.fileName.endsWith('.mjs')) {
          return '"use client";\n' + code
        }
      },
    },
  ],
})
