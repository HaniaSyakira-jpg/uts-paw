
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'

const AWAL = {
  judul: '',
  kategori: 'Drama',
  sutradara: '',
  tahunRilis: '',
  rating: '',
}

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const simpan = (e) => {
    e.preventDefault()

    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }

    setGalat('')
    tambah({
      ...form,
      judul: form.judul.trim(),
      tahunRilis: Number(form.tahunRilis),
      rating: Number(form.rating),
    })
    navigate('/koleksi')
  }

  return (
    <form onSubmit={simpan} noValidate>
      <h1>Tambah Koleksi</h1>

      <label htmlFor="judul">Judul</label>
      <input
        id="judul"
        name="judul"
        value={form.judul}
        onChange={ubah}
      />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <input
        id="kategori"
        name="kategori"
        value={form.kategori}
        onChange={ubah}
      />

      <label htmlFor="sutradara">Sutradara</label>
      <input
        id="sutradara"
        name="sutradara"
        value={form.sutradara}
        onChange={ubah}
      />

      <label htmlFor="tahunRilis">Tahun Rilis</label>
      <input
        id="tahunRilis"
        name="tahunRilis"
        type="number"
        value={form.tahunRilis}
        onChange={ubah}
      />

      <label htmlFor="rating">Rating</label>
      <input
        id="rating"
        name="rating"
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={form.rating}
        onChange={ubah}
      />

      <button type="submit">Simpan</button>
    </form>
  )
}
