import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const PostList = (props) => {

  if (props.posts) {
    return (
      <List mediaList>
        {props.posts.map((post) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/posts/" + post.id}
            ignoreCache={true}
            title={post.title}
            after=""
            subtitle=""
            text={post.abstract}
            ></ListItem>
        )}
      </List>
    )} else {
      return (<ul></ul>)
    }
  }
  export default PostList;
