import React from "react";
import { Route } from 'react-router-dom'
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieForm from './MovieForm'
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  componentDidUpdate(){
    this.fetchMovie(this.props.match.params.id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = e => {
      e.preventDefault();
      this.props.history.push(`/movies/${this.state.movie.id}/update-movie`);
    };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log(res)
        this.setState({...this.state.movie, res});
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  updateState = e => {
    this.setState(e);
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div>
        <div className="save-wrapper">
          <MovieCard movie={this.state.movie} />
          <div className="button-container">
              <div className="button" onClick={this.saveMovie}>
                Save
              </div>
              <div className="button" onClick={this.editMovie}>
                Edit
              </div>
              <div className="button" onClick={this.deleteMovie}>
                Delete
              </div>
              <div className="button" onClick={() => console.log(this.state)}>
                Test
              </div>
          </div>
        </div>
        <div>
          <Route 
            path='/movies/:id/update-movie' 
            render={props => {
            return <MovieForm {...this.state} updateMovie={this.updateState} />;
            }}
          />
        </div>
      </div>
    );
  }
}
