import React from "react";
import { List,ListItem } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';
import ExpertiesList from "./experties";

const ProfileList = (props) => {

  if (props.profiles) {
    return (
      <List mediaList>
        {props.profiles.map((profile) =>
          <ListItem
          key={crypto.lib.WordArray.random(32)}
          link={"/profiles/" + profile.id}
          title={profile.fullname}
          after=""
          subtitle=""
          text=""
          >
                <img slot="media" src={profile.avatar} width="40" height="40" />
          </ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default ProfileList;
