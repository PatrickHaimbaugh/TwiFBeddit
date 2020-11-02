import React, { Component, Fragment, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import uploadPicture from "../../util/uploadPicture";
import makeNetworkCall from "../../util/makeNetworkCall";
import {setPosts} from "../../containers/GlobalContainer/actions.js";
import * as navigationActions from "../../containers/NavigationContainer/actions";

export const Form = () => {

  const dispatch = useDispatch();

  const [charsLeft, setCharsLeft] = useState(500);
  const [isTopicChosen, setIsTopicChosen] = useState(false);

  //form variables
  const cookie = useSelector((state) => state.account.cookie)
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [postTitle, setPostTitle] = useState();
  const [dropdownTopic, setDropdownTopic] = useState();
  const [inputTopic, setInputTopic] = useState();
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState();

  //hard coded topic values
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const uploadedImage = React.useRef(null);
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
          current.src = e.target.result;
      }
      reader.readAsDataURL(file);
      setPostImage(file);
    }
  };

  const handleAnonymous = (event) => {
    const value = event.target.checked;
    setIsAnonymous(value);
  }

  const handleTitleChange = e => {
    setPostTitle(e.target.value);
  }

  const handleTopicSelect = selected => {
    setDropdownTopic(selected);
    if (selected === null){
      setIsTopicChosen(false);
    }else{
      setIsTopicChosen(true);
      setInputTopic("");
    }
  }

  const handleInputTopic = e => {
    setInputTopic(e.target.value);
  }

  const handlePostTextChange = (event) => {
    var input = event.target.value;
    setCharsLeft(500 - input.length);
    setPostText(input);
  }

  const changeActiveScreen = (screen) => {
		dispatch(navigationActions.changeCurrentPage(screen));
	};

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

    var uploadRsp = null;
    var uploadRspUrl = null;
    if (postImage && postImage != ""){
      uploadRsp = await uploadPicture(postImage, "postimg");
      uploadRspUrl = uploadRsp.imageUrlForMongoDB
      console.log(postImage);
      console.log(uploadRspUrl);
    }

    //derive topic
    var topic = null;
    if (dropdownTopic === null || dropdownTopic === undefined){
      topic = inputTopic;
    }else if (inputTopic === ""){
      topic = dropdownTopic.value;
    }

    if (topic != null){
      const params = {
        anonymous: isAnonymous,
        title: postTitle,
        topic: topic,
        post_type: "post",
        text: postText,
        image_url: uploadRspUrl,
      }

      const resp = await makeNetworkCall({
				HTTPmethod: "post",
				path: "posts",
				data: params,
				cookie: cookie,
			});
			if (resp.error) {
				console.log("Error creating post");
			} else {
				console.log("sucess creating info", resp);
				dispatch(setPosts(resp));
				changeActiveScreen("LandingPage");
			}
    }
  }

  return (
    <form onSubmit={onSubmit}>

      <div className="form-group">
        <label htmlFor="anonymous">Post as Anonymous? </label>
        <input
            name="anonymous"
            type="checkbox"
            checked={isAnonymous}
            onChange={handleAnonymous} />
      </div>

      <div className="form-group">
        <label htmlFor="title">Title of Post: </label>
        <input
          className="form-control"
          id="title"
          onChange={handleTitleChange}
          value={postTitle}
        />
      </div>
      <div className="form-group">
        <label htmlFor="topicsDropdown">Choose topic(s): </label>
        <Select
          id="topicsDropdown"
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          name="color"
          options={options}
          value={dropdownTopic}
          onChange={handleTopicSelect}
        />
      </div>
      <div className="form-group">
        <label htmlFor="topics">or create new topic for post: </label>
        <input
          className="form-control"
          id="topics"
          placeholder="eg. #burger"
          disabled={(isTopicChosen)? "disabled" : ""}
          onChange={handleInputTopic}
          value={inputTopic}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postText">Post text: </label>
        <textarea
          className="form-control"
          id="postText"
          maxLength="500"
          onChange={handlePostTextChange}
          value={postText}
        >
        </textarea>
        <p>Characters Left: {charsLeft}</p>
      </div>
      <div className="form-group">
        <label htmlFor="attachment">Post Image: </label>
        <input className="form-control-image" type="file" accept="image/*" onChange={handleImageUpload} multiple = "false" />
        <div className="form-image-cont">
          <img ref={uploadedImage} className="form-image" />
        </div>
      </div>

      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
