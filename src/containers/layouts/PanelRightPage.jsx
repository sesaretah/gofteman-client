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
    window.location.replace('/')
  }

  logged_in(token) {
    if (token) {
      return (
        <React.Fragment>
          <BlockTitle>{dict.user_settings}</BlockTitle>
          <List>
            <ListItem view="#main-view" panelClose onClick={this.logout}>
            <i className="va ml-5 fa fa-power-off"></i>
              <span>{dict.logout}</span>
            </ListItem>
          </List>
          <BlockTitle> <i className="va ml-5 fa fa-tachometer"></i>{dict.dashboard}</BlockTitle>
          <List>
            <ListItem link="/tasks/" view="#main-view" panelClose>
              <i className="va ml-5 fa fa-tasks"></i>
              <span>{dict.tasks}</span>
            </ListItem>
            
            <ListItem link="/profiles/"  view="#main-view" panelClose>
              <i className="va ml-5 fa fa-user-circle-o"></i>
              <span>{dict.profiles}</span>
            </ListItem>
            
            </List>
            <BlockTitle> <i className="va ml-5 fa fa-cogs"></i>{dict.settings}</BlockTitle>
            <List>
            <ListItem link="/roles/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-shield"></i>
              <span>{dict.roles}</span>
            </ListItem>
            <ListItem link="/metas/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-th"></i>
              <span>{dict.metas}</span>
            </ListItem>
            <ListItem link="/statuses/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-circle-o"></i>
              <span>{dict.statuses}</span>
            </ListItem>
            <ListItem link="/tags/" ignoreCache={true} view="#main-view" panelClose>
            <i className="va ml-5 fa fa-tags"></i>
              <span>{dict.tags}</span>
            </ListItem>
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
        <Navbar title={dict.tavan} />
        {this.logged_in(token)}
      </Page>
    );
  }
}