import { Typography, Box, Stack, Card, CardMedia, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import defaultImg from "../../assets/images/default.jpeg";

const MovieView = () => {
  const slug = useParams();
  const movie = useSelector((state) => state.movies.currentMovie);

  const keyValues = movie
    ? [
        {
          key: "IMDB ID",
          value: movie.imdbmovieid,
        },
        {
          key: "Genres",
          value: movie.moviegenres,
        },
        {
          key: "Languages",
          value: movie.movielanguages,
        },
        {
          key: "Countries",
          value: movie.moviecountries,
        },
      ]
    : [];

  return (
    <Box marginTop="30px" width="100%">
      {movie && movie.imdbmovieid === slug.id && (
        <>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            alignItems={{
              xs: "center",
              md: "flex-start"
            }}
            gap="20px"
          >
            <Card
              sx={{
                height: "300px",
                width: "250px",
                backgroundColor: "#171717",
                color: "#f1f1f1",
                cursor: "pointer",
              }}
            >
              <CardMedia
                image={movie.moviemainphotos[0] || defaultImg}
                sx={{ height: "300px", width: "250px" }}
              />
            </Card>
            <Stack direction="column" justifyContent="flex-start" alignItems={{xs: "center", md: "flex-start"}} gap="10px" width="100%">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{xs: "center", md: "flex-start"}}
                gap="10px"
                flexWrap="wrap"
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: "30px", color: "#fada5e", textAlign: {xs: "center", md: "left"} }}
                >
                  Movie Name :
                </Typography>
                <Typography variant="h2" sx={{ fontSize: "25px", textAlign: {xs: "center", md: "left"} }}>
                  {movie.movietitle}
                </Typography>
              </Stack>
              {keyValues.map((keyValue) => {
                return (
                  <Stack diretion="column" key={keyValue.key} alignItems={{xs: "center", md: "flex-start"}}>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "17px", color: "#fada5e", textAlign: {xs: "center", md: "left"} }}
                    >
                      {keyValue.key}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "15px", textAlign: {xs: "center", md: "left"} }}>
                      {keyValue.key === "IMDB ID"
                        ? keyValue.value
                        : keyValue.value.length > 0
                        ? keyValue.value.join(", ")
                        : "NA"}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack
            direction="column"
            marginTop="40px"
            gap="30px"
            alignItems="center"
          >
            <Button sx={{ color: "#fada5e", width: {xs: "200px", sm: "300px"} }}>
              Watch Now!
            </Button>
            <Button sx={{ color: "#fada5e", width: {xs: "200px", sm: "300px"} }}>
              Add to Wishlist!
            </Button>
          </Stack>
          </>
      )}
    </Box>
  );
};

export default MovieView;
