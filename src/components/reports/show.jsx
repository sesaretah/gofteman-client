import React, { Component } from 'react';
import {
  Page,
  Navbar,
  Link,
  BlockTitle,
  Icon, Fab
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import ReportShow from "../../containers/reports/show";


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
    this.removeComment = this.removeComment.bind(this);
    this.loadMore = this.loadMore.bind(this);




    this.state = {
      report: null,
      id: null,
      page: 1,
      selectedChannel: null,
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
    ModelStore.on("deleted_instance", this.getInstance);

  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("deleted_instance", this.getInstance);
  }

  componentDidMount() {
    this.$$('.some-link').on('taphold', function (f7) {
      f7.dialog.alert('Tap hold fired!');
    });
    MyActions.getInstance('reports', this.$f7route.params['reportId'], this.state.token);
  }

  getInstance() {
    var report = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (report && klass === 'Report') {
      this.setState({
        report: report,
        id: report.id,
        comments: report.comments
      });
    }
    console.log(report)
  }

  getList() {

  }

  setInstance() {
    var report = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (report && klass === 'Report') {
      this.setState({
        report: report,
        comments: report.comments,
        page: 1
      });
    }
  }

  loadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      MyActions.getInstance('reports', this.$f7route.params['reportId'], this.state.token, this.state.page);
    });
  }

  fab() {
    if (this.state.report) {
      return (
        <Fab href={"/reports/" + this.state.report.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  interaction(interaction_type, interactionable_id, interactionable_type, source_type = null, source_id = null) {
    var data = { interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id }
    MyActions.setInstance('interactions', data, this.state.token);
  }

  submit() {
    var data = { report_id: this.state.id, channel_id: this.state.selectedChannel }
    MyActions.setInstance('shares', data, this.state.token);
    const self = this;
    self.$f7.sheet.close('.demo-sheet')
  }

  submitComment() {
    var data = { report_id: this.state.id, content: this.state.commentContent }
    MyActions.setInstance('comments', data, this.state.token);
  }

  removeComment(id) {
    var data = { id: id }
    MyActions.removeInstance('comments', data, this.state.token, this.state.page);
  }

  render() {
    const { report, sheetOpened, channels, comments } = this.state;
    return (
      <Page>
        <Navbar title={dict.reports} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>
        <BlockTitle></BlockTitle>
        {this.fab()}
        <ReportShow report={report} comments={comments} channels={channels} submitComment={this.submitComment} removeComment={this.removeComment} submit={this.submit} interaction={this.interaction} handleChange={this.handleChangeValue} loadMore={this.loadMore} />
      </Page>
    );
  }
}
