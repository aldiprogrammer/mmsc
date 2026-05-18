# MMSC — Futsal Court Booking System

## Stack

- **Backend:** Laravel 13 (PHP 8.3+), SQLite default / MySQL / MariaDB / PostgreSQL
- **Frontend:** Inertia.js v2 SPA, React 18, Tailwind CSS 3 + DaisyUI (CDN-loaded), Vite 8
- **Auth:** Laravel Breeze (Sanctum), scaffolded auth routes/views
- **Queue/Cache/Session:** all default to database driver

## Commands

```bash
# Full setup (CI / fresh start)
composer setup

# Dev server (concurrent: artisan serve + queue:listen + logs + Vite HMR)
composer dev

# Run tests (clears config first)
composer test

# Lint JS only
npm run lint

# Build assets
npm run build

# Single PHPUnit test
php artisan test --filter=TestName
vendor/bin/phpunit tests/Unit/ExampleTest.php
```

## Architecture

| Directory | Purpose |
|---|---|
| `app/Http/Controllers/app/` | Public booking flow controllers |
| `app/Http/Controllers/admin/` | Admin controllers (HomeController, LapanganController — minimal) |
| `resources/js/Pages/App/` | Inertia page components for the booking app |
| `resources/js/Pages/Auth/` | Breeze auth pages |
| `resources/js/Layouts/` | GuestLayout, AuthenticatedLayout, AppLayout (empty) |
| `routes/web.php` | All booking routes + auth include |
| `resources/views/app.blade.php` | Root Blade view (loads DaisyUI, FontAwesome, SweetAlert2, Leaflet, DataTables, jQuery via CDN — NOT npm) |

## Non-obvious facts

- **Root view** is `app.blade.php` (not the Laravel default `layouts/app.blade.php`) — defined in `HandleInertiaRequests.php:15`.
- **DaisyUI, FontAwesome, SweetAlert2, Leaflet, DataTables, jQuery** are loaded via CDN in `app.blade.php`, not npm.
- **`bootstrap.js` is commented out** in `resources/js/app.jsx` — no Axios base config or Echo setup.
- **Models use custom table names** with `tbl_` prefix (`tbl_lapangan`, `tbl_booking`, `tbl_pembayaranbooking`, `tbl_jambooking_lapangan`). Migration creates `lapangans` (no prefix).
- **Many models disable timestamps** (`public $timestamps = false`).
- **`composer dev`** uses `npx concurrently` to run 4 processes: server, queue, logs (pail), Vite HMR.
- **`composer test`** runs `php artisan config:clear` before `php artisan test`.
- **PHPUnit** uses SQLite `:memory:` — no external DB needed for tests.
- **Vite entrypoint** is `resources/js/app.jsx`, resolves pages from `./Pages/**/*.jsx`.
- **ESLint** only checks `resources/js --ext .js,.jsx`.
- **Prettier** has plugins for organize-imports and tailwindcss class sorting.
- **No typechecking** configured.

## Routes overview

- `/booking` — list lapangan → `/booking/{id}` — detail page → `/jammain/{id}` — select time → `/pembayaran/{idlap}/{tgl}` — payment → `/sukses` — success
- `/databooking` — view bookings by date
- `/layanan/{tgl}` — service/extra items page
- `/jambookinglayanan/{ids}` — lookup booked slots via AJAX
- JSON endpoints: `/getjammain`, `/jambooking/{idlap}/{tanggal}`, `/bola`, `/rompi`, `/fotograper`, `/wasit`
