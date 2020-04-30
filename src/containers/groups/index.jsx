import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import GroupList from "./list"
import { dict} from '../../Dict';

const GroupIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.groups} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/groups/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <GroupList groups={props.groups}/>
    </Page>
  )
}
export default GroupIndex;
