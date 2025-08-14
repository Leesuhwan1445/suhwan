import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';   
import Moviedetail from './pages/Moviedetail'
import SingUp from './pages/SingUp'
import Login from './pages/Login'
import Layout from './pages/Layout';
import Search from './pages/Search';
import Mypage from './pages/Mypage';
import PrivateRoute from "./routes/PrivateRoute";

function App() {


  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='Search' element={<Search/>}/>
          <Route path="login" element={<Login />} />  
          <Route path="signup" element={<SingUp />} />
          <Route path="moviedetail/:id" element={<Moviedetail />} />
          <Route element={<PrivateRoute />}>
          <Route path="mypage" element={<Mypage/>}/></Route>
      </Route>
      </Routes>
    </Router>
  )
}

export default App



// import React, { useEffect } from 'react'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { useState } from 'react'

// const Home = () => {
// const [movies, setMovies] = useState([]);

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// async function getMovies(){
//   const response = await axios.get (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
//   setMovies(response.data.results); 
// }

// useEffect (() => {
//   getMovies()
// },[])




//   return (
//     <div>
//       <div>
//         <Header></Header>
//       </div>
//     <div className='grid grid-cols-2 md:grid-cols-5 gap-6 p-6 bg-white min-h-screen'>
//       {movies.map((movie) => (
//         <Link to ="./Moviedetail" key={movie.id} className="bg-black rounded p-3">
//           <img
//             src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
//             alt={movie.title}
//             className="w-full h-64 object-cover"
//           />
//           <p className="text-white text-lg font-bold mt-2">{movie.title}</p>
//           <p className='text-white'> 평점 {movie.vote_average}</p>
//         </Link>
//       ))}
//     </div>
//     <Footer></Footer>
//     </div>
//   )
// }

// export default Home