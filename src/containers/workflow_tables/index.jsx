import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import WorkflowTableList from "./list"
import { dict} from '../../Dict';

const WorkflowTableIndex = (props) => {
  if (props.workflowTables && props.workflows && props.auxiliaryTables){
    return (
      <Page>
        <Navbar title={dict.workflow_tables} backLink={dict.back} >
        </Navbar>
        <BlockTitle>{dict.list}</BlockTitle>
        <Fab href="/workflow_tables/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
          <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
        <WorkflowTableList workflowTables={props.workflowTables} workflows={props.workflows} auxiliaryTables={props.auxiliaryTables} remove={props.remove}/>
      </Page>
    )
  } else {
    return(null)
  }
}
export default WorkflowTableIndex;
