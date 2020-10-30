import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useState } from "react";
import Copyright from "../components/copyright.component.js";
import { useDispatch } from "react-redux";
import * as navigationActions from "../containers/NavigationContainer/actions";
import makeNetworkCall from "../util/makeNetworkCall.js";
import * as accountActions from "../containers/AccountContainer/actions";

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
	error: {
		color: "red",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export interface ISignUpResult {
	success: boolean;
	message: string;
}

interface IProps {
	onSignUp: (data: ISignUpData) => ISignUpResult;
}

/*const state = {
  email: '',
  password: ''
}*/

export default function IndividualSignUp() {
	const classes = useStyles();

	const [email, setEmail] = useState("patTest2@test.com");
	const [emailError, setEmailError] = useState("");
	const [username, setUsername] = useState("patTest2");
	const [usernameError, setUsernameError] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [subscribe, setSubscribe] = useState(false);
	const [accept, setAccept] = useState(false);

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

	const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.currentTarget.value);
		validateUsername(e.currentTarget.value);
	};

	const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setSubscribe(e.currentTarget.value);
	};

	const onChangeConditionsCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setAccept(e.currentTarget.checked);
	};

	const validateEmail = (value: string): string => {
		const error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			value
		)
			? ""
			: "You must enter a valid email address";
		setEmailError(error);
		return error;
	};

	const validateUsername = (value: string): string => {
		const error = value ? "" : "You must enter a valid Username";
		setUsernameError(error);
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

		const emailValidationError = validateEmail(email);
		const usernameValidationError = validateUsername(username);
		const passwordValidationError = validatePassword(password);
		if (accept) {
			if (
				emailValidationError === "" &&
				usernameValidationError === "" &&
				passwordValidationError === ""
			) {
				const newUserDetails = {
					user: {
						password: password,
						subscribed: subscribe,
					},
				};
				//setSubmitResult(result);
				//setSubmitted(true);
				const resp = await makeNetworkCall({
					HTTPmethod: "post",
					path: "users",
					data: {
						email,
						username,
						password,
					},
				});
				if (resp.error) {
					console.log("Error Signing Up");
				} else {
					dispatch(accountActions.setUser(resp));
					changeActiveScreen("LandingPage");
				}

				// axios
				// 	.post("http://localhost:5000/api/unverified/new", newUserDetails)
				// 	.then((res) => {
				// 		if (res.data.errors) {
				// 			console.log(res.data);
				// 			if (res.data.errors.email === "is already taken.") {
				// 				alert("Email is already taken. Please sign-in instead!");
				// 			}
				// 		} else {
				// 			alert("Confirmation email sent");
				// 			window.location = "/verification"; //// TODO:
				// 		}
				// 	})
				// 	.catch((err) => console.log("axios error: ", err));
			} else {
				alert(
					"Sign-in not successful. Please enter valid email, username, and password."
				);
			}
		} else {
			alert("You must accept terms and conditions to sign-up.");
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>{/*<LockOutlinedIcon />*/}</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={onSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={onChangeEmail}
							/>
							<span className={classes.error}>{emailError}</span>
						</Grid>
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
							<span className={classes.error}>{usernameError}</span>
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
							<span className={classes.error}>{passwordError}</span>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										onChange={onChangeConditionsCheckbox}
										value="allowExtraEmails"
										color="primary"
									/>
								}
								label="I have read and agreed to the terms and conditions."
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
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link
								href="/"
								onClick={() => changeActiveScreen("SignIn")}
								className="nav-link"
								variant="body2"
							>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
