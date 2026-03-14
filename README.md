# Media Tools

Media Tools, published as `Elytools`, is a personal cross-platform toolbox for media and home-lab workflows.

This repository currently contains:

- an Electron desktop application for local utilities such as video encoding, torrent lookup, cache cleanup, and Home Assistant access
- a small ASP.NET Core backend that exposes weather endpoints and a SignalR screen-share hub
- a React frontend that consumes the backend and authentication APIs

Several parts of the project are wired to private infrastructure by default, so expect to adjust endpoints and credentials before using it outside the original environment.

## Repository Layout

```text
.
|-- desktop/    Electron + React + TypeScript application
`-- web/
    |-- back/   ASP.NET Core API and tests
    |-- front/  React web client
    `-- deploy/ Docker-based deployment assets
```

## Desktop App

The desktop app lives in `desktop/` and is the most complete part of the repository.

### What It Does

- encode videos through FFmpeg/FFprobe
- search `nyaa.si` and forward torrents to qBittorrent
- purge `node_modules` folders and build caches
- open a configured Home Assistant instance
- store app settings locally and support OIDC login
- check GitHub releases for app updates

### Tech Stack

- Electron
- React
- TypeScript
- Vite via `electron-vite`
- Material UI
- Redux Toolkit

### Prerequisites

- Node.js
- Yarn Classic
- FFmpeg available to the desktop runtime
- qBittorrent Web UI enabled if you want to use the torrent module

### Install And Run

```bash
cd desktop
yarn install
yarn dev
```

Useful scripts:

- `yarn dev` starts the Electron app in development mode
- `yarn lint` runs ESLint with autofix
- `yarn format` runs Prettier
- `yarn clean` removes release artifacts

### Build And Release

```bash
cd desktop
yarn build
```

The desktop package also includes release scripts:

- `yarn build:release:win`
- `yarn build:release:linux`
- `yarn build:release:linux:container`
- `yarn release`

Notes:

- `yarn build` runs `electron-vite build` and then packages the app with Electron Builder for Windows
- Linux container builds require Docker and `GITHUB_TOKEN`
- release publishing targets GitHub releases for the `Elyspio/media-tools` repository

### Desktop Configuration

On first launch the app creates a local config file under the user app-data folder, typically:

- Windows: `%LOCALAPPDATA%\elytools\config\config.json`
- macOS: `~/Library/Application Support/elytools/config/config.json`

The settings UI exposes these main values:

- Home Assistant URL
- backend API URL
- screen-share hub URL
- qBittorrent API base URL
- OIDC issuer URL, client ID, scopes, and redirect path

The OIDC redirect scheme used by the app is `elytools://...`.

## Web Stack

The web code lives under `web/`.

### Backend

The backend is an ASP.NET Core application in `web/back/`.

#### What It Exposes

- `GET /api/types` for client type generation
- SignalR hub at `/ws/screen-share`
- Swagger UI in development

#### Prerequisites

- .NET SDK 10.0
- MongoDB
- Redis
- `OpenWeatherMap_ApiKey` environment variable

Default local settings in `appsettings.json` point to:

- API on `https://localhost:4000`
- MongoDB on `mongodb://root:root@localhost:6003/...`
- Redis on `localhost:6379`
- authentication service on `http://localhost:4001`

#### Run Locally

```bash
cd web/back
dotnet restore
dotnet run --project Web/Elytools.Api.Web.csproj
```

#### Test

```bash
cd web/back
dotnet test Tests/Elytools.Api.Tests.Weather/Elytools.Api.Tests.Weather.csproj
```

### Frontend

The frontend is a React + Vite application in `web/front/`.

It currently includes:

- authentication flow wiring
- theme switching
- a screen-share viewer backed by the SignalR hub
- generated REST clients for the backend and auth service

#### Prerequisites

- Node.js 20.19+ or 22.12+
- Yarn Classic
- backend running on `http://localhost:4000` or regenerated clients
- authentication service running on `http://localhost:4001`

#### Install And Run

```bash
cd web/front
yarn install
yarn dev
```

Useful scripts:

- `yarn dev` starts the Vite dev server
- `yarn build` builds the frontend
- `yarn preview` serves the production build locally
- `yarn typecheck` runs the TypeScript type checker
- `yarn refresh-clients` regenerates the backend client from the local Swagger document
- `yarn docker` runs the Docker deployment build script

If you regenerate clients, make sure the backend Swagger document is reachable at `http://localhost:4000/swagger/Elytools.Api/swagger.json`. The current script uses HTTP explicitly, so adjust it if your local backend only serves HTTPS.

## Deployment Notes

- `web/deploy/` contains Docker build assets for the web stack
- the current deployment script assumes access to a private SSH target and is not generic out of the box
- the desktop app is configured to publish packaged releases to GitHub

## Quick Start

If you only want the main application:

1. Go to `desktop/`.
2. Run `yarn install`.
3. Run `yarn dev`.
4. Open the settings panel and fill in your own service endpoints.
