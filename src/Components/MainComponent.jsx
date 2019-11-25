import React from 'react';
import { Container } from "reactstrap"
import MovieList from './MovieList';
import MyNav from './MyNav';
import MovieDetails from './MovieDetails';
import TashComponent from './TashComponent';

class MainComponent extends React.Component {
    state = { 
        movies: [],
        searchResult: undefined,
        selectedMovieID: undefined,
        toTake: 10
    }

    setMovieLimit = (number) => {
        this.setState({
            toTake: number
        })
    }

    render() { 
        return (
        <Container>
            <TashComponent email="diego@strive.school" 
                    movies={this.state.searchResult}
                    onSetMovieLimit={this.setMovieLimit} />

            <MyNav changeSearch={(search) => this.searchMovies(search)}></MyNav>
            { this.state.selectedMovieID && <MovieDetails movieId={this.state.selectedMovieID} />}

            { this.state.movies
                    .map((movie, index) => 
                    <MovieList 
                        movies={movie.items.slice(0, this.state.toTake)} 
                        key={index} 
                        title={movie.title}
                        setMovieId={this.setSelectedMovieId} /> )}

            { this.state.searchResult && <MovieList 
                                            movies={this.state.searchResult.slice(0, this.state.toTake)} 
                                            title="Search Result"
                                            setMovieId={this.setSelectedMovieId} />}
        </Container> );
    }

    setSelectedMovieId = (movieId) => this.setState({ selectedMovieID: movieId})

    searchMovies = async (searchQuery) => {
        let response = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&s=" + searchQuery);
        let movieResult = await response.json();
        this.setState({searchResult: movieResult.Search, searchQuery: searchQuery})
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