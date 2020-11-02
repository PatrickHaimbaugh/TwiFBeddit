import React, { useState } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import {
	Content,
	MyInput,
	MyControlLabel,
	Title,
} from "../styles/editAccountPageStyle";
import { Form, FormGroup, FormControl, ButtonToolbar, Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import uploadPicture from "../util/uploadPicture";
import makeNetworkCall from "../util/makeNetworkCall";
import * as navigationActions from "../containers/NavigationContainer/actions";
import * as accountActions from "../containers/AccountContainer/actions";

const EditAccountPage = () => {
	const [email, setEmail] = useState(""),
		[password, setPassword] = useState(""),
		[confirmPassword, setConfirmPassword] = useState(""),
		[bio, setBio] = useState(""),
		username = useSelector((state) => state.account.username),
		storeEmail = useSelector((state) => state.account.email),
		cookie = useSelector((state) => state.global.cookie),
		dispatch = useDispatch(),
		[profilePic, setProfilePic] = useState("");

	const validateEmail = (value) => {
		const error = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			value
		)
			? ""
			: "You must enter a valid email address";
		// setEmailError(error);
		return error;
	};

	const validatePassword = (password, confirmPassword) => {
		if (
			password.length < 8 ||
			!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$&+,:;=?@#|'<>.^*()%!-]{8,}$/.test(
				password
			)
		) {
			return "Password must have atleast 8 characters and one upper case letter";
		}
		if (password != confirmPassword) {
			return "Passwords do not match";
		}
		return "";
	};

	const validateBio = (bio) => {
		return bio.length <= 500 ? "" : "Bio must be below 500 characters";
	};

	const picChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// event.persist();
		setProfilePic(event.target.files[0]);
	};

	const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
	};

	const Submit = async (e) => {
		e.preventDefault();

		const emailValidationError = validateEmail(email);
		const passwordValidationError = validatePassword(password, confirmPassword);
		const bioValidationError = validateBio(bio);
		if (emailValidationError != "") {
			alert(emailValidationError);
		} else if (passwordValidationError != "") {
			alert(passwordValidationError);
		} else if (bioValidationError != "") {
			alert(bioValidationError);
		} else if (!profilePic) {
			alert("Please Include a Profile Picture");
		} else {
			//data is valid, send to db
			const uploadRsp = await uploadPicture(profilePic, "profile");

			const params = {
				email,
				password,
				profile_picture: uploadRsp.imageUrlForMongoDB,
				bio,
			};
			const resp = await makeNetworkCall({
				HTTPmethod: "patch",
				path: "users",
				params,
				cookie,
			});
			if (resp.error) {
				console.log("Error Updating Info");
			} else {
				console.log("sucess updating info", resp);
				dispatch(accountActions.setUser(resp));
				changeActiveScreen("Account");
			}
		}
	};
	return (
		<Col col={12}>
			<Row>
				<Col col={12}>
					<Title>Edit Profile</Title>
				</Col>
			</Row>
			<Row>
				<Content col={8} offset={2}>
					<Form fluid>
						<FormGroup>
							<MyControlLabel>Username</MyControlLabel>
							<FormControl name="username" value={username} disabled={true} />
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Profile Picture</MyControlLabel>
							{/* <FormControl name="profilePic" type="file" onChange={picChange} /> */}
							<input
								type="file"
								accept="image/png"
								onChange={picChange}
							></input>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Email</MyControlLabel>
							<FormControl
								name="email"
								onChange={(e) => {
									setEmail(e);
								}}
								type="email"
								placeholder={storeEmail}
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>New Password</MyControlLabel>
							<FormControl
								name="Password"
								onChange={(e) => setPassword(e)}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Confirm New Password</MyControlLabel>
							<FormControl
								name="confirmPassword"
								onChange={(e) => setConfirmPassword(e)}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Bio</MyControlLabel>
							<FormControl
								rows={5}
								name="Bio"
								value={bio}
								onChange={(e) => setBio(e)}
								componentClass="textarea"
								placeholder="Type Bio Here"
							/>
						</FormGroup>
						<FormGroup>
							<ButtonToolbar>
								<Button appearance="primary" onClick={(e) => Submit(e)}>
									Save
								</Button>
							</ButtonToolbar>
						</FormGroup>
					</Form>
				</Content>
			</Row>
		</Col>
	);
};

export default EditAccountPage;
