import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { loadMovieList } from "../api";
import MovieGrid from "../components/MovieGrid";

const initialCache = {
  popular: {},
  now_playing: {},
  top_rated: {},
  upcoming: {},
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [cache, setCache] = useState(initialCache);

  useEffect(() => {
    if (cache[category]?.[currentPage]) {
      const cachedData = cache[category][currentPage];
      setMovies(cachedData.results);
      setTotalPage(cachedData.total_pages);
      return;
    }
    // Fetch new data if not in cache
    loadMovieList(category, currentPage).then((data) => {
      setMovies(data.results);
      setTotalPage(data.total_pages);
      setCache((prev) => ({
        ...prev,
        [category]: { ...prev[category], [currentPage]: data },
      }));
    });
  }, [category, currentPage, cache]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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
    <Container maxWidth={false} disableGutters sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Button onClick={onPrev} variant="outlined">
            Prev
          </Button>
          <Typography sx={{ mx: 2 }}>
            {currentPage} / {totalPage}
          </Typography>
          <Button onClick={onNext} variant="outlined">
            Next
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginLeft: "auto",
            mr: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ mb: 0.05, color: "text.secondary", alignSelf: "flex-start" }}
          >
            Category
          </Typography>
          <Select
            value={category}
            onChange={handleCategoryChange}
            variant="standard"
            sx={{ minWidth: 100 }}
          >
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="now_playing">Now Playing</MenuItem>
            <MenuItem value="top_rated">Top Rated</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </Box>
      </Box>

      <MovieGrid movies={movies} />
    </Container>
  );
}
