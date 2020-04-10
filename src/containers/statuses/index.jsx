import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import StatusList from "./list"
import { dict} from '../../Dict';

const StatusIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.statuses} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/statuses/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <StatusList statuses={props.statuses}/>
    </Page>
  )
}
export default StatusIndex;
