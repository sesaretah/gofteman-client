  
import React from "react";
import { List, ListItem, Button, Icon} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const UserList = (props) => {
    var body = []
  if(props.users){

    
    for (let i = 0; i < props.users.length; i++) {
        var td = []
        body.push(<tr key={crypto.lib.WordArray.random(32)}>
        <td key={crypto.lib.WordArray.random(32)}>{props.users[i].id}</td>
        <td key={crypto.lib.WordArray.random(32)}>{props.users[i].email}</td>
        <td className="checkbox-cell" key={crypto.lib.WordArray.random(32)}>
            <Button color='gray' onClick={() => props.removeRole(props.users[i].id)}>
              <Icon ios="f7:trash" aurora="f7:trash" md="material:trash"></Icon>
            </Button>
          </td>
        </tr>)
    }

  return(
    <div className="data-table card">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Email</td>
          </tr>
        </thead>

        <tbody>
          {body}
        </tbody>
      </table>
    </div>

  )
}
else {
  return(null)
}
}
export default UserList;