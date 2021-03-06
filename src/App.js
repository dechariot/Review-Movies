import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieCards from './components/MovieCards';
import {TinyPagination} from 'react-pagination-custom';




let apiKey = '9b49a09820c155187af9b47bf7400b7d';
let keyword = '';

function App() {
  let [movies, setMovies] = useState([]);

  let [movieList, setMovieList] = useState([]) //keep original movie list

  let [genres, setGenres] = useState([]);

  let [moviePage, setMoviePage] = useState({});

  let CurrentPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    setMovieList(data.results);
    setMoviePage(data);
    setMovies(data.results);

    let GenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    let GenreResponse = await fetch(GenreUrl);
    let genreListObj = await GenreResponse.json();
    setGenres(genreListObj.genres);
  };

  useEffect(CurrentPlaying, []);

  let [key, setKey] = useState('now_playing')
  let PlayNowOrTopRated = async (key) => {
    setKey(key);
    let url = `https://api.themoviedb.org/3/movie/${key}?api_key=${apiKey}&language=en-US&page=${page}`
    let response = await fetch(url);
    let data = await response.json();
    setMovies(data.results)
  }

  let searchByKeyWord = async (e) => {
    keyword = e.target.value;
    if (keyword === '') {
      setMovies(movieList);
    } else {
      setMovies(movies.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase())));
    }
  }

  // let [ratingValue, setRatingValue] = useState({min:0, max: 10});
  // let ratingSliderChange = (newValue) => {
  //   setRatingValue(newValue);
  //   let filteredMovies = movieList.filter(movie => {
  //      return movie.vote_average >= newValue.min && movie.vote_average <= newValue.max;
  //   });
  //   setMovies(filteredMovies);
  // }

  let mostToLeast = (key) => {
    if (!movies) {
      setMovies(movieList);
    } else {
      let mostToLeast = [...movies].sort((a, b) => b[key] - a[key])
      setMovies(mostToLeast);
    }
  }

  let leastToMost = (key) => {
    if (!movies) {
      setMovies(movieList);
    } else {
      let leastToMost = [...movies].sort((a, b) => a[key] - b[key])
      setMovies(leastToMost);
    }
  }

  let [page, setActivePage] = useState(1);
  let handlePageChange = async (pageNumber) => {
    setActivePage(pageNumber);
    let url = `https://api.themoviedb.org/3/movie/${key}?api_key=${apiKey}&language=en-US&page=${page}`
    let response = await fetch(url);
    let data = await response.json();
    setMovies(data.results)
  }

  return (
    <div className="App bg-dark">

      {/* Navigation Bar */}
      <div className="text-center d-flex justify-content-center bg-dark header">
        <Navbar expand="lg">
          <Navbar.Brand href="#home">
            <img
              src="./favicon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo" /><a className="text-white font-weight-bold h1" href="#"> Review Movies</a></Navbar.Brand>
          <Form  inline>
            <input type="text" placeholder="What coming up your mind now?" onChange={(e) => { searchByKeyWord(e) }} className="mr-sm-2 form-control search-bar" />
          </Form>
        </Navbar>
      </div>
      {/* Navigation Bar */}

      {/* Filter Bar */}
      <div className=" container-fluid d-flex filter-bar">
        <Nav>
          <Nav.Link href="#home" style={{ color: "white" }} onClick={() => PlayNowOrTopRated('now_playing')}>Now Playing</Nav.Link>
          <Nav.Link href="#link" style={{ color: "white" }} onClick={() => PlayNowOrTopRated('top_rated')}>Top Rated</Nav.Link>
          <NavDropdown title="Sort Movies" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => mostToLeast('popularity')}>Most To Least Popular</NavDropdown.Item>
            <NavDropdown.Item onClick={() => leastToMost('popularity')}>Least To Most Popular</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => mostToLeast('vote_average')}>Highest To Lowest Rating</NavDropdown.Item>
            <NavDropdown.Item onClick={() => leastToMost('vote_average')}>Lowest To Highest Rating</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
      {/* Filter Bar */}

      {/* MovieCards */}
      <MovieCards movieList={movies} genreList={genres} />
      {/* MovieCards */}

      <Pagination
        className="container-fluid pagination"
        prevPageText='prev'
        nextPageText='next'
        firstPageText='first'
        lastPageText='last'
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={moviePage.total_results}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      />

<div className="container-fluid bg-secondary text-white footer">
                <div className="row container">
                    <div className="col-md-4 text-right">
                    <img
              src="./footer-img.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              /><span className="display-4 font-weight-bold"> Review Movies</span>
                    </div>

                    <div className="col-md-3 text-left">
                        <ul>
                            <li><a><h4 className="font-weight-bold text-primary">Now Playing</h4></a></li>
                            <li><a>New Series Movies</a></li>
                            <li><a>New Movies</a></li>
                            <li><a>Blockbuster</a></li>
                            <li><a>Upcoming Moives</a></li>
                        </ul>
                    </div>

                    <div className="col-md-2 text-left">
                        <ul>
                            <li><a><h4 className="font-weight-bold text-primary">Category</h4></a></li>
                            <li><a>Action Movies</a></li>
                            <li><a>Horror Movies</a></li>
                            <li><a>Adventure Movies</a></li>
                            <li><a>Fiction Movies</a></li>
                            <li><a>Drama Movies</a></li>
                            <li><a>Comedy Movies</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 text-left">
                        <ul>
                            <li><a><h4 className="font-weight-bold text-primary">Contact</h4></a></li>
                            <li><label>Email:</label><a> nsprisang@gmail.com</a></li>
                            <li><label>Mobile:</label><a> 0974070167</a></li>
                            <li><label>Add:</label><a> Ho Chi Minh City, VN</a></li>
                        </ul>
                    </div>
                    <div className="container-fluid text-center text-white font-weight-bold p-1"><h5>Made with &hearts; by <a href="https://github.com/dechariot/Review-Movies">Sang Nguyen</a> </h5> </div>
                </div>
            </div>
            
    </div>
  );
}

export default App;
