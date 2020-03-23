import React from 'react';
import { Card } from 'react-bootstrap'

export default function MovieCards(props) {
    let htmlMovieCard = props.movieList.map(movie => {
        let genreNames = [];
        for (let i = 0; i < movie.genre_ids.length; i++) {
            if (props.genreList.length > 0) {
                let genreName = (props.genreList.find(genre => genre.id === movie.genre_ids[i])).name;
                genreNames.push(genreName);
            }
        }
        return (
                <Card className="movie-card">
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} />
                    <Card.Body className="bg-secondary p-1 item">
                        <div className="card-title font-weight-bold text-warning">{movie.title}</div>
                        <div className="text-white text-left text-secondary">{movie.release_date}</div>
                    </Card.Body>
                </Card>
        )
    }); return (
        <div className="container movie-board">{htmlMovieCard}</div>
    )
}
