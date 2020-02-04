import React, { Component } from 'react';
import { Menu, MenuItem, MenuDropdown, MenuDropdownItem, Page, Navbar, Block, BlockTitle, List, ListItem, FabButton, FabButtons, Fab, Icon } from 'framework7-react';
import { dict } from '../../Dict';
export default class PanelRightPage extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.state = {
      token: window.localStorage.getItem('token'),
    }
  }

  logout(){
    this.setState({token: null});
    window.localStorage.removeItem('token');
    window.location.reload()
  }

  logged_in(token) {
    if (token) {
      return (
        <React.Fragment>
          <BlockTitle>{dict.user_settings}</BlockTitle>
          <List>
            <ListItem title={dict.logout} view="#main-view" panelClose onClick={this.logout}></ListItem>
          </List>
          <BlockTitle>{dict.settings}</BlockTitle>
          <List>
            <ListItem link="/posts/" title={dict.posts} view="#main-view" panelClose></ListItem>
            <ListItem link="/channels/" title={dict.channels} view="#main-view" panelClose></ListItem>
            <ListItem link="/profiles/" title={dict.profiles} view="#main-view" panelClose></ListItem>
            <ListItem link="/roles/" title={dict.roles} ignoreCache={true} view="#main-view" panelClose></ListItem>
            <ListItem link="/metas/" title={dict.metas} ignoreCache={true} view="#main-view" panelClose></ListItem>
          </List>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment> 
          <BlockTitle>{dict.user_settings}</BlockTitle>
          <List>
            <ListItem link="/login/" title={dict.login} view="#main-view" panelClose></ListItem>
          </List>
        </React.Fragment>
      )
    }
  }

  render() {
    const { token } = this.state;
    return (
      <Page >
        <Navbar title={dict.Shoa} />
        {this.logged_in(token)}
      </Page>
    );
  }
}