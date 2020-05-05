import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button, Icon, Fab, Searchbar, Subnavbar
} from 'framework7-react';
import { dict } from '../../Dict';

export default () => (
  <Page className="no-swipe-panel">
    <Navbar>

      <NavLeft>
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </NavLeft>
    </Navbar>
  </Page>
);
