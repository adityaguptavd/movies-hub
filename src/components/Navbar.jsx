import {
  Typography,
  Box,
  InputBase,
  Stack,
  IconButton,
  Hidden,
  Drawer,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import {
  initialState,
  setMovies,
  setSearchResult,
} from "../state/movies/moviesSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const searchResult = useSelector((state) => state.movies.searchresult);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (location.pathname.includes("/movie/")) {
      navigate("/");
    }
    let newSearchResult = { ...searchResult };
    const setSearchResultHelper = (imdbmovieid, result) => {
      if (!result) {
        delete newSearchResult[imdbmovieid];
      } else if (newSearchResult[imdbmovieid]) {
        newSearchResult[imdbmovieid].push(result);
      } else {
        newSearchResult[imdbmovieid] = [result];
      }
    };

    const searchMovies = (searchValue) => {
      if (searchValue === "") {
        dispatch(setSearchResult({ searchResult: {} }));
        dispatch(setMovies({ movies: initialState.movies }));
        return;
      }
      const pattern = new RegExp(searchValue.toLowerCase());
      const movieSearchResults = initialState.movies.filter(
        ({
          imdbmovieid,
          movietitle,
          movielanguages,
          moviecountries,
          moviegenres,
        }) => {
          if (pattern.test(movietitle.toLowerCase())) {
            setSearchResultHelper(imdbmovieid, null);
            return true;
          }
          for (var country of moviecountries) {
            if (pattern.test(country.toLowerCase())) {
              setSearchResultHelper(imdbmovieid, {
                title: "Available in",
                value: country,
              });
              return true;
            }
          }
          for (var language of movielanguages) {
            if (pattern.test(language.toLowerCase())) {
              setSearchResultHelper(imdbmovieid, {
                title: "Language",
                value: language,
              });
              return true;
            }
          }
          for (var genre of moviegenres) {
            if (pattern.test(genre.toLowerCase())) {
              setSearchResultHelper(imdbmovieid, {
                title: "Genre",
                value: genre,
              });
              return true;
            }
          }
          return false;
        }
      );
      dispatch(setSearchResult({ searchResult: newSearchResult }));
      dispatch(setMovies({ movies: movieSearchResults }));
    };
    searchMovies(search);
    // eslint-disable-next-line
  }, [search]);

  const drawer = (
    <Stack
      direction={{
        xs: "column",
        md: "row"
      }}
      justifyContent="flex-start"
      alignItems="center"
      gap="40px"
      width={{xs: "200px", md: "auto"}}
      marginTop="30px"
      sx={{ backgoundColor: "#171717" }}
    >
      <Typography variant="body" sx={{ color: "rgb(217, 29, 42)" }}>
        HOME
      </Typography>
      <Typography variant="body">NEWS</Typography>
      <Typography variant="body">IN THEATRES</Typography>
      <Typography variant="body">COMING SOON</Typography>
      <Typography variant="body">ADVERTISE</Typography>
    </Stack>
  );

  return (
    <Stack direction="column" marginTop="50px" gap="30px">
      <Stack
        direction="row"
        justifyContent="space-between"
        gap="40px"
        alignItems="center"
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          MoviesHub
        </Typography>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Stack
            direction="row"
            gap="50px"
            flex={1}
            justifyContent="flex-start"
            flexWrap="wrap"
          >
            {drawer}
          </Stack>
        </Hidden>
      </Stack>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          ".MuiDrawer-paper": {
            bgcolor: "#272727",
            color: "#f1f1f1",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Stack
        direction="row"
        justifyContent={{
          xs: "center",
          sm: "space-between",
        }}
        gap={{
          xs: "10px",
          md: 0,
        }}
        alignItems="center"
        sx={{
          padding: "5px",
        }}
        flexWrap="wrap-reverse"
      >
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "20px", md: "25px" }, color: "#fada5e" }}
        >
          {location.pathname.includes("/movie/")
            ? "Enjoy The Movie:"
            : search === ""
            ? "Show All"
            : `Results For: ${search}`}
        </Typography>
        <Box>
          <InputBase
            placeholder="Search by Movie name, genre, country or language..."
            sx={{
              // width: "500px",
              width: {
                xs: "200px",
                sm: "350px",
                md: "500px",
              },
              height: "40px",
              border: "2px solid #f1f1f1",
              borderRadius: "10px",
              color: "#f1f1f1",
              paddingLeft: "5px",
              paddingRight: "5px",
              fontStyle: "italic",
            }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            endAdornment={
              <IconButton>
                <SearchOutlinedIcon
                  sx={{
                    color: "#f1f1f1",
                  }}
                />
              </IconButton>
            }
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Navbar;
