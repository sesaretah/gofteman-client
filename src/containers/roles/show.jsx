import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';


const RoleShow = (props) => {
  if (props.role){
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.role.title}</ListItem>
        </List>

      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default RoleShow;
