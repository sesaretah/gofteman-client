import React from "react";
import { Page, Navbar, Subnavbar, Searchbar, BlockTitle, Link, Fab, Icon, Toolbar, Tabs, Tab, Block } from 'framework7-react';
import NotificationList from "./list"
import { dict } from '../../Dict';

const NotificationIndex = (props) => {
  return (
    <Page>
      <Navbar title={dict.notifications} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>

      <NotificationList notifications={props.notifications} loadMore={props.loadMore} />

    </Page>
  )
}
export default NotificationIndex;
