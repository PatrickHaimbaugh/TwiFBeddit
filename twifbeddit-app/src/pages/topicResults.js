import React, { useState, useEffect } from "react";

import { Page, Content } from "../styles/accountPageStyle";
import Post from "../components/Post.js";
import makeNetworkCall from "../util/makeNetworkCall";
import { useSelector } from "react-redux";

/*export default class home extends Component {



  constructor(props){
    super(props);

    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: []
    }
  }

  async getPosts(){
    const topic = searchRequest
		console.log(this.props);
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


  componentDidMount() {
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
                  Title={post.title}
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
}*/

export default function SearchResults() {
	const searchRequest = useSelector((state) => state.navigation.searchRequest);

	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		const topic = searchRequest;
		const resp = await makeNetworkCall({
			HTTPmethod: "get",
			path: "posts",
			params: {
				topic: topic,
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
			/*this.setState({
        posts: postsArray,
      })*/
			console.log(postsArray);
			setPosts(postsArray);
		}
	};
	//getPosts()
	useEffect(() => {
		async function syncGetPosts() {
			await getPosts();
		}
		syncGetPosts();
	}, []);

	return (
		<Page col={12}>
			<Content>
				{posts.map(function (post) {
					return (
						<Post
							Username={post.author}
							Title={post.title}
							Topic={post.topic}
							Body={post.text}
							Upvotes={post.upvotes}
							Downvotes={post.downvotes}
							userVote="upvote"
							Image={post.image_url}
							PostId={post._id}
							Post={post}
						></Post>
					);
				})}
			</Content>
		</Page>
	);
}
