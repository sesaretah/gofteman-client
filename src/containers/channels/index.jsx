import React from "react";
import { Page, Navbar,Searchbar, Subnavbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import ChannelList from "./list"
import { dict} from '../../Dict';

const ChannelIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.channels} >
      <Subnavbar inner={false}>
        <Searchbar
          disableButtonText={dict.cancel}
          placeholder={dict.search}
          onChange={(e) => {
            props.search({ query: e.target.value})
          }}
        ></Searchbar>
      </Subnavbar>
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
