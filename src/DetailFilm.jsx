import React, { useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { getDetailMovie } from "./redux/actions/movieActions";
// import Safe from "react-safe";

const DetailFilm = () => {
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state?.movie?.detailMovie);
  const id = useSelector((state) => state?.movie?.movieId);

  useEffect(() => {
    dispatch(getDetailMovie(id));
  }, []);

  useEffect(() => {
    if (detailMovie) {
      // Set Disqus configuration
      window.disqus_config = function () {
        this.page.identifier = id; // Menggunakan ID film sebagai identifier Disqus
        // console.log("id", id);
      };

      // Load Disqus comments
      const script = document.createElement("script"); //membuat blok element untuk memuat komentar Disqus.
      script.src = "https://filmapk.disqus.com/embed.js"; // ambil fungsi yg diperlukan di web dan kirim data
      script.setAttribute("data-timestamp", +new Date()); // buat set waktu sekarang
      document.head.appendChild(script); // memuat elemen baru yg nantinya akan di render ke web
    }
  }, []);

  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-800 bg-blend-multiply h-[720px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detailMovie?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-28 px-10 gap-10 items-center backdrop-blur-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${detailMovie?.poster_path}`}
            alt={detailMovie?.title}
            className="h-[500px]  rounded-lg"
          />
          <div className="text-white font-sans " key={detailMovie?.id}>
            <div className="p-4">
              <h2 className="text-4xl font-semibold mb-2 font-arial">
                {detailMovie?.title}
              </h2>
              <p className="text-lg">
                <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                {parseFloat(detailMovie?.vote_average).toFixed(1)}/ 10
              </p>
              <p className="text-lg mb-2 border-b-2 pb-3 text-justify">
                {detailMovie?.overview}
              </p>
              <p className="text-lg">
                Release Date : {detailMovie?.release_date}
              </p>

              <p className="text-lg">Votes : {detailMovie?.vote_count}</p>
              <p className="text-lg">
                Budget :{" "}
                {detailMovie?.budget
                  ? `${detailMovie?.budget.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg">
                Runtime : {detailMovie?.runtime} Minutes
              </p>
              <br />
              <p className="text-lg font-bold ">Genres :</p>
              <div className="flex gap-5">
                {detailMovie?.genres?.map((genre) => (
                  <div
                    className="p-2 border rounded text-black bg-[#FFA500] font-semibold"
                    key={genre.id}
                  >
                    <p>{genre.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div><p className=" py-10 text-2xl flex justify-center text-black font-bold">What do you think?</p></div>
      
      {/* buat menampilkan komnetar dari id disqus_thread" */}
      <div className="m-5 px-10 border-md border-black" id="disqus_thread"> 

        
      </div>
    </div>
  );
};

export default DetailFilm;
