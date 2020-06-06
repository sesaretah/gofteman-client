import React from "react";
import { List, ListItem, Card } from 'framework7-react';
import { dict } from '../../Dict';
import { Chart } from 'react-charts'
import { color } from "d3";

const ProfileShow = (props) => {

  if (props.profile) {
    console.log(props)
    return (
      <React.Fragment>
        <List className='fs-12'>
          <ListItem
            key={'profile-show' + props.profile.id}
            title={props.profile.fullname}
            after=''>
            <img slot="media" src={props.profile.avatar} width="27" height="27" />
          </ListItem>

        </List>
      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default ProfileShow;
