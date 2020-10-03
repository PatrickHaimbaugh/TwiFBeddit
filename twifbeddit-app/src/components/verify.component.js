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
    const containerStyle = {
      width: "100%",
      paddingTop: "20px"
    }
    const contentStyle = {
      width: "80%",
      margin: "auto"
    }
    return (
        <div style={containerStyle}>
          <div style={contentStyle}>
            <p>Verifying and redirecting to your TwiFBeddit account.</p>
            <p>Links are valid for 24 hours since sign-up. <b>If verification link is no longer valid, please sign-up again</b></p>
            {this.verifyRedirect()}
          </div>
        </div>
    );
  }
}
