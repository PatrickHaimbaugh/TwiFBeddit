import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import makeNetworkCall from "../util/makeNetworkCall";

import { useState, useEffect } from "react";
import Copyright from "../components/copyright.component.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as navigationActions from "../containers/NavigationContainer/actions";
import * as accountActions from "../containers/AccountContainer/actions";

class UserDetails {
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignInSide() {
	const classes = useStyles();

	// const [email, setEmail] = useState("");
	// const [emailError, setEmailError] = useState("");
	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const dispatch = useDispatch();

	const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
	};

	//const [rememberMe, setRememberMe] = useState(false);

	// const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setEmail(e.currentTarget.value);
	// 	validateEmail(e.currentTarget.value);
	// };

	const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.currentTarget.value);
		validateUsername(e.currentTarget.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
		validatePassword(e.currentTarget.value);
	};

	/*const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.currentTarget.value);
    if (e.currentTarget.checked === true){
      rememberUser();
    }else{
      forgetUser();
    }
  }

  const rememberUser = () => {
    try {
      localStorage.setItem('TwiFBeddit-User', email);
      localStorage.setItem('TwiFBeddit-Password', password);
    } catch (error) {
      console.log("Error saving data");
    }
  };

  const forgetUser = () => {
    try {
      localStorage.removeItem('TwiFBeddit-User');
      localStorage.removeItem('TwiFBeddit-Password');
    } catch (error) {
      console.log("Error removing");
    }
  };

  const getRememberedUser = () => {
    try {
      const user = localStorage.getItem('TwiFBeddit-User');
      const password = localStorage.getItem('TwiFBeddit-Password');
      if (user !== null && password !== null) {
        // We have user stored!!
        const userDetails = [user, password];
        return userDetails;
      }
    } catch (error) {
      console.log("Error retrieving data");
    }
  };*/

	// const validateEmail = (value: string): string => {
	// 	const error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
	// 		value
	// 	)
	// 		? ""
	// 		: "You must enter a valid email address";

	// 	setEmailError(error);
	// 	return error;
	// };

	const validateUsername = (value: string): string => {
		const error = value ? "" : "You must enter a valid Username";
		setUsernameError(error);
		return error;
	};

	const validatePassword = (value: string): string => {
		const error = value ? "" : "You must enter a valid password";
		setPasswordError(error);
		return error;
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// const emailValidationError = validateEmail(email);
		const usernameValidationError = validateUsername(username);
		const passwordValidationError = validatePassword(password);
		if (usernameValidationError === "" && passwordValidationError === "") {
			const userDetails = {
				user: {
					// email: email,
					password: password,
					subscribed: false,
				},
			};
			// console.log(userDetails);
			//setSubmitResult(result);
			//setSubmitted(true);
			const resp = await makeNetworkCall({
				HTTPmethod: "get",
				path: "login",
				params: {
					username,
					password,
				},
			});
			dispatch(accountActions.signInOrSignUp(resp));
			changeActiveScreen("LandingPage");
			// axios
			// 	.post("http://localhost:5000/api/users/login", userDetails)
			// 	.then((res) => {
			// 		if (res.status === 200) {
			// 			//this.props.history.push('/');
			// 			window.location = "/dashboard"; //TODO: navigate to dashboard
			// 		} else {
			// 			const error = new Error(res.error);
			// 			throw error;
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.error(err);
			// 		alert(
			// 			"Sign-in not successful. Please enter valid email and password."
			// 		);
			// 	});
		} else {
			alert(
				"Sign-in not successful. Please enter valid username and password."
			);
		}
	};

	/*useEffect( () => {
    const userDetails =  getRememberedUser();

    //if (userDetails){
      //const emailRemembered = userDetails.getEmail() || "";
      //const passwordRemembered = userDetails.getPassword() || "";
      //const checkboxStatus = userDetails ? true : false;
    //}

    if (userDetails){
      const emailRemembered = userDetails[0] || "";
      const passwordRemembered = userDetails[1] || "";
      const checkboxStatus = userDetails ? true : false;

      setEmail(emailRemembered);
      setPassword(passwordRemembered);
      setRememberMe(checkboxStatus);
    }
  })*/

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>{/*<LockOutlinedIcon />*/}</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={onSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								autoComplete="off"
								name="username"
								value={username}
								onChange={onChangeUsername}
							/>
							<span className="error">{usernameError}</span>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								password={password}
								onChange={onChangePassword}
							/>
							<span className="error">{passwordError}</span>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox //value={rememberMe}
										//onChange={onChangeCheckbox}
										color="primary"
									/>
								}
								label="Remember me"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								href="/"
								onClick={() => changeActiveScreen("SignUp")}
								variant="body2"
							>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
					<Box mt={5}>
						<Copyright />
					</Box>
				</form>
			</div>
		</Container>
	);
}
