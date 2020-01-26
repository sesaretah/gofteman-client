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
  Icon, Fab
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import PostShow from "../../containers/posts/show";
import Moment from 'react-moment';
import 'moment-timezone';

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.submitComment = this.submitComment.bind(this);

    

    this.state = {
      post: null,
      id: null,
      channels: null,
      channel_id: null,
      sheetOpened: false,
      commentContent: '',
      comments: null,
      token: window.localStorage.getItem('token'),

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

  componentDidMount(){
    MyActions.getInstance('posts', this.$f7route.params['postId'], this.state.token);
    MyActions.getList('channels', this.state.page, {} ,this.state.token);
  }

  getInstance(){
    var post = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (post && klass === 'Post'){
      this.setState({
        post: post,
        id: post.id,
        comments: post.comments
      });
    }
  }

  getList() {
    var channels = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (channels&& klass === 'Channel'){
      this.setState({
        channels: channels,
        channel_id: channels[0].id
      });
  }
}

  setInstance(){
    var post = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if(post && klass === 'Post'){
      this.setState({
        post: post,
        comments: post.comments
      });
    }
  }

  fab(){
    if (this.state.post){
      return(
        <Fab href={"/posts/"+this.state.post.id+"/edit"} target="#main-view"  position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  interaction(interaction_type, interactionable_id, interactionable_type, source_type=null, source_id=null){
    var data = {interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id}
    MyActions.setInstance('interactions', data, this.state.token);
  }

  submit(){
    var data = {post_id: this.state.id, channel_id: this.state.channel_id}
    MyActions.setInstance('shares', data, this.state.token);
    const self = this;
    self.$f7.sheet.close('.demo-sheet')
  }

  submitComment(){
    var data = {post_id: this.state.id, content: this.state.commentContent}
    MyActions.setInstance('comments', data, this.state.token);
  }

  render() {
    const {post, sheetOpened, channels, comments} = this.state;
    return (
      <Page>
        <Navbar title={dict.posts} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <PostShow post={post} comments={comments} channels={channels} submitComment={this.submitComment} sheetOpened={sheetOpened} submit={this.submit} interaction={this.interaction} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
