import React from "react";
import { List, ListItem, Link} from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const SimpleList = (props) => {
  if (props.profiles) {
    function addLink(profile){
        if (props.addProfile){
            return(<Link onClick={()=> props.addProfile(profile.id)}>{dict.add}</Link>)
        } 
        if (props.removeProfile){
            return(<Link onClick={()=> props.removeProfile(profile.id)}>{dict.remove}</Link>)
        } 
    }
    return (
      <List>
        {props.profiles.map((profile) =>
          <ListItem
          title={profile.fullname}
          subtitle="..."
          after={addLink(profile)}>
          <img slot="media" src={profile.avatar} width="27" height="27"/>
          </ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default SimpleList;
