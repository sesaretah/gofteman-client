import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const ProfileList = (props) => {

  if (props.profiles) {
    return (
      <List mediaList>
        {props.profiles.map((profile) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/profiles/" + profile.id}
            ignoreCache={true}
            title={profile.fullname}
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
  export default ProfileList;
