import React from "react";
import { List, ListItem, Button, Icon} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const UserOptions = (props) => {
  var options = [<option value=''></option>]
  if(props.users){
    for (let i = 0; i < props.users.length; i++) {
      options.push(
        <option value={props.users[i].id}>
          {props.users[i].username}
        </option>
      )
    }

  }
  return options

}
export default UserOptions;
