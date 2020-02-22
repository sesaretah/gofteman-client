import React, { Component } from 'react';
import {
  Page,
  Navbar,
  Link,
  Icon, Fab
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import ChannelShow from "../../containers/channels/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);


    this.state = {
      channel: null,
      sheetOpened: false,
      token: window.localStorage.getItem('token'),

    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  componentDidMount(){
    MyActions.getInstance('channels', this.$f7route.params['channelId'], this.state.token);
  }

  getInstance(){
    var channel = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (channel && klass === 'Channel'){
      this.setState({
        channel: channel,
      });
    }
    console.log('channel', channel);
  }

  setInstance(){
    var channel = ModelStore.getIntance()
    if(channel){
      this.setState({
        channel: channel,
      });
    }
    console.log(channel);
  }


  fab(){
    if (this.state.channel){
      return(
        <Fab href={"/channels/"+this.state.channel.id+"/edit"} target="#main-view"  position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type=null, source_id=null){
    var data = {interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id}
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const {channel, sheetOpened} = this.state;
    return (
      <Page>
        <Navbar title={dict.channels} backLink={dict.back} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
        </Navbar>

        {this.fab()}
        <ChannelShow channel={channel} sheetOpened={sheetOpened} interaction={this.interaction} />
      </Page>
    );
  }
}
