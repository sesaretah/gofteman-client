import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const StatusList = (props) => {

  if (props.statuses) {
    return (
      <List mediaList>
        {props.statuses.map((status) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/statuses/" + status.id}
            ignoreCache={true}
            title={status.title}
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
  export default StatusList;
