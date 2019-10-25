import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';


const ProfileShow = (props) => {
  if (props.profile){
    return(
      <React.Fragment>
        <BlockTitle>{dict.fullname}</BlockTitle>
        <List simple-list>
          <ListItem>{props.profile.fullname}</ListItem>
        </List>

      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default ProfileShow;
