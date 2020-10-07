import React, { useState } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import {
	Content,
	MyInput,
	MyControlLabel,
	Title,
} from "../styles/editAccountPageStyle";
import { Form, FormGroup, FormControl, ButtonToolbar, Button } from "rsuite";
import { useSelector } from "react-redux";

const EditAccountPage = () => {
	const [email, setEmail] = useState(""),
		[oldPassword, setOldPassword] = useState(""),
		[newPassword, setNewPassword] = useState(""),
		[confirmNewPassword, setConfirmNewPassword] = useState(""),
		[bio, setBio] = useState(""),
		username = useSelector((state) => state.account.username),
		storeEmail = useSelector((state) => state.account.email);

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
							<MyControlLabel>Email</MyControlLabel>
							<FormControl
								name="email"
								value={email}
								onChange={(e) => setEmail(e.value)}
								type="email"
								placeholder={storeEmail}
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Old Password</MyControlLabel>
							<FormControl
								name="oldPassword"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.value)}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>New Password</MyControlLabel>
							<FormControl
								name="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.value)}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Confirm New Password</MyControlLabel>
							<FormControl
								name="confirmNewPassword"
								value={confirmNewPassword}
								onChange={(e) => setConfirmNewPassword(e.value)}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<MyControlLabel>Bio</MyControlLabel>
							<FormControl
								rows={5}
								name="Bio"
								value={bio}
								onChange={(e) => setBio(e.value)}
								componentClass="textarea"
								placeholder="Type Bio Here"
							/>
						</FormGroup>
						<FormGroup>
							<ButtonToolbar>
								<Button appearance="primary">Save</Button>
							</ButtonToolbar>
						</FormGroup>
					</Form>
				</Content>
			</Row>
		</Col>
	);
};

export default EditAccountPage;
