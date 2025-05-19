import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRatedMovies } from "../api";
import MovieGrid from "../components/MovieGrid";
import { Box, Typography } from "@mui/material";

export default function RatedPage() {
  const { sessionId, accountId } = useSelector((state) => state.auth);
  const [rated, setRated] = useState([]);

  useEffect(() => {
    const fetchRated = async () => {
      if (sessionId && accountId) {
        const data = await getRatedMovies(accountId, sessionId);
        setRated(data);
      }
    };

    fetchRated();
  }, [sessionId, accountId]);

  return (
    <Box sx={{ mt: 4, px: 4, textAlign: "center" }}>
      <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
        Rated movies
      </Typography>
      <MovieGrid movies={rated} />
    </Box>
  );
}
