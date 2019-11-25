import React from 'react';
import { Row, Col,ListGroup, ListGroupItem } from "reactstrap"

class MovieDetails extends React.Component {
    state = { movie: undefined }
    render() { 
        let m = this.state.movie;

        return ( 
            <Row>
                { m ? <>
                    <Col md="4">
                        <img src={m.Poster} className="col-md-12" alt={m.Title}></img>
                    </Col>
                    <Col md="8">
                    <ListGroup>
                        <ListGroupItem>Title: {m.Title}</ListGroupItem>
                        <ListGroupItem>Plot: {m.Plot}</ListGroupItem>
                        <ListGroupItem>Awards: {m.Awards}</ListGroupItem>
                        <ListGroupItem>Runtime: {m.Runtime}</ListGroupItem>
                        <ListGroupItem>Actors: {m.Actors}</ListGroupItem>
                        </ListGroup>
                    </Col> 
                 </> 
                 : <h1> Loading... </h1>}
            </Row>
     );
    }

    componentDidMount = async () => {
      await this.fetchMovieDetails()
    }

    componentDidUpdate = async (prevProps, prevState) =>{
        //we need this, otherwise the setState will invoke again the componentDidUpdate going into a infinite loop!
        if (prevProps.movieId !== this.props.movieId){
            await this.fetchMovieDetails()
        }
    }

    fetchMovieDetails = async () => {
        let resp = await fetch("http://www.omdbapi.com/?apikey=24ad60e9&i=" + this.props.movieId)
        let jsonMovie = await resp.json();

        this.setState({
            movie: jsonMovie
        })
    }
}
 
export default MovieDetails;