import React from 'react';

export const Form = ({ onSubmit }) => {
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

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title of Post: </label>
        <input className="form-control" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="topics">Topic(s): </label>
        <input className="form-control" id="topics" placeholder="eg. #burger"/>
      </div>
      <div className="form-group">
        <label htmlFor="postText">Post text: </label>
        <textarea
          className="form-control"
          id="postText"
        />
      </div>
      <div className="form-group">
        <input type="file" accept="image/*" onChange={handleImageUpload} multiple = "false" />
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
