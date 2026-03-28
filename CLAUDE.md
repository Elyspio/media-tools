# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Elytools** — a cross-platform media toolbox with a desktop Electron app and a web stack (ASP.NET Core API + React frontend). Some features depend on private infrastructure; endpoints/credentials are configurable in settings.

## Repository Layout

- `desktop/` — Electron + React + TypeScript app (primary component)
- `web/back/` — ASP.NET Core API + SignalR (.NET 10, MongoDB, Redis)
- `web/front/` — React + Vite web client
- `web/deploy/` — Docker build/deploy assets

## Commands

### Desktop (`cd desktop`)

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev mode | `pnpm dev` |
| Build + package | `pnpm build` (runs typecheck → electron-vite build → electron-builder) |
| Preview built app | `pnpm start` |
| Lint (fix) | `pnpm lint` |
| Format | `pnpm format` |
| Typecheck (watch) | `pnpm typecheck` |
| Release (Win+Linux) | `pnpm release` |

Package manager: **pnpm 10.32.1**. Vite config at `config/electron.vite.config.ts`, builder config at `config/electron-builder.yml`.

### Web Backend (`cd web/back`)

| Task | Command |
|------|---------|
| Build | `dotnet build` |
| Test | `dotnet test` |
| Run | `dotnet run --project Web/Elytools.Api.Web.csproj` |

### Web Frontend (`cd web/front`)

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` (port 3000) |
| Build | `pnpm build` |
| Regenerate API clients | `pnpm refresh-clients` |

## Architecture

### Desktop — Three-Process Electron Model

- **Main process** (`src/main/`): Node.js, modules extending `LogModule` for Winston logging, Inversify DI with `autobind: true` (`src/main/di/container.di.ts`).
- **Preload** (`src/preload/`): Exposes typed `window.preload.ipc` bridge via contextBridge.
- **Renderer** (`src/renderer/`): React 19, MUI 7, Redux Toolkit, Inversify for services.
- **Shared types** (`src/shared/`): IPC channel contracts, config defaults, TypeScript interfaces.

### IPC Contract

Typed channels in `src/shared/ipc/ipc.handled.events.ts` (renderer→main) and `ipc.sent.events.ts` (main→renderer). Handlers registered centrally in `src/main/ipc/ipc.handler.ts`. When adding IPC channels, define types in shared, register handler in `ipc.handler.ts`, and expose via preload.

### Desktop Module Pattern

Main-process logic lives in modules extending `LogModule`. Use constructor DI (Inversify `@injectable()`) over singletons. The `@log` / `@log.debug` decorators (`src/main/utils/logs.utils.ts`) emit enter/exit timing automatically.

### Desktop Config

Cached JSON at `%LOCALAPPDATA%/elytools/config/` (Linux: `~/.config/elytools/config/`). Defaults in `src/shared/config/app.config.ts` with migration support. Secrets use Electron Safe Storage.

### TypeScript Path Aliases (Desktop)

`@/*` → renderer src, `@main/*` → main process, `@preload/*` → preload, `@shared/*` → shared types. Also `@components/*`, `@services/*`, `@apis/*`.

### Web Backend — Modular .NET

Solution `Elytools.Api.sln` with projects: Abstractions, Core, Adapters, Web, Sockets, Tests. DI uses custom `AddModule<T>()` pattern in `Web/Server/Builder.cs`. SignalR hub at `/ws/screen-share`.

### Web Frontend

React 19 + Vite + Inversify DI. API clients auto-generated from NSwag (`pnpm refresh-clients`). Production base path: `/elytools-api/`.

## Key Conventions

- Extend DI modules instead of creating ad-hoc singletons
- Keep renderer/main shared types under `desktop/src/shared`
- FFmpeg features require `ffmpeg`/`ffprobe` on PATH (no bundled binary)
- Desktop uses TypeScript decorators (`experimentalDecorators`, `emitDecoratorMetadata`)
- ESLint config: `@elyspio/vite-eslint-config`; Prettier: `@elyspio` shared config
