# Admin & Teacher Permission Management

## Overview

Sistem ini diperbarui untuk memungkinkan admin melihat (view-only) halaman Admin & Teacher tanpa kemampuan untuk mengedit, sementara Super Admin memiliki akses penuh (view dan edit).

## Fitur yang Diimplementasikan

1. **Struktur Menu dan Permission**

   - Menambahkan atribut `permission` dan `roles` pada interface `MenuItem` dan `SubMenuItem` di `sidebaradmin-data.ts`
   - Menu "Admin & Teacher" sekarang menggunakan permission "view" untuk user dengan role Admin
   - Menu tetap muncul di sidebar untuk kedua peran (Admin dan Super Admin)

2. **Halaman Admin & Teacher dengan Mode View-Only**
   - Halaman mendeteksi role pengguna melalui localStorage
   - Admin melihat notifikasi "Mode Hanya Lihat" dan tombol Edit/Delete diganti dengan tombol View
   - Super Admin melihat semua fungsionalitas penuh termasuk kemampuan Edit/Delete
3. **AdminSidebar Component**
   - Diperbarui untuk memfilter menu berdasarkan peran pengguna
   - Menambahkan indikator "view-only" pada menu yang memiliki permission terbatas
   - Menampilkan badge "SUPER ADMIN" untuk pengguna dengan peran tersebut

## Cara Kerja

1. Saat pengguna login, peran mereka disimpan di localStorage (dan cookie)
2. AdminSidebar membaca peran dari localStorage dan menyesuaikan tampilan menu
3. Halaman Admin & Teacher membaca peran dari localStorage dan menyesuaikan UI:
   - Admin: tombol "Tambah Pengguna" disembunyikan, diganti notifikasi "Mode Hanya Lihat"
   - Admin: tombol Edit/Delete diganti dengan tombol View
   - Super Admin: akses penuh ke semua fitur

## Keuntungan Implementasi

1. **Keamanan**: Admin hanya bisa melihat data Admin & Guru tanpa kemampuan mengubah
2. **UX yang Jelas**: Indikator visual yang jelas menunjukkan mode view-only
3. **Fleksibilitas**: Struktur permission dapat dikembangkan lebih lanjut untuk menu lain
4. **Konsistensi**: Pendekatan yang sama dapat diterapkan ke seluruh aplikasi
