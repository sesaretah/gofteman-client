import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import WorkList from "./list"
import { dict} from '../../Dict';

const WorkIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.works} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <WorkList works={props.works}/>
    </Page>
  )
}
export default WorkIndex;
