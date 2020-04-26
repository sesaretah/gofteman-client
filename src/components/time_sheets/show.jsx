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
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import TimeSheetShow from "../../containers/time_sheets/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.deleteCommentConfirm = this.deleteCommentConfirm.bind(this);
    

    this.state = {
      token: window.localStorage.getItem('token'),
      time_sheet: null,
      id: null,
      user_id: null,
      comments: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
    ModelStore.on("got_list", this.getList);
    ModelStore.on("deleted_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("deleted_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('time_sheets', this.$f7route.params['timeSheetId'], this.state.token);
  }

  getInstance() {
    var time_sheet = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (time_sheet && klass === 'TimeSheet') {
      this.setState({
        time_sheet: time_sheet,
        id: time_sheet.id,
        comments: time_sheet.the_comments,
      });
    }
  }

  getList() {
    var users = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (users && klass === 'User') {
      this.setState({
        users: users,
      });
    }
  }

  submit() {
    var data = { time_sheet_id: this.state.id, user_id: this.state.user_id }
    MyActions.setInstance('users/assignments', data, this.state.token);
  }

  submitComment() {
    var data = { commentable_type: 'TimeSheet' ,commentable_id: this.state.id, content: this.state.commentContent }
    MyActions.setInstance('comments', data, this.state.token);
  }


  deleteCommentConfirm(id){
    const self = this;
    const app = self.$f7;
    app.dialog.confirm(dict.are_you_sure, dict.alert, () => self.deleteComment(id))
  }

  deleteComment(id) {
    var data = { id: id }
    MyActions.removeInstance('comments', data, this.state.token, this.state.page);
  }



  handleChangeValue(obj) {
    this.setState(obj);
  }

  fab() {
    if (this.state.time_sheet) {
      return (
        <Fab href={"/time_sheets/" + this.state.time_sheet.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  render() {
    const { time_sheet, comments } = this.state;
    return (
      <Page>
        <Navbar title={dict.time_sheets} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <TimeSheetShow 
          time_sheet={time_sheet} 
          submit={this.submit} handleChange={this.handleChangeValue} 
          comments={comments}
          submitComment={this.submitComment} deleteCommentConfirm={this.deleteCommentConfirm}
          />
      </Page>
    );
  }
}
