import React, { Component, Fragment } from 'react';
import Select from 'react-select';

export const Form = ({ onSubmit }) => {

  const [charsLeft, setCharsLeft] = React.useState(500);
  const [isTopicChosen, setIsTopicChosen] = React.useState(false);
  const [dropdownTopic, setDropdownTopic] = React.useState();
  const [inputTopic, setInputTopic] = React.useState();
  const [isAnonymous, setIsAnonymous] = React.useState(false);

  //hard coded topic values
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleTextboxChange = (event) => {
    var input = event.target.value;
    setCharsLeft(500 - input.length);
  }

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
    }
  };

  const handleAnonymous = (event) => {
    const value = event.target.checked;
    setIsAnonymous(value);
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
        <input className="form-control" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="topics">Choose topic(s): </label>
        <Select
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
          maxlength="500"
          onChange={handleTextboxChange}>
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
