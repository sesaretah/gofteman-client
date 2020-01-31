import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import MetaList from "./list"
import { dict} from '../../Dict';

const MetaIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.metas} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/metas/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <MetaList metas={props.metas}/>
    </Page>
  )
}
export default MetaIndex;
