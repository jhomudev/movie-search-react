import { useState, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { error, search, updateSearch } = useSearch()
  const { movies, getMovies } = useMovies({ search, sort })

  function handleSubmit (e) {
    e.preventDefault()
    getMovies({ search })
  }

  function handleSort () {
    setSort(!sort)
  }

  const debounceGetMovies = useCallback(
    debounce((search) => getMovies({ search }), 500),
    [getMovies]
  )

  function handleChange (e) {
    const newSearch = e.target.value
    updateSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit} action='' className='form'>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            name='query'
            type='text'
            placeholder='Write the movie'
          />
          <button type='submit'>Buscar</button>
        </form>
        <p style={{ color: 'red' }}>{error}</p>
      </header>

      <div className='sort'>
        <input type='checkbox' onChange={handleSort} checked={sort} />
        <label htmlFor=''>Ordenar de A-Z</label>
      </div>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
