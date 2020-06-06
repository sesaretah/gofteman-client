import React from "react";
import { Page, Navbar, Link, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import ShortnerList from "./list"
import { dict} from '../../Dict';

const ShortnerIndex = (props) => {
  return(
    <Page>
        <Navbar title={dict.shortners}  >
          <Link panelOpen="right">
            <Icon f7="bars"></Icon>
          </Link>
        </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/shortners/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <ShortnerList shortners={props.shortners}/>
    </Page>
  )
}
export default ShortnerIndex;
