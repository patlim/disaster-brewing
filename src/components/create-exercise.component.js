import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css"

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      description: '',
      duration: '',
      date: new Date(),
      users: [ ]
     }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
            username: res.data[0].username
          })
        }
      })
  }

  onChangeDate = (date) => {
    this.setState({
      date: date
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    }

    console.log(exercise);
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    window.location = '/'
  }
  render() { 
    return ( 
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={(e) => this.setState({'username': e.target.value})}>
                {
                  this.state.users.map(function(user) {
                    return <option
                      key={user}
                      value={user}>{user}
                      </option>
                  })
                }
              </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={(e) => this.setState({'description': e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input type="number"
              required
              className="form-control"
              value={this.state.duration}
              onChange={(e) => this.setState({'duration': e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                />
            </div>
          </div>
          
          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
     );
  }
}
 
export default CreateExercise;