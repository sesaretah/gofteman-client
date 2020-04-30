import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';


const GroupShow = (props) => {
  if (props.group){
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.group.title}</ListItem>
        </List>

        <List className='fs-11'>
        {props.group.the_grouping.map((item) =>
          <ListItem
            key={'involvement' + item.profile.id}
            title={item.profile.fullname}
            after=''>
            <img slot="media" src={item.profile.avatar} width="27" height="27" />
          </ListItem>
        )}
      </List>

      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default GroupShow;
