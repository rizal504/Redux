import React, { useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { getMoviePopuler } from "./redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import { setMovieId } from "./redux/reducers/movieReducers";

const SearchFilm = () => {
  const location = useLocation();
  const { searchMovie, searchQuery } = location.state;
  const navigate = useNavigate();

  // Pengujian token harus ada token
  useEffect(() => {
    // console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);

  // Fecth Data Film Populer
  const dispatch = useDispatch();
  const moviePopuler = useSelector((state) =>state.movie.moviePopuler.slice(0, 5));
  // console.log("moviepop", moviePopuler);

  useEffect(() => {
    dispatch(getMoviePopuler());
  }, []);

  return (
    <div className="container mx-auto bg-black">
      <div className="py-20">
        {/* Navbar */}
        <Navbar />
        {/* Judul pencarian */}
        <h1 className="text-center text-3xl font-bold my-5 text-white">
          Search Film : {searchQuery}
        </h1>
        {/* Daftar film hasil pencarian */}

        <div className="grid grid-cols-5 gap-5 py-5 px-5">
          {searchMovie.length > 0 ? (
            searchMovie.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details");
                  dispatch(setMovieId(movie?.id));
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <div className="absolute top-0 right-0 bg-black px-2 py-1 m-2 rounded-lg z-10 text-white bg-opacity-50 ">
                  <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                  {movie.vote_average}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl shadow-md object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-10">
                  <h2 className="text-xs font-bold text-center">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-center">{movie.release_date}</p>
                </div>
              </div>
            ))
          ) : (
            <>
              <p className="text-center col-span-5 py-10 text-xl text-yellow-400">
                Film Tidak Ada
              </p>
              <p className="text-center col-span-5 pb-10 text-xl text-yellow-400">
                Berikut film terpopuler yang cocok untuk anda
              </p>
              {moviePopuler.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    navigate("/movie-details");
                    dispatch(setMovieId(movie?.id));
                  }}
                  className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105"
                >
                  <div className="absolute top-0 right-0 bg-black px-2 py-1 m-2 rounded-lg z-10 text-white bg-opacity-50 ">
                    <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                    {movie.vote_average}
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-xl shadow-md object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-10">
                    <h2 className="text-xs font-bold text-center">
                      {movie.title}
                    </h2>
                    <p className="text-sm text-center">{movie.release_date}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* <Footer> */}
      <div className=" flex justify-center items-center p-5 bg-black">
        <p className=" text-white text-xl font-semibold">
          All rights reserved ©copyright rizal || 2024
        </p>
      </div>
    </div>
  );
};

export default SearchFilm;
