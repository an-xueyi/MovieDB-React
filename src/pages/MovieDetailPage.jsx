import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMovieDetail, getMovieRating, rateMovie } from "../api";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  CardMedia,
  Chip,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const { sessionId, accountId } = useSelector((state) => state.auth);

  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getMovieDetail(movieId);
      setMovie(movieData);

      if (sessionId && accountId) {
        const rating = await getMovieRating(accountId, sessionId, movieId);
        setUserRating(rating);
      }
    };

    fetchData();
  }, [movieId, sessionId, accountId]);

  const handleRate = async () => {
    if (!sessionId) {
      setSnackbarMessage("Please login to rate movies!");
      setSnackbarOpen(true);
      return;
    }

    const result = await rateMovie(sessionId, movieId, selectedRating);
    if (result && (result.status_code === 1 || result.status_code === 12)) {
      setUserRating(selectedRating);
      setSnackbarMessage("Rate Success");
    } else {
      setSnackbarMessage("Failed to rate movie.");
    }
    setSnackbarOpen(true);
  };

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        mt: 4,
        px: 4,
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ flex: "1 1 300px", maxWidth: 400 }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Box>

      <Box
        sx={{
          flex: "1 1 400px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="h3" component="h1">
          {movie.title}
        </Typography>

        <Typography variant="h6">Release Date:</Typography>
        <Typography variant="body1">{movie.release_date || "N/A"}</Typography>

        <Typography variant="h6">Overview:</Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {movie.overview}
        </Typography>

        <Typography variant="h6">Genres:</Typography>
        <Box>
          {movie.genres && movie.genres.length > 0 ? (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ backgroundColor: "blue", color: "white" }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2">N/A</Typography>
          )}
        </Box>

        <Typography variant="h6">Average Rating:</Typography>
        <Typography variant="subtitle1">
          {movie.vote_average?.toFixed(1) || "N/A"}
        </Typography>

        <Typography variant="h6">Your Rating:</Typography>
        <Typography variant="subtitle1">
          {userRating !== null ? userRating : "Not yet"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            variant="standard"
            size="small"
          >
            {[...Array(10).keys()].map((n) => (
              <MenuItem key={n + 1} value={n + 1}>
                {n + 1}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            onClick={handleRate}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Rate it!
          </Button>
        </Box>

        <Typography variant="h6">Production Companies:</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {movie.production_companies &&
          movie.production_companies.length > 0 ? (
            movie.production_companies.map((company) => (
              <Box
                key={company.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: 100,
                  textAlign: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                  alt={company.name}
                  sx={{
                    height: 60,
                    width: 100,
                    objectFit: "contain",
                    mb: 0.5,
                  }}
                />
                <Typography variant="caption" noWrap>
                  {company.name}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">N/A</Typography>
          )}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}
