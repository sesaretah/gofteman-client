import React, { Component } from 'react';
import {
  Page,
  Navbar,
  Link,
  Icon, Fab
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import WorkShow from "../../containers/works/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.removeWork = this.removeWork.bind(this);
    this.addAbility = this.addAbility.bind(this);
    this.removeAbility = this.removeAbility.bind(this);
    this.searchProfile = this.searchProfile.bind(this);
    this.addProfile = this.addProfile.bind(this);
    this.removeProfile = this.removeProfile.bind(this);
    this.searchStatus = this.searchStatus.bind(this);
    this.addStatus = this.addStatus.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.deleteCommentConfirm = this.deleteCommentConfirm.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.todoChecked = this.todoChecked.bind(this);
    this.deleteTodoConfirm = this.deleteTodoConfirm.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    
    
    
    this.state = {
      token: window.localStorage.getItem('token'),
      work: null,
      id: null,
      users: null,
      assignedUsers: null,
      user_id: null,
      abilityTitle: '',
      abilityValue: true,
      ability: null,
      query: null,
      profiles: [],
      statuses: [],
      commentContent: '',
      access: null,
      comments: null,
      todos: [],
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
    MyActions.getInstance('works', this.$f7route.params['workId'], this.state.token);
  }

  getInstance() {
    var work = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (work && klass === 'Work') {
      this.setState({
        work: work,
        id: work.id,
        assignedUsers: work.users,
        ability: work.ability,
        comments: work.the_comments,
        access: work.user_access,
        todos: work.the_todos,
        //involvementss: work.the_involvementss
      });
    }
  }

  getList() {
    var list = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (list && klass === 'User') {
      this.setState({
        users: list,
      });
    }
    if (list && klass === 'Profile') {
      this.setState({
        profiles: list,
      });
    }
    if (list && klass === 'Status') {
      this.setState({
        statuses: list,
      });
    }
  }

  submit() {
    var data = { work_id: this.state.id, user_id: this.state.user_id }
    MyActions.setInstance('users/assignments', data, this.state.token);
  }

  searchProfile(obj){
    this.setState({ profiles: []});
    this.setState(obj, () => {
      MyActions.getList('profiles/search', this.state.page, {q: this.state.query});
  });  
  }

  searchStatus(obj){
    this.setState({ statuses: []});
    this.setState(obj, () => {
      MyActions.getList('statuses/search', this.state.page, {q: this.state.query});
  });  
  }

  addProfile(profileId){
    var data = { id: this.state.id, profile_id: profileId}
    MyActions.setInstance('works/involvements', data, this.state.token);
  }

  addStatus(statusId){
    var data = { id: this.state.id, status_id: statusId}
    MyActions.setInstance('works/status', data, this.state.token);
  }

  removeProfile(profileId) {
    var data = { id: this.state.id, profile_id: profileId}
    MyActions.removeInstance('works/involvements', data, this.state.token);
  }

  addAbility() {
    var data = { id: this.state.id, ability_title: this.state.abilityTitle, ability_value: this.state.abilityValue}
    MyActions.setInstance('works/abilities', data, this.state.token);
  }

  changeRole(profile_id, role) {
    var data = { id: this.state.id, profile_id: profile_id, role: role}
    MyActions.setInstance('works/change_role', data, this.state.token);
  }


  loadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      MyActions.getInstance('works', this.$f7route.params['workId'], this.state.token, this.state.page);
    });
  }


  submitComment() {
    var data = { commentable_type: 'Work' ,commentable_id: this.state.id, content: this.state.commentContent }
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

  todoChecked(id, e){
    var data={id: id, is_done: e.target.checked}
    MyActions.setInstance('todos/check_todo', data, this.state.token);
  }

  fab() {
    if (this.state.work) {
      return (
        <Fab href={"/works/" + this.state.work.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  deleteTodoConfirm(id){
    const self = this;
    const app = self.$f7;
    app.dialog.confirm(dict.are_you_sure, dict.alert, () => self.deleteTodo(id))
  }

  deleteTodo(id){
    var data = {id: id}
    MyActions.removeInstance('todos', data, this.state.token);
  }

  removeWork(user_id) {
    MyActions.removeInstance('users/assignments', { user_id: user_id, work_id: this.state.id }, this.state.token);
  }

  removeAbility(title){
    MyActions.removeInstance('works/abilities', { id: this.state.id, title: title }, this.state.token);
  }

  render() {
    const { work, users, assignedUsers, ability, profiles, statuses, comments, commentContent, access, todos } = this.state;
    return (
      <Page>
        <Navbar title={dict.works} backLinkForce={true} backLink={dict.back} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
        </Navbar>
        <WorkShow 
          work={work} users={users} ability={ability} profiles={profiles} statuses={statuses}
          removeProfile={this.removeProfile} addProfile={this.addProfile}
          searchProfile={this.searchProfile} removeAbility={this.removeAbility}
          assignedUsers={assignedUsers} addAbility={this.addAbility} 
          removeWork={this.removeWork} submit={this.submit} handleChange={this.handleChangeValue}
          searchStatus={this.searchStatus} addStatus={this.addStatus}
          submitComment={this.submitComment} deleteCommentConfirm={this.deleteCommentConfirm}
          commentContent={commentContent} comments={comments} loadMore={this.loadMore}
          changeRole={this.changeRole} access={access} todos={todos} 
          todoChecked={this.todoChecked} deleteTodoConfirm={this.deleteTodoConfirm}
          />
      </Page>
    );
  }
}
