import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFavoriteMovies } from "../api";
import MovieGrid from "../components/MovieGrid";
import { Box, Typography } from "@mui/material";

export default function FavoritePage() {
  const { sessionId, accountId } = useSelector((state) => state.auth);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (sessionId && accountId) {
        const data = await getFavoriteMovies(accountId, sessionId);
        setFavorites(data);
      }
    };

    fetchFavorites();
  }, [sessionId, accountId]);

  return (
    <Box sx={{ mt: 4, px: 4, textAlign: "center" }}>
      <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
        Favorite movies
      </Typography>
      <MovieGrid movies={favorites} />
    </Box>
  );
}
