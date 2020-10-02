import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { useEffect } from 'react';
import axios from 'axios';

export default class VerificationInstructions extends Component {

  render(){
    return (
        <div>
          <p>Please check your email for the validation email!</p>
        </div>
    );
  }
}
