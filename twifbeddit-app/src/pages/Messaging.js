import React, { useState } from "react";
import { CreatePostContainer } from '../components/CreatePost/CreatePostContainer';
import './createPostDisplayStyle.css';

const LandingPage = () => {

	const triggerText = 'Create Post';

	return (
		<div>
			<CreatePostContainer triggerText={triggerText} />
		</div>
	);
};

export default LandingPage;
