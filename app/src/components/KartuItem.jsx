
import { Link } from 'react-router-dom'

export default function KartuItem({ item }) {
  const { id, judul, kategori, sutradara, tahunRilis, rating } = item

  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>Kategori: {kategori}</p>
      <p>Sutradara: {sutradara}</p>
      <p>Tahun rilis: {tahunRilis}</p>
      <p>Rating: {rating}</p>
    </article>
  )
}
