import React, { Component } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Icon
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import ChannelForm from "../../containers/channels/form"
import Framework7 from 'framework7/framework7.esm.bundle';


export default class ChannelUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.getList = this.getList.bind(this)

    this.state = {
      channel: {title: '', draft: ''},
      token: window.localStorage.getItem('token'),
      id: null,
      title: null,
      content: null,
      page: 0
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_list", this.getList);
  }

  submit(){
    var data = {id: this.state.id, title: this.state.title, content: this.state.content}
    MyActions.updateInstance('channels', data, this.state.token);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['channelId']) {
      MyActions.getInstance('channels', this.$f7route.params['channelId'], this.state.token);
    }
  }

  getList() {

  }

  getInstance(){
    var channel = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (channel && klass === 'Channel'){
      this.setState({
        channel: channel,
        title: channel.title,
        id: channel.id,
        content: channel.content
      });
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }

  onEditorStateChange(editorState){
      this.setState({
      editorState,
    });
  };


  setInstance(){
    const self = this;
    this.$f7router.navigate('/channels/');
  }


  render() {
    const { channel, title, content} = this.state;
    return (
      <Page>
        <Navbar title={dict.form} backLink={dict.back} />
        <BlockTitle>{dict.channel_form}</BlockTitle>
        <ChannelForm channel={channel} title={title} content={content}  onEditorStateChange={this.onEditorStateChange} submit={this.submit}  handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
