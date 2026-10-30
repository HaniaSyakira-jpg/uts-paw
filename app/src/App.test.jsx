import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test, beforeEach, vi } from 'vitest'
import App from './App.jsx'

const dataFilm = [
  {
    id: '1',
    judul: 'Agak Laen',
    kategori: 'Komedi',
    sutradara: 'Muhadkly Acho',
    tahunRilis: 2024,
    rating: 8,
  },
  {
    id: '2',
    judul: 'Jumbo',
    kategori: 'Animasi',
    sutradara: 'Ryan Adriandhy',
    tahunRilis: 2025,
    rating: 8.5,
  },
]

beforeEach(() => {
  localStorage.clear()

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => dataFilm,
    }),
  )
})

// Contoh test. Tambahkan minimal 5 test buatan sendiri (butir rubrik F1).
test('rute tidak dikenal menampilkan 404', () => {
  render(
    <MemoryRouter initialEntries={['/tidak-ada']}>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

test('beranda menampilkan judul utama', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )
  expect(
  screen.getByRole('heading', { name: 'Daftar Tugas' }),
).toBeInTheDocument()
})

test('koleksi menampilkan data film', async () => {
  render(
    <MemoryRouter initialEntries={['/koleksi']}>
      <App />
    </MemoryRouter>,
  )

  expect(
    await screen.findByRole('heading', { name: 'Koleksi' }),
  ).toBeInTheDocument()

  expect(
    await screen.findByText('Agak Laen'),
  ).toBeInTheDocument()
})

test('pencarian menyaring daftar film', async () => {
  render(
    <MemoryRouter initialEntries={['/koleksi']}>
      <App />
    </MemoryRouter>,
  )

  const input = await screen.findByLabelText('Cari judul')

  fireEvent.change(input, {
    target: { value: 'Agak Laen' },
  })

  expect(
    screen.getByText('Agak Laen'),
  ).toBeInTheDocument()

  expect(
  screen.queryByText('Tidak ada item yang cocok.'),
).not.toBeInTheDocument()
})

test('form menolak judul film kosong', () => {
  render(
    <MemoryRouter initialEntries={['/tambah']}>
      <App />
    </MemoryRouter>,
  )

  fireEvent.click(
    screen.getByRole('button', { name: 'Simpan' }),
  )

  expect(
    screen.getByRole('alert'),
  ).toHaveTextContent('Judul wajib diisi, minimal 3 karakter.')
})
