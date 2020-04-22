import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import TimeSheetList from "./list"
import { dict} from '../../Dict';

const TimeSheetIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.time_sheets} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/time_sheets/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <TimeSheetList time_sheets={props.time_sheets}/>
    </Page>
  )
}
export default TimeSheetIndex;
