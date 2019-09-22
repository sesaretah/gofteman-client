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
  Button, Icon, Fab,Searchbar, Subnavbar
} from 'framework7-react';
import { dict} from '../Dict';

export default () => (
  <Page>
    <Navbar>
      <NavLeft>
        <Icon fa="home"></Icon>
      </NavLeft>
      <NavTitle>{dict.home}</NavTitle>
      <NavRight>
        <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right"></Link>
      </NavRight>
      <Subnavbar>
        <Searchbar
          disableButtonText
          placeholder={dict.search}
          clearButton={false}
        ></Searchbar>
      </Subnavbar>
    </Navbar>
    <Toolbar bottom>
      <Link>Left Link</Link>
      <Link>Right Link</Link>
    </Toolbar>
    <Block strong>
      <p>Here is your blank Framework7 app. Lets see what we have here.</p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem link="/about/" title="About"></ListItem>
      <ListItem link="/form/" title="Form"></ListItem>
    </List>
    <BlockTitle>Modals</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill  popupOpen="#popup">Popup</Button>
        </Col>
        <Col width="50">
          <Button fill  loginScreenOpen="#login-screen">Login Screen</Button>
        </Col>
      </Row>
    </Block>
    <BlockTitle>Panels</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill  panelOpen="left">Left Panel</Button>
        </Col>
        <Col width="50">
          <Button fill raised panelOpen="right">Right Panel</Button>
        </Col>
      </Row>
    </Block>
    <List>
      <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></ListItem>
      <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"></ListItem>
    </List>
    <Fab href="/document_form/" target="#main-view"  position="left-bottom" slot="fixed" color="orange">
      <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
      <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
    </Fab>
  </Page>
);
