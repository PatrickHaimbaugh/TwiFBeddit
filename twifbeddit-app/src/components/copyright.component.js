import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default class Copyright extends Component {

  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <a color="inherit" href="http://localhost:3000/">
          TwiFBeddit
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
}
