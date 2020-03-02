import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';

const CourseShow = (props) => {
  if (props.course){
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.course.title}</ListItem>
        </List>

      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default CourseShow;
