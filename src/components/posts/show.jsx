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
import PostShow from "../../containers/posts/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.state = {
      post: null,
      token: window.localStorage.getItem('token'),
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount(){
      MyActions.getInstance('posts', this.$f7route.params['postId'], this.state.token);
  }

  getInstance(){
    var post = ModelStore.getIntance()
    if (post){
      this.setState({
        post: post,
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

  render() {
    const {post} = this.state;
    return (
      <Page>
        <Navbar title={dict.posts} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <PostShow post={post}/>
      </Page>
    );
  }
}
