import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

const loginquery = "query loginuser($email:String,$password:String){Login(email:$email, password:$password){email password}}";

var graphqlCall = async (query, variables, callback) => {
  console.log(query);
  console.log(variables);
  try {
    //console.log('http://localhost:4000/graphql?query=query getsingledeveloper($name: String, $email:String, $password:String){Login(name:$name, email:$email, password:$password) {email}}&variables='+JSON.stringify(variables));
    const response = await axios.get('http://localhost:4000/graphql?query=' + query + '&variables=' + JSON.stringify(variables));
    callback(response.data, null)
  }
  catch (error) {
    callback(null, error);
  }
}




const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Loginpage} />
    </div>
  </Router>

);



class Loginpage extends Component {

  constructor(props) {

    super(props);
    this.state = { email: '', password: '' };

    this.handleChangeForEmail = this.handleChangeForEmail.bind(this);
    this.handleChangeForPassword = this.handleChangeForPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeForEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangeForPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();

    var variables = {
      "password": this.state.password,
      "email": this.state.email
    }
    graphqlCall(loginquery, variables, function (res, err) {
      if (res) {
        console.log(res);
        alert('Login Success For ' + res.data.Login.email);
      }
      else {
        alert('Login Failed For ' + res.data.Login.email);
      }
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleChangeForEmail} /><br />
          Password:
          <input type="text" value={this.state.password} onChange={this.handleChangeForPassword} />
        </label><br />
        <input type="submit" value="Submit" />
        <h4>Email: {this.state.email}</h4>
        <h4>Password: {this.state.password}</h4>
      </form>
    );
  }
}


const Home = () => (
  <div>
    <h2>This is Home page</h2>
  </div>
);

const Register = () => (
  <div>
    <h2>This is Registration page</h2>
  </div>
);

const Login = () => (
  <div>
    <h2>Login Page</h2>
  </div>
);



export default BasicExample;