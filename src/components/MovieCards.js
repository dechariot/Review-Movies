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
                <Card className="movie-card" style={{border:'none'}}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} />
                    <Card.Body className="bg-secondary p-1">
                        <div className="card-title font-weight-bold text-white">{movie.title}</div>
                    </Card.Body>
                </Card>
        )
    }); return (
        <div className="container movie-board">{htmlMovieCard}</div>
    )
}
