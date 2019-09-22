import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon} from 'framework7-react';
import WorkflowList from "./list"
import { dict} from '../../Dict';

const WorkflowIndex = (props) => {
  return(
    <Page>
      <Fab href="/workflows/new" target="#main-view"  position="left-bottom" slot="fixed" color="orange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <Navbar title={dict.workflows} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <WorkflowList workflows={props.workflows}/>
    </Page>
  )
  }
  export default WorkflowIndex;
