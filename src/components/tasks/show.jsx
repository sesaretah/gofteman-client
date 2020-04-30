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
import TaskShow from "../../containers/tasks/show"
import { messaging } from "../../init-fcm.js";

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.searchProfile = this.searchProfile.bind(this);
    this.addProfile = this.addProfile.bind(this);
    this.removeProfile = this.removeProfile.bind(this);
    this.searchStatus = this.searchStatus.bind(this);
    this.addStatus = this.addStatus.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.deleteCommentConfirm = this.deleteCommentConfirm.bind(this);
    this.addGroup = this.addGroup.bind(this);
    


    this.state = {
      token: window.localStorage.getItem('token'),
      task: null,
      id: null,
      users: null,
      assignedUsers: null,
      user_id: null,
      abilityTitle: '',
      abilityValue: true,
      ability: null,
      comments: null,
      works: null,
      query: null,
      profiles: [],
      statuses: [],
      access: [],
      commentContent: '',

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
    MyActions.getInstance('tasks', this.$f7route.params['taskId'], this.state.token);
  }

  getInstance() {
    var task = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (task && klass === 'Task') {
      this.setState({
        task: task,
        id: task.id,
        assignedUsers: task.users,
        works: task.works,
        comments: task.the_comments,
        access: task.user_access
      });
    }
  }


  loadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      MyActions.getInstance('tasks', this.$f7route.params['taskId'], this.state.token, this.state.page);
    });
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
    var data = { task_id: this.state.id, user_id: this.state.user_id }
    MyActions.setInstance('users/assignments', data, this.state.token);
  }

  searchProfile(obj) {
    this.setState({ profiles: [] });
    this.setState(obj, () => {
      MyActions.getList('profiles/search', this.state.page, { q: this.state.query });
    });
  }

  searchStatus(obj) {
    this.setState({ statuses: [] });
    this.setState(obj, () => {
      MyActions.getList('statuses/search', this.state.page, { q: this.state.query });
    });
  }

  addProfile(profileId) {
    var data = { id: this.state.id, profile_id: profileId }
    MyActions.setInstance('tasks/involvements', data, this.state.token);
  }

  addStatus(statusId) {
    var data = { id: this.state.id, status_id: statusId }
    MyActions.setInstance('tasks/status', data, this.state.token);
  }

  removeProfile(profileId) {
    var data = { id: this.state.id, profile_id: profileId }
    MyActions.removeInstance('tasks/involvements', data, this.state.token);
  }

  changeRole(profile_id, role) {
    var data = { id: this.state.id, profile_id: profile_id, role: role }
    MyActions.setInstance('tasks/change_role', data, this.state.token);
  }

  submitComment() {
    var data = { commentable_type: 'Task', commentable_id: this.state.id, content: this.state.commentContent }
    MyActions.setInstance('comments', data, this.state.token);
  }


  deleteCommentConfirm(id) {
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
    if (this.state.task) {
      return (
        <Fab href={"/tasks/" + this.state.task.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }



  removeTask(user_id) {
    MyActions.removeInstance('users/assignments', { user_id: user_id, task_id: this.state.id }, this.state.token);
  }

  addGroup(e, id) {
    var data = { id: this.state.id, group_id: id }
    if (e.target.checked) {
      MyActions.setInstance('tasks/group_involvements', data, this.state.token);
    } else {
      MyActions.removeInstance('tasks/group_involvements', data, this.state.token);
    }
  }



  render() {
    const {
      task, users, assignedUsers, ability,
      profiles, statuses, works, commentContent,
      comments, access, } = this.state;
    return (
      <Page>
        <Navbar title={dict.tasks} backLink={dict.back} backLinkForce={true}>
          <Link panelOpen="right">
            <Icon f7="bars"></Icon>
          </Link>
        </Navbar>
        <TaskShow
          task={task} users={users} ability={ability} profiles={profiles} statuses={statuses}
          removeProfile={this.removeProfile} addProfile={this.addProfile}
          searchProfile={this.searchProfile} removeAbility={this.removeAbility}
          assignedUsers={assignedUsers} addAbility={this.addAbility}
          removeTask={this.removeTask} submit={this.submit} handleChange={this.handleChangeValue}
          searchStatus={this.searchStatus} addStatus={this.addStatus} works={works}
          submitComment={this.submitComment} deleteCommentConfirm={this.deleteCommentConfirm}
          commentContent={commentContent} comments={comments} loadMore={this.loadMore}
          changeRole={this.changeRole} access={access} addGroup={this.addGroup}
        />
      </Page>
    );
  }
}
