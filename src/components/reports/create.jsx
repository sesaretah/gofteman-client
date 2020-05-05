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
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import ReportForm from "../../containers/reports/form"
import Framework7 from 'framework7/framework7.esm.bundle';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { uploadImageCallBack } from "./uploader.js";
import crypto from 'crypto-js';

export default class ReportCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.getList = this.getList.bind(this)
    this.uploadImageCallBack = uploadImageCallBack.bind(this);


    this.state = {
      report: {},
      editorState: EditorState.createEmpty(),
      token: window.localStorage.getItem('token'),
      title: null,
      interaction: null,
      uuid: crypto.enc.Base64.stringify(crypto.lib.WordArray.random(128/8)),
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



  submit() {
    const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    var taskId = null
    var workId = null
    if (this.$f7route.params['callerType'] == 'tasks'){
      taskId = this.$f7route.params['callerId']
    }
    if (this.$f7route.params['callerType'] == 'works'){
      workId = this.$f7route.params['callerId']
    }
    var data = { task_id: taskId, work_id: workId, uuid: this.state.uuid, title: this.state.title, content: value, draft: convertToRaw(this.state.editorState.getCurrentContent()) }
    if (this.state.title) {
      MyActions.setInstance('reports', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  };


  handleChangeValue(obj) {
    this.setState(obj);
  }


  componentDidMount() {
    this.loadData();
    console.log(this.state.uuid)
  }

  loadData() {
    
  }

  componentDidUpdate(prev, prevstate) {
  }

  getList() {

  }

  setInstance() {
    var report = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (report && klass === 'Report') { 
      this.$f7router.navigate('/reports/'+ report.id);
    }
    
  }





  render() {
    const { report, editorState, uuid } = this.state;
    return (
      <Page>
        <Navbar title={dict.report_form}  backLink={dict.back} />
        <ReportForm report={report} uuid={uuid} editorState={editorState} onEditorStateChange={this.onEditorStateChange} submit={this.submit} handleChange={this.handleChangeValue} uploadImageCallBack={this.uploadImageCallBack} />
      </Page>
    );
  }
}
