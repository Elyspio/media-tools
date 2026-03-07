# Elytools

Elytools is a cross-platform desktop utility built with Electron + React + TypeScript.

It combines media-focused tools (video encoding and torrent workflow) with desktop integrations (auto-update, system info, custom window controls, local config, and typed IPC).

## Current Features

- **Encoder**: video conversion/probing pipeline powered by ffmpeg IPC modules.
- **Torrent**:
	- search on `nyaa.si` from the app,
	- send torrents to qBittorrent through an OAuth2-protected endpoint.
- **OIDC login flow in-app**:
	- opens a dedicated BrowserWindow,
	- handles callback via app custom protocol (`elytools://...`),
	- stores refresh token encrypted with Electron Safe Storage.
- **Settings UI**:
	- full editable local app config (`version: 2`),
	- endpoint and OIDC parameters,
	- frame/appboard/window position settings.
- **Desktop app plumbing**: typed preload bridge, strict IPC contracts, logger, and updater integration.

## Tech Stack

- **Desktop runtime**: Electron 40
- **Bundling**: electron-vite + Vite
- **Frontend**: React 19, MUI 7, Redux Toolkit
- **Dependency injection**: Inversify
- **Main-process modules**: TypeScript classes + IPC handlers
- **Media/system**: ffmpeg/ffprobe, systeminformation

## Project Structure

```text
src/
	main/       # Electron main process modules (window, ipc, auth, torrent, config...)
	preload/    # Typed preload API exposed to renderer
	renderer/   # React UI + Redux store + services
	shared/     # Shared types, IPC contracts, config schema
config/
	electron.vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 20+
- yarn

### Install

```bash
yarn install
```

### Run in development

```bash
yarn run dev
```

### Build app

```bash
yarn run build
```

### Preview built app

```bash
yarn run start
```

## Useful Scripts

- `yarn run dev` — run Electron app in dev mode
- `yarn run build` — build app
- `yarn run start` — preview built app
- `yarn run lint` — lint and auto-fix (project-wide)
- `yarn run format` — run Prettier
- `yarn run typecheck` — watch mode TS checks

## Configuration

Local config is stored in the app data folder under:

- `config/config.json` (plain JSON settings)
- `config/secrets.json` (encrypted secret payloads)

Current schema is **`version: 2`** and includes:

- `windows.position`
- `appboard.show`
- `frame.show` / `frame.resize`
- `endpoints.homeAssistant`
- `endpoints.api`
- `endpoints.hubs.screenshare`
- `endpoints.qbittorrent.apiBaseUrl`
- `endpoints.oidc.{issuerUrl, clientId, scopes, redirectPath}`

## OIDC + Torrent Flow

1. User opens Settings and enters OIDC + qBittorrent endpoint settings.
2. User clicks **Login**.
3. Main process opens a modal BrowserWindow and starts OIDC Authorization Code + PKCE.
4. Provider redirects to `elytools://auth/callback`.
5. App handles callback, exchanges code for tokens, and securely stores refresh token.
6. Torrent send action calls main IPC, obtains/refreshes access token, and posts torrent to qBittorrent API.

## IPC Architecture (High Level)

- Contracts live in `src/shared/ipc/*`.
- Main handlers are registered in `src/main/ipc/ipc.handler.ts`.
- Preload exposes typed sender/receiver wrappers.
- Renderer never calls privileged Node/Electron APIs directly.

## Notes

- Legacy references in old docs/modules may still exist; this README describes the **current active flow**.
- If lint reports many errors, validate local changes with targeted diagnostics and TypeScript checks first.
