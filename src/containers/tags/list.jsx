import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const TagList = (props) => {

  if (props.tags) {
    return (
      <List mediaList>
        {props.tags.map((tag) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/tags/" + tag.id}
            ignoreCache={true}
            title={tag.title}
            after=""
            subtitle=""
            text=""
            ></ListItem>
        )}
      </List>
    )} else {
      return (<ul></ul>)
    }
  }
  export default TagList;
