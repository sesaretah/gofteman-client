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
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {uploadImageCallBack} from "./uploader.js"

export default class ChannelCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.getList = this.getList.bind(this)
    this.uploadImageCallBack = uploadImageCallBack.bind(this);


    this.state = {
      channel: {},
      editorState: EditorState.createEmpty(),
      token: window.localStorage.getItem('token'),
      title: null,
      content: null,
      interaction: null,
      page: 0
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_list", this.getList);
  }



  submit(){
    var data = {title: this.state.title, content: this.state.content}
    MyActions.setInstance('channels', data, this.state.token);
  }

  onEditorStateChange(editorState){
    this.setState({
      editorState,
    });
  };


  handleChangeValue(obj) {
    this.setState(obj);
  }


  componentDidMount(){
    this.loadData();
  }

  loadData(){
  }

  componentDidUpdate(prev, prevstate) {
  }

  getList() {
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/channels/');
  }





  render() {
    const {channel, editorState} = this.state;
    return (
      <Page>
        <Navbar title={dict.channel_form} backLink={dict.back} />
        <BlockTitle>{dict.channel_form}</BlockTitle>
        <ChannelForm channel={channel}  editorState={editorState} onEditorStateChange={this.onEditorStateChange} submit={this.submit}  handleChange={this.handleChangeValue} uploadImageCallBack={this.uploadImageCallBack}/>
      </Page>
    );
  }
}
