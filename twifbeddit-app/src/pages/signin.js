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
import { Alert } from "rsuite";
import { useState, useEffect } from "react";
import Copyright from "../components/copyright.component.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as navigationActions from "../containers/NavigationContainer/actions";
import * as accountActions from "../containers/AccountContainer/actions";
import * as globalActions from "../containers/GlobalContainer/actions";
import Loader from "../components/Loader";
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

export default function SignInSide({ loading }) {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const dispatch = useDispatch();

	const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
	};

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
		validateEmail(e.currentTarget.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
		validatePassword(e.currentTarget.value);
	};

	const validateEmail = (value: string): string => {
		let error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			value
		)
			? ""
			: "Valid Username";
		// also check if the field is empty to determine if the username is valid
		error =
			value.length > 0 ? error : "You must enter a valid username or email";
		setEmailError(error);
		return error;
	};

	const validatePassword = (value: string): string => {
		const error = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$&+,:;=?@#|'<>.^*()%!-]{8,}$/.test(
			value
		)
			? ""
			: "Must be 8 characters, 1 uppercase, 1 lowercase, 1 number";
		setPasswordError(error);
		return error;
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(globalActions.changeLoading(true));

		const emailValidationError = validateEmail(email);
		// const usernameValidationError = validateUsername(username);
		const passwordValidationError = validatePassword(password);
		if (
			(emailValidationError === "" ||
				emailValidationError === "Valid Username") &&
			passwordValidationError === ""
		) {
			const userDetails = {
				user: {
					// email: email,
					password: password,
					subscribed: false,
				},
			};
			let params;
			if (emailValidationError === "Valid Username") {
				params = {
					username: email,
					password,
				};
			} else {
				params = {
					email,
					password,
				};
			}
			const resp = await makeNetworkCall({
				HTTPmethod: "get",
				path: "login",
				params: params,
			});

			if (resp.error) {
				Alert.error("Something went wrong signing in.");
			} else {
				Alert.success("Successfully signed in.");
				dispatch(globalActions.setCookie(resp.cookie));
				dispatch(accountActions.setUser(resp));
				changeActiveScreen("LandingPage");
			}
		} else {
			alert(
				"Sign-in not successful. Please enter valid username/email and password."
			);
		}
		dispatch(globalActions.changeLoading(false));
	};

	if (loading) {
		return null;
	} else {
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
									label="Email or Username"
									autoComplete="off"
									name="username"
									value={email}
									onChange={onChangeEmail}
								/>
								<span className="error">{emailError}</span>
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
}
