import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const PostList = (props) => {

  if (props.posts) {
    return (null)} else {
      return (<ul></ul>)
    }
  }
  export default PostList;
