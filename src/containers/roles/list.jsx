import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const RoleList = (props) => {

  if (props.roles) {
    return (
      <List mediaList>
        {props.roles.map((role) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/roles/" + role.id}
            ignoreCache={true}
            title={role.title}
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
  export default RoleList;
