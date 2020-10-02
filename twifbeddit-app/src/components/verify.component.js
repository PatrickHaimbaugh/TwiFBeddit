import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { useEffect } from 'react';
import axios from 'axios';

export default class Verify extends Component {
  constructor(props){
    super(props);

    this.verifyRedirect = this.verifyRedirect.bind(this);

    this.state = {
      redirect: null
    };
  }

  verifyRedirect(){
    axios.post('http://localhost:5000/api/new/' + this.props.match.params.id, {})
      .then(res => {
        if (res.status === 200) {
          //this.props.history.push('/');
          window.location = '/signin';
        }
      })
      .catch(err => {
        if (err.response.status === 401){
          alert('This confirmation link is no longer valid');
        }else{
          console.error(err);
          alert(err);
        }
      });
  }

  render(){
    return (
        <div>
          <p>Verifying and redirecting to your EcoMint account.</p>
          {this.verifyRedirect()}
        </div>
    );
  }
}
