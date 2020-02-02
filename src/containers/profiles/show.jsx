import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';
import ActualForm from "../actuals/form";
import ActualList from "../actuals/list";

const ProfileShow = (props) => {
  if (props.profile){
    return(
      <React.Fragment>
        <BlockTitle>{dict.fullname}</BlockTitle>
        <List simple-list>
          <ListItem>{props.profile.fullname}</ListItem>
        </List>

        {props.metas.map((m) =>
        <React.Fragment>
          <ActualList meta={m.meta} editable={false} actuals={m.actuals} removeActual={props.removeActual} />
        </React.Fragment>
        )}

      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default ProfileShow;
