import React, { Component } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Link,
  Tabs,
  Toolbar,
  Tab,
  Range,
  Block,
  Icon, Fab
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import ProfileShow from "../../containers/profiles/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    
    this.state = {
      token: window.localStorage.getItem('token'),
      profile: null,
      id: null,
      actuals: null,
      metas: null,
      channels: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('profiles', this.$f7route.params['profileId'], this.state.token);
  }

  getInstance() {
    var profile = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (profile && klass === 'Profile') {
      this.setState({
        profile: profile,
        id: profile.id,
      });
    }
  }

  fab() {
    if (this.state.profile) {
      return (
        <Fab href={"/profiles/" + this.state.profile.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }


  render() {
    const { profile } = this.state;
    return (
      <Page>
        <Navbar title={dict.profiles} backLink={dict.back} />
        {this.fab()}
        <ProfileShow profile={profile} />
      </Page>
    );
  }
}
