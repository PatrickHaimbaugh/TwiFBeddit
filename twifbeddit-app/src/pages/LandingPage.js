import React, { useState } from "react";
import { CreatePostContainer } from '../components/CreatePost/CreatePostContainer';
import './createPostDisplayStyle.css';

const LandingPage = () => {

	const triggerText = 'Create Post';
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.title.value);
    console.log(event.target.topics.value);
		console.log(event.target.postText.value);
  };

	return (
		<div>
			<h1>Landing Page</h1>
			<CreatePostContainer triggerText={triggerText} onSubmit={onSubmit} />
		</div>
	);
};

export default LandingPage;
