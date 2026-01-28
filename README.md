# Technical Test Nashta

## Deskripsi

Project ini adalah implementasi tugas teknikal backend untuk manajemen data mahasiswa, mata kuliah, dan nilai.  
Proyek dibangun menggunakan **Node.js**, **Express**, dan **Sequelize** dengan **clean architecture**.

Fitur utama:

- CUD endpoint untuk tabel `Mahasiswa`.
- GET endpoint untuk menampilkan nama mahasiswa dan nilai rata-rata.
- Validasi input dan penanganan error.
- Seeder untuk mengisi data awal database.

---

## Menjalankan Project

1. Install dependencies:

   ```
   npm install
   ```

2. Seed Database (opsional, untuk mengisi data awal):

   ```
   npm run seed
   ```

3. Jalankan server:

   ```
   npm run dev
   ```

Server berjalan di:
http://localhost:8080
