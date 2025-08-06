# 🧩 Assignment React + Vite - Frontend API Integration

Repositori ini berisi source code aplikasi **Frontend** menggunakan **React.js + Vite**, dengan integrasi ke API publik dari [Reqres.in](https://reqres.in). Aplikasi ini dikembangkan sebagai bagian dari tugas Milestone pada Bootcamp Front End Web Development.

---

## ✅ Fitur yang Diimplementasikan

### 🔐 Autentikasi

- ✅ **Register (Successful)** – Mendaftarkan user baru dan menyimpan token ke `localStorage`.
- ✅ **Register (Unsuccessful)** – Validasi error saat input kosong.
- ✅ **Login (Successful)** – Login dan menyimpan token.
- ✅ **Login (Unsuccessful)** – Menampilkan error ketika kredensial salah.

### 👤 Manajemen User

- ✅ **List Users** – Menampilkan daftar pengguna dari API Reqres.
- ✅ **User Detail** – Menampilkan data lengkap user berdasarkan ID.
- ✅ **Pagination** – Navigasi halaman menggunakan tombol Prev dan Next.

### 🔒 Protected Route

- ✅ Halaman tertentu hanya bisa diakses setelah login.
- ✅ Redirect otomatis ke login jika token tidak ditemukan.

### 🧪 Unit Testing (Jest + React Testing Library)

- ✅ Setup dan konfigurasi testing dengan `npm run test`
- ✅ Menulis unit test di hampir semua file halaman & komponen
- ✅ Cakupan test meliputi:
  - Komponen UI (`Navbar`, `UserCard`, `HomeCard`, dll)
  - Halaman (`LoginPage`, `RegisterPage`, `UserDetailPage`, dll)
  - Modal (`EmailInfoModal`)
  - Routing dan navigasi

---

## 🧪 Teknologi dan Tools

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/)

---

## 📁 Struktur Folder

```bash
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                    # Gambar dan aset statis
│   ├── components/
│   │   ├── EmailInfoModal.jsx
│   │   ├── EmailInfoModal.test.jsx
│   │   ├── HomeCard.jsx
│   │   ├── HomeCard.test.jsx
│   │   ├── Navbar.jsx
│   │   ├── Navbar.test.jsx
│   │   ├── UserCard.jsx
│   │   └── UserCard.test.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.test.jsx
│   │   ├── LoginPage.jsx
│   │   ├── LoginPage.test.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── RegisterPage.test.jsx
│   │   ├── UserDetailPage.jsx
│   │   ├── UserDetailPage.test.jsx
│   │   └── routes/
│   │       └── ProtectedRoute.jsx
│   ├── services/
│   │   └── Api.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🧪 Unit Test & Code Coverage

### 📌 Menjalankan Test

```bash
npm run test
```

### 📁 Folder `coverage/`

Setelah test dijalankan, akan muncul folder `coverage/` otomatis. Di dalamnya terdapat file HTML yang bisa dibuka untuk melihat hasil cakupan testing secara visual.

### 📈 Contoh Ringkasan Coverage (Target Lulus > 70%)

```
Statements   : 92.02%
Branches     : 94.18%
Functions    : 75.86%
Lines        : 92.85%
```

### ✅ Semua Test Lulus

```bash
Test Suites: 8 passed, 8 total
Tests:       47 passed, 47 total
```

---

## 🚀 Cara Menjalankan Project

1. Clone repositori:

```bash
git clone https://github.com/nikkuananda/test_EC
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan project:

```bash
npm run dev
```

---

## 👨‍💻 Author

- Nama: **Nikku Ananda Mukti**

---

## 📬 Lisensi

Lisensi bebas digunakan untuk pembelajaran dan pengembangan pribadi.
