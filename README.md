<a href="https://gitmoji.dev">
  <img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"
  />
</a>

## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ pnpm install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `pnpm dev` or `pnpm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `pnpm build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Dependencies

| Package | Description | Version |
| --- | --- | --- |
| [`solid-supabase`](node_modules\solid-supabase\README.md) | A simple wrapper around Supabase.js to enable usage within Solid. | `solid-supabase^0.5.0` |
| [`solid-toast`](node_modules\solid-toast\README.md) | Create beautiful, customizable toasts in SolidJS. | `solid-toast^0.5.0` |
| [`uuid`](node_modules\uuid\README.md) | For the creation of RFC9562 UUIDs | `uuid^11.1.0` |
