import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import { Media, MediaResponse } from "../types";
import CardsGrid from "../components/CardsGrid";

const fetchMovies = async (page: number): Promise<MediaResponse> => {
  const response = await axios.get(
    `https://kinolib-backend-homer.fly.dev/parse/movies/${page}`
  );
  return response.data;
};

const MoviePage = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [countOfPages, setCountOfPages] = useState(0);
  const { page: page } = useParams();

  useEffect(() => {
    fetchMovies(parseInt(page || "1"))
      .then(({ media, countOfPages }) => {
        setMedia(media);
        setCountOfPages(countOfPages);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="pt-14rem">
      <CardsGrid
        cards={media}
        countOfPages={countOfPages}
        currentPage={parseInt(page || "1")}></CardsGrid>
    </div>
  );
};

export default MoviePage;
