# netwrap workspace

Monorepo for the `netwrap` package and test apps.

## Structure

- `packages/netwrap`: the library package
- `apps/web`: Next.js test app
- `apps/api`: Node.js test app
- `apps/mobile`: React Native CLI test app

## Quick start

```bash
yarn install
```

```bash
yarn workspace netwrap build
```

## App commands

```bash
yarn workspace web dev
```

```bash
node apps/api/index.js
```

```bash
yarn workspace MobileApp start
```

## Package docs

See `packages/netwrap/README.md`.
