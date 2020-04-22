import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';
import AssignmentForm from "../assignments/form";
import AssignmentList from "../assignments/list";

import AccessControlForm from "../access_controls/form";
import AccessControlList from "../access_controls/list";

const TimeSheetShow = (props) => {
  if (props.time_sheet){
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.title}</ListItem>
        </List>

        
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default TimeSheetShow;
