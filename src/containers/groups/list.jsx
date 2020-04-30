import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const GroupList = (props) => {

  if (props.groups) {
    return (
      <List mediaList>
        {props.groups.map((group) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/groups/" + group.id}
            ignoreCache={true}
            title={group.title}
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
  export default GroupList;
