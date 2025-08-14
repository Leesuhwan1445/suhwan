import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
const [movies, setMovies] = useState([])
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


//아래 두가지의 방법이 있는데 이 경우에 두가지의 차이점을 잘 생각해서 이용

// useEffect (() => {
//   axios.get (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
//   .then((res) => setMovies(res.data.results))
//   .catch((error) => console.log(error)) 
// },[API_KEY])  


async function getMovies(){
  try{
    const response = await axios.get (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    setMovies(response.data.results); 
  }catch(error){
    console.log(error)
  } 
}

useEffect (() => {
  getMovies()
},[])



  return (
    <div>
    <div className='grid grid-cols-2 md:grid-cols-5 gap-6 p-6 bg-white min-h-screen'>
      {movies.map((movie) => (
        <Link to = {`/Moviedetail/${movie.id}`} key={movie.id} className="bg-black rounded p-3">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="w-full aspect-square object-contain"
            />
          <p className="text-white text-lg font-bold mt-2">{movie.title}</p>
          <p className='text-white'> 평점 {movie.vote_average}</p>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default Home