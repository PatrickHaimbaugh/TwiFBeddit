import React, { useState } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import {
	Content,
	MyInput,
	MyControlLabel,
	Title,
	MyButtonToolbar,
} from "../styles/editAccountPageStyle";
import {
	Form,
	FormGroup,
	FormControl,
	ButtonToolbar,
	Button,
	Modal,
	Icon,
	Alert,
} from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import uploadPicture from "../util/uploadPicture";
import makeNetworkCall from "../util/makeNetworkCall";
import * as navigationActions from "../containers/NavigationContainer/actions";
import * as accountActions from "../containers/AccountContainer/actions";
import * as globalActions from "../containers/GlobalContainer/actions";

const EditAccountPage = ({ loading }) => {
	const [email, setEmail] = useState(""),
		[password, setPassword] = useState(""),
		[confirmPassword, setConfirmPassword] = useState(""),
		[bio, setBio] = useState(""),
		username = useSelector((state) => state.account.username),
		storeEmail = useSelector((state) => state.account.email),
		cookie = useSelector((state) => state.global.cookie),
		dispatch = useDispatch(),
		[showModal, setShowModal] = useState(false),
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

	const updateUsernameForAccount = (username) => {
		dispatch(navigationActions.setUsernameForAccountPage(username));
	};

	const Submit = async (e) => {
		e.preventDefault();
		dispatch(globalActions.changeLoading(true));

		const emailValidationError = validateEmail(email);
		const passwordValidationError = validatePassword(password, confirmPassword);
		const bioValidationError = validateBio(bio);
		if (emailValidationError != "" && email.length > 0) {
			Alert.error(emailValidationError, 4000);
		} else if (passwordValidationError != "" && password.length > 0) {
			Alert.error(passwordValidationError, 4000);
		} else if (bioValidationError != "" && bio.length > 0) {
			Alert.error(bioValidationError, 4000);
		} else {
			//data is valid, send to db
			let uploadRsp;
			if (profilePic) {
				uploadRsp = await uploadPicture(profilePic, "profile");
			}

			// let params = {
			// 	//change this
			// 	if (email.length > 0) {
			// 		email,
			// 	}
			// 	email,
			// 	password,
			// 	profile_picture: uploadRsp.imageUrlForMongoDB,
			// 	bio,
			// };
			let params = {};
			let sendReq = false;
			if (email.length > 0) {
				params.email = email;
				sendReq = true;
			}
			if (password.length > 0) {
				params.password = password;
				sendReq = true;
			}
			if (profilePic) {
				params.profile_picture = uploadRsp.imageUrlForMongoDB;
				sendReq = true;
			}
			if (bio.length > 0) {
				params.bio = bio;
				sendReq = true;
			}
			if (sendReq) {
				const resp = await makeNetworkCall({
					HTTPmethod: "patch",
					path: "users",
					params,
					cookie,
				});
				if (resp.error) {
					Alert.error(
						"Something went wrong when updating Account Information.",
						4000
					);
				} else {
					dispatch(globalActions.changeLoading(false));
					dispatch(accountActions.setUser(resp));
					updateUsernameForAccount(username);
					changeActiveScreen("Account");
					Alert.success("Successfully updated Account Information.", 4000);
				}
			} else {
				Alert.info(
					"Please change something on your account before submitting.",
					4000
				);
			}
			dispatch(globalActions.changeLoading(false));
		}
	};

	const logout = () => {
		// reset account info
		dispatch(accountActions.logout());
		// delete cookie and reset posts to empty
		dispatch(globalActions.logout());
		// set page to landing page
		dispatch(navigationActions.logout());
	};

	const deleteAccount = async () => {
		await makeNetworkCall({
			HTTPmethod: "delete",
			path: "users",
			cookie,
		}).then((resp) => {
			if (resp.error) {
				Alert.error("Something went wrong when deleting this user.", 4000);
			} else {
				Alert.success("Successfully deleted this user.", 4000);
			}
		});
		logout();
		changeActiveScreen("LandingPage");
	};

	return (
		<Col col={12} hidden={loading ? true : false}>
			{/* Delete Account Modal */}
			<Modal
				backdrop="static"
				show={showModal}
				onHide={() => setShowModal(!showModal)}
				size="xs"
			>
				<Modal.Body>
					<Icon
						icon="remind"
						style={{
							color: "#ffb300",
							fontSize: 24,
						}}
					/>
					{"  "}
					Once your account has been deleted there is no getting it back. This
					is permanent. Are you sure you want to Delete Your Account?
				</Modal.Body>
				<Modal.Footer>
					<MyButtonToolbar>
						<Button
							onClick={() => setShowModal(!showModal)}
							appearance="primary"
						>
							Cancel
						</Button>
						<Button onClick={() => deleteAccount()} color="red">
							Delete My Account
						</Button>
					</MyButtonToolbar>
				</Modal.Footer>
			</Modal>

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
							<MyControlLabel>New Profile Picture</MyControlLabel>
							{/* <FormControl name="profilePic" type="file" onChange={picChange} /> */}
							<input
								type="file"
								accept="image/png"
								onChange={picChange}
							></input>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>New Email</MyControlLabel>
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
							<MyControlLabel>New Bio</MyControlLabel>
							<FormControl
								rows={5}
								name="Bio"
								value={bio}
								onChange={(e) => setBio(e)}
								componentClass="textarea"
								placeholder="New Bio Here"
							/>
						</FormGroup>
						<FormGroup>
							<MyButtonToolbar>
								<Button appearance="primary" onClick={(e) => Submit(e)}>
									Save
								</Button>
								<Button color="red" onClick={() => setShowModal(true)}>
									Delete Account
								</Button>
							</MyButtonToolbar>
						</FormGroup>
					</Form>
				</Content>
			</Row>
		</Col>
	);
};

export default EditAccountPage;
