import React, { Component } from 'react';

import {
	Page,
	Content,
} from "../styles/accountPageStyle";
import Post from '../components/Post.js';
import makeNetworkCall from "../util/makeNetworkCall";

export default class home extends Component {

  constructor(props){
    super(props);

    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: []
    }
  }

  async getPosts(){
    const topic = this.props.match.params.topic;
    const resp = await makeNetworkCall({
      HTTPmethod: "get",
      path: "posts",
      params: {
        topic: topic
      },
    });
    if (resp.error) {
      console.log("Error receving posts");
    } else {
      //Convert list of JSON post objects into array
      var postsArray = [];
      for (var i = 0; i < resp.posts.length; i++) {
        var obj = resp.posts[i];
        console.log(obj);
        postsArray.push(obj);
      }
      this.setState({
        posts: postsArray,
      })
    }
  }

  /*parseJsonObjects(postsList) {
  }*/

  componentDidMount() {
    //const postsAsJson = this.getPosts();
    //this.parseJsonObjects(postsAsJson);
    this.getPosts();
  }

  render() {
    return (
      <Page col={12}>
  			<Content>

          {
              this.state.posts.map(function(post) {
                return <Post
                  Username={post.author}
                  Title="test"
                  Topic={post.topic}
                  Body={post.text}
                  Upvotes={post.upvotes}
                  Downvotes={post.downvotes}
                  userVote="upvote"
                  Image={post.image_url}
                ></Post>
              })
          }
        </Content>
      </Page>
    );
  }
}
