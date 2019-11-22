import React from 'react';
import { Container, Row, Col } from "reactstrap"
import MovieList from './MovieList';

class MainComponent extends React.Component {
    state = { 
        movies: []
     }

    render() { 
        return (
        <Container>
            { this.state.movies.map((movie, index) =>
                <MovieList movies={movie.items} key={index} title={movie.title} /> )}
        </Container> );
    }

    componentDidMount = async () => {
        let movieTitles = ["Harry potter", "James Bond", "Star Wars", "Lord of the Rings"];

        movieTitles.forEach(async movie => {
            let response = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&s=" +movie);
            let movieResult = await response.json();

            // var movies = this.state.movies;
            // var toAdd = { items: movieResult.Search, title: movie}
            // movies.push(toAdd);
            // this.setState({movies: movies})

            this.setState({ //create a new array, with the previous one adding a new element at the end
                movies: [ ...this.state.movies, { items: movieResult.Search, title: movie }]
            });
        })
        // for(var i = 0; i < movieTitles.length; i++){
        //     let response = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&s=" + movieTitles[i]);
        //     let movieResult = await response.json();
        //     this.setState({
        //         movies: [ ...this.state.movies, { items: movieResult.Search, title: movieTitles[i]}]
        //     });
        // }
    }
}
 
export default MainComponent;