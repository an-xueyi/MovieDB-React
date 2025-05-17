import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { loadMovieList } from "../api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    loadMovieList(category, currentPage).then((data) => {
      setTotalPage(data.total_pages);
      setMovies(data.results);
    });
  }, [category, currentPage]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const onPrev = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    if (currentPage === totalPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <Container sx={{py: 4}}>
        
    </Container>
  );
}
