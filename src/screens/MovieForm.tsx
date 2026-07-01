import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMovies, type MovieInput } from '../context/MoviesContext'
import { GENRES } from '../data/movies'
import { ChevronLeftIcon } from '../components/icons'

const DEFAULT_COLORS: [string, string] = ['#3a3a5a', '#0e0e18']

export default function MovieForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getMovie, addMovie, updateMovie } = useMovies()

  const editing = id !== undefined
  const existing = editing ? getMovie(Number(id)) : undefined

  const initial = useMemo(
    () => ({
      title: existing?.title ?? '',
      tagline: existing?.tagline ?? '',
      year: existing?.year ?? new Date().getFullYear(),
      runtime: existing?.runtime ?? 120,
      rating: existing?.rating ?? 7.5,
      genres: existing?.genres ?? [],
      overview: existing?.overview ?? '',
      director: existing?.director ?? '',
      cast: existing?.cast ?? [],
      posterColor: existing?.posterColor ?? DEFAULT_COLORS,
      trending: existing?.trending ?? false,
      featured: existing?.featured ?? false,
    }),
    [existing],
  )

  const [title, setTitle] = useState(initial.title)
  const [tagline, setTagline] = useState(initial.tagline)
  const [year, setYear] = useState(String(initial.year))
  const [runtime, setRuntime] = useState(String(initial.runtime))
  const [rating, setRating] = useState(String(initial.rating))
  const [genres, setGenres] = useState<string[]>(initial.genres)
  const [overview, setOverview] = useState(initial.overview)
  const [director, setDirector] = useState(initial.director)
  const [cast, setCast] = useState(initial.cast.join(', '))
  const [color1, setColor1] = useState(initial.posterColor[0])
  const [color2, setColor2] = useState(initial.posterColor[1])
  const [trending, setTrending] = useState(initial.trending)
  const [featured, setFeatured] = useState(initial.featured)
  const [error, setError] = useState('')

  // Guard against an edit link to a movie that no longer exists.
  if (editing && !existing) {
    return (
      <div className="screen">
        <div className="empty">
          <p className="empty__title">Movie not found</p>
          <button className="btn btn--primary empty__cta" onClick={() => navigate('/')}>
            Go home
          </button>
        </div>
      </div>
    )
  }

  const toggleGenre = (g: string) =>
    setGenres((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]))

  const submit = () => {
    if (!title.trim()) {
      setError('Please enter a title.')
      return
    }
    const input: MovieInput = {
      title: title.trim(),
      tagline: tagline.trim(),
      year: Number(year) || new Date().getFullYear(),
      runtime: Number(runtime) || 0,
      rating: Math.min(10, Math.max(0, Number(rating) || 0)),
      genres: genres.length ? genres : ['Drama'],
      overview: overview.trim(),
      director: director.trim(),
      cast: cast
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      posterColor: [color1, color2],
      trending,
      featured,
    }

    if (editing && existing) {
      updateMovie(existing.id, input)
      navigate(`/movie/${existing.id}`, { replace: true })
    } else {
      const newId = addMovie(input)
      navigate(`/movie/${newId}`, { replace: true })
    }
  }

  return (
    <div className="screen form">
      <header className="form__topbar">
        <button className="iconbtn form__back" onClick={() => navigate(-1)} aria-label="Back">
          <ChevronLeftIcon width={22} height={22} />
        </button>
        <h1 className="form__title">{editing ? 'Edit movie' : 'Add movie'}</h1>
      </header>

      <div className="form__body">
        <label className="field">
          <span className="field__label">Title *</span>
          <input
            className="field__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The Matrix"
          />
        </label>

        <label className="field">
          <span className="field__label">Tagline</span>
          <input
            className="field__input"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="A short catchphrase"
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span className="field__label">Year</span>
            <input
              className="field__input"
              type="number"
              inputMode="numeric"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Runtime (min)</span>
            <input
              className="field__input"
              type="number"
              inputMode="numeric"
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Rating</span>
            <input
              className="field__input"
              type="number"
              inputMode="decimal"
              step="0.1"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
        </div>

        <div className="field">
          <span className="field__label">Genres</span>
          <div className="chips chips--wrap">
            {GENRES.map((g) => (
              <button
                key={g}
                type="button"
                className={`chip ${genres.includes(g) ? 'is-active' : ''}`}
                onClick={() => toggleGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <label className="field">
          <span className="field__label">Director</span>
          <input
            className="field__input"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="e.g. Christopher Nolan"
          />
        </label>

        <label className="field">
          <span className="field__label">Cast (comma separated)</span>
          <input
            className="field__input"
            value={cast}
            onChange={(e) => setCast(e.target.value)}
            placeholder="Actor One, Actor Two, Actor Three"
          />
        </label>

        <label className="field">
          <span className="field__label">Overview</span>
          <textarea
            className="field__input field__textarea"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={4}
            placeholder="What is this movie about?"
          />
        </label>

        <div className="field">
          <span className="field__label">Poster colors</span>
          <div className="colors">
            <label className="color">
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
              <span>Top</span>
            </label>
            <label className="color">
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
              <span>Bottom</span>
            </label>
            <div
              className="color__preview"
              style={{ background: `linear-gradient(150deg, ${color1}, ${color2})` }}
            />
          </div>
        </div>

        <div className="toggles">
          <label className="toggle">
            <input
              type="checkbox"
              checked={trending}
              onChange={(e) => setTrending(e.target.checked)}
            />
            <span>Show in Trending</span>
          </label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span>Feature on home</span>
          </label>
        </div>

        {error && <p className="form__error">{error}</p>}

        <button className="btn btn--primary form__submit" onClick={submit}>
          {editing ? 'Save changes' : 'Add movie'}
        </button>
      </div>
    </div>
  )
}
