import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';
import AssignmentForm from "../assignments/form";
import AssignmentList from "../assignments/list";

import AccessControlForm from "../access_controls/form";
import AccessControlList from "../access_controls/list";

const RoleShow = (props) => {
  if (props.role){
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.role.title}</ListItem>
        </List>

        <AccessControlList  ability={props.ability} removeAbility={props.removeAbility}/>
        <AccessControlForm  addAbility={props.addAbility} handleChange={props.handleChange} />
        

        <AssignmentList users={props.assignedUsers} removeRole={props.removeRole} />
        <AssignmentForm users={props.users}  submit={props.submit} handleChange={props.handleChange}/>

        
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default RoleShow;
