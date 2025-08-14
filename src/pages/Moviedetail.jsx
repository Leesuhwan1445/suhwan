import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

const Moviedetail = () => {

const [movie, setMovie] = useState(null)
const navigate = useNavigate();
const {id} = useParams()
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

useEffect (() => {
  async function fetchMovieDetail() {
    try {
      const response = await axios.get (`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`)
      setMovie(response.data)
    }
    catch{
      return navigate('/')
    }
  }
  fetchMovieDetail()
},[id])


  return (
  <div>
  <div className="flex gap-10 p-10 bg-white min-h-screen">
  <img src={`http://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt="" className="w-2/3 h-[600px] rounded-3xl" key={id}/>

  <div className="flex flex-col justify-start">
    <p>{movie?.title}</p>
    <p> {movie?.genres?.map((genre) => (<span key={genre.id} className="mr-2">{genre.name}</span>))} </p> 
    <p>{movie?.vote_average}</p>
    <p>평점 : {movie?.overview}</p>
  </div>

  </div>
    </div>
  )
}

//map 부분 다시 공부,복습

export default Moviedetail