import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';
import AssignmentForm from "../assignments/form";
import AssignmentList from "../assignments/list";

import AccessControlForm from "../access_controls/form";
import AccessControlList from "../access_controls/list";

const TagShow = (props) => {
  if (props.tag){
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.tag.title}</ListItem>
        </List>

        <BlockTitle>{dict.confirmed}</BlockTitle>
        <List simple-list>
          <ListItem>{dict[props.tag.confirmed]}</ListItem>
        </List>

        
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default TagShow;
