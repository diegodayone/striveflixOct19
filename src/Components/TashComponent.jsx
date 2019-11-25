import React from 'react';
import { Button, Input } from "reactstrap"

class TashComponent extends React.Component {
    state = { 
        name:"Tash",
        number: 10      
    }

    render() { 
        return (<div>
            Hello {this.state.name} => {this.props.email}
            <Input type="text" value={this.state.name} onChange={(val)=> this.setState({name: val.target.value })} ></Input>
            <Button onClick={() => this.setState({ name: "Button Clicked"})} >Click me to change the text!</Button>

            <h2>{ this.props.movies ? "You have " + this.props.movies.length + " movies" : "No movie selected"}</h2>
            
            <Input type="number" value={this.state.number} 
                    onChange={(val)=> {
                        this.setState({number: val.target.value })
                        this.props.onSetMovieLimit(val.target.value)
                    }} />
        </div>  );
    }
}
 
export default TashComponent;