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
import PostForm from "../../containers/posts/form"
import Framework7 from 'framework7/framework7.esm.bundle';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {uploadImageCallBack} from "./uploader.js"

export default class PostCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.getList = this.getList.bind(this)
    this.uploadImageCallBack = uploadImageCallBack.bind(this);


    this.state = {
      post: {},
      channels: null,
      editorState: EditorState.createEmpty(),
      token: window.localStorage.getItem('token'),
      title: null,
      channelId: null,
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
    const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    var data = {title: this.state.title, content: value, channel_id: this.state.channelId, draft: convertToRaw(this.state.editorState.getCurrentContent())}
    MyActions.setInstance('posts', data, this.state.token);
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
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getList('channels', this.state.page, {},this.state.token);
  }

  componentDidUpdate(prev, prevstate) {
  }

  getList() {
    var channels = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (channels && klass === 'Channel'){
      this.setState({
        channels: channels,
      });
    }
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/posts/');
  }





  render() {
    const {post, editorState, channels} = this.state;
    return (
      <Page>
        <Navbar title={dict.post_form} backLink={dict.back} />
        <BlockTitle>{dict.post_form}</BlockTitle>
        <PostForm post={post} channels={channels} editorState={editorState} onEditorStateChange={this.onEditorStateChange} submit={this.submit}  handleChange={this.handleChangeValue} uploadImageCallBack={this.uploadImageCallBack}/>
      </Page>
    );
  }
}
