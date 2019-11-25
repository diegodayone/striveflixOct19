import React from 'react';
import { Row, Col,ListGroup, ListGroupItem , Input, Button} from "reactstrap"

class MovieDetails extends React.Component {
    state = { 
        movie: undefined, 
        comments: [],
        newComment: "",
        rate: 1
    }

    render() { 
        let m = this.state.movie;
        let comments = this.state.comments;

        return ( 
            <>
                <Row className="my-5">
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
                <Row className="my-5"> 
                    <ListGroup className="col-md-12">
                        { comments.length > 0 ? comments.map((comment, index)=> 
                            <ListGroupItem key={index}>
                                {comment.author} | {comment.comment} | {comment.rate}
                            </ListGroupItem>
                        )
                        : 
                        <ListGroupItem>
                            No comments on this movie, be the first to create one!
                        </ListGroupItem>
                        }
                        <Col md="12" className="my-5">
                            <Row>
                                <Input placeholder="Write your comment here..." className="col-md-6" type="text" value={this.state.newComment} onChange={(input)=> this.setState({newComment: input.target.value})} />
                                <Input className="col-md-2" placeholder="1-5" type="number" value={this.state.rate} onChange={(input)=> this.setState({rate: input.target.value})} />
                                <Button className="col-md-4" onClick={() => console.log(this.state.newComment)} >Send</Button>
                            </Row>
                        </Col>
                    </ListGroup>
                </Row>
            </>
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

        let restComments = await fetch("https://strive-school-testing-apis.herokuapp.com/api/comments/" + this.props.movieId,{
            headers: {
                "Authorization": "Basic dXNlcjMwOkU2dFlzNlBCenVmUmZzVlA"
            }
        })
        let jsonComments = await restComments.json();

        this.setState({
            movie: jsonMovie,
            comments: jsonComments
        })
    }
}
 
export default MovieDetails;