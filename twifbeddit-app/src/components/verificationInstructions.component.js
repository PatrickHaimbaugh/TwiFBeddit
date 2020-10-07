import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { useEffect } from 'react';
import axios from 'axios';

export default class VerificationInstructions extends Component {

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
            <p>Please check your email for the validation email!</p>
          </div>
        </div>
    );
  }
}
