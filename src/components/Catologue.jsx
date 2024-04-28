import { Card, CardMedia, Stack, Typography, CardContent } from "@mui/material";
import defaultImg from "../assets/images/default.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMovie } from "../state/movies/moviesSlice";
import { useNavigate } from "react-router";

const Catologue = () => {
  const movies = useSelector((state) => state.movies.movies);
  const searchResult = useSelector((state) => state.movies.searchResult);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = (movie) => {
    dispatch(setCurrentMovie({ currentMovie: movie }));
    navigate(`/movies-hub/movie/${movie.imdbmovieid}`);
  };

  return (
    <Stack direction="column" marginTop="20px">
      <Stack
        direction="row"
        marginTop="20px"
        flexWrap="wrap"
        gap="10px"
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        {movies.length === 0 ? (
          <Typography variant="h3" sx={{ fontSize: "20px" }}>
            No Movies Found!
          </Typography>
        ) : (
          movies.map((movie) => {
            return (
              <Card
                key={movie.imdbmovieid}
                sx={{
                  minHeight: { xs: "200px", sm: "250px" },
                  width: { xs: "160px", sm: "190px", md: "220px" },
                  backgroundColor: "#171717",
                  color: "#f1f1f1",
                  cursor: "pointer",
                  transition: "transform 0.3s linear",
                  "&:hover": {
                    transform: "scale3d(1.08, 1.08, 1.08)",
                    transition: "transform 0.3s linear",
                  },
                }}
                onClick={() => redirect(movie)}
              >
                <CardMedia
                  image={movie.moviemainphotos[0] || defaultImg}
                  sx={{
                    minHeight: { xs: "200px", sm: "250px" },
                    width: "100%",
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    Movie Name: {movie.movietitle}
                  </Typography>
                  {!searchResult[movie.imdbmovieid] ? (
                    <Typography variant="body2" sx={{ color: "#969494" }}>
                      Genre: {movie.moviegenres.join(", ")}
                    </Typography>
                  ) : (
                    searchResult[movie.imdbmovieid].map((result) => {
                      return (
                        <Typography
                          key={movie.imdbmovieid}
                          variant="body2"
                          sx={{ color: "#969494" }}
                        >
                          {result.title}: {result.value}
                        </Typography>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>
    </Stack>
  );
};

export default Catologue;
