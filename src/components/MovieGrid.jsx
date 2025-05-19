import { useState, useEffect } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toggleFavoriteStatus, getFavoriteMovies } from "../api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MovieGrid({ movies, showOwnRating = false }) {
  const { sessionId, accountId } = useSelector((state) => state.auth);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (sessionId && accountId) {
        const favorites = await getFavoriteMovies(accountId, sessionId);
        setFavoriteIds(favorites.map((movie) => movie.id));
      } else {
        setFavoriteIds([]);
      }
    };

    fetchFavorites();
  }, [sessionId, accountId]);

  const toggleFavorite = async (movieId) => {
    if (!sessionId || !accountId) return;

    const isCurrentlyFavorite = favoriteIds.includes(movieId);
    const result = await toggleFavoriteStatus(
      accountId,
      sessionId,
      movieId,
      !isCurrentlyFavorite
    );

    if (result && result.success) {
      setFavoriteIds((prev) =>
        isCurrentlyFavorite
          ? prev.filter((id) => id !== movieId)
          : [...prev, movieId]
      );
    }
  };

  const MovieCard = ({ movie }) => {
    const isFavorite = favoriteIds.includes(movie.id);

    return (
      <Card
        sx={{
          width: "100%",
          height: 650,
          display: "flex",
          flexDirection: "column",
          boxShadow: 5,
        }}
      >
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{
            width: "100%",
            height: 450,
            objectFit: "cover",
            backgroundColor: "#f5f5f5",
          }}
        />
        <CardContent sx={{ p: 2 }}>
          <Typography
            component={Link}
            to={`/movies/${movie.id}`}
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: 400,
              fontSize: 22,
              mb: 4,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              textDecoration: "none",
              color: "inherit",
              "&:hover": { color: "gray " },
            }}
          >
            {movie.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ color: "#FFD600", fontSize: 22 }} />
              <Typography variant="subtitle" sx={{ fontWeight: 500 }}>
                {showOwnRating && movie.rating !== undefined
                  ? `${movie.vote_average} / ${movie.rating}`
                  : movie.vote_average}
              </Typography>
            </Box>

            {sessionId && accountId ? (
              isFavorite ? (
                <FavoriteIcon
                  onClick={() => toggleFavorite(movie.id)}
                  sx={{ fontSize: 22, cursor: "pointer", color: "red" }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => toggleFavorite(movie.id)}
                  sx={{ fontSize: 22, cursor: "pointer" }}
                />
              )
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 22 }} />
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          width: "95%",
        }}
      >
        {movies.map((movie) => (
          <Box key={movie.id} sx={{ width: "100%" }}>
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
