import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MovieGrid = ({ movies }) => {
  const MovieCard = ({ movie }) => (
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
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: 400,
            fontSize: 22,
            mb: 4,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
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
              {movie.vote_average}
            </Typography>
          </Box>
          <FavoriteBorderIcon sx={{ fontSize: 22, cursor: "pointer" }} />
        </Box>
      </CardContent>
    </Card>
  );

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
};

export default MovieGrid;
