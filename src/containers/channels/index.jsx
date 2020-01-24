import React from "react";
import { Page, Navbar,NavRight, Link, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import ChannelList from "./list"
import { dict} from '../../Dict';

const ChannelIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.channels} >
      <NavRight>
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </NavRight>
      </Navbar>
      <BlockTitle></BlockTitle>
      <Fab href="/channels/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <ChannelList channels={props.channels} interaction={props.interaction} />
    </Page>
  )
}
export default ChannelIndex;
