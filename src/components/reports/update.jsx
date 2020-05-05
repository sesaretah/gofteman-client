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
import ReportForm from "../../containers/reports/form"
import Framework7 from 'framework7/framework7.esm.bundle';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {uploadImageCallBack} from "./uploader.js"
import crypto from 'crypto-js';

export default class ReportUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.getList = this.getList.bind(this)
    this.removeAttachment = this.removeAttachment.bind(this);
    

    this.state = {
      report: null,
      editorState: EditorState.createEmpty(),
      token: window.localStorage.getItem('token'),
      uuid: crypto.enc.Base64.stringify(crypto.lib.WordArray.random(128/8)),
      id: null,
      title: null,
      draft: null,
      taskId:  null,
      workId: null,
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
    const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    var taskId = null
    var workId = null
    if (this.state.task){
      taskId = this.state.task.id
    }
    if (this.state.work){
      workId = this.state.work.id
    }
    var data = {
      id: this.state.id, task_id: taskId, work_id: workId, 
      uuid: this.state.uuid, title: this.state.title, content: value, 
      draft: convertToRaw(this.state.editorState.getCurrentContent()) 
    }
    MyActions.updateInstance('reports', data, this.state.token);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['reportId']) {
      MyActions.getInstance('reports', this.$f7route.params['reportId'], this.state.token);
    }
  }

  getList() {

  }

  getInstance(){
    var report = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (report && klass === 'Report') { 
      const contentState = convertFromRaw(report.draft);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        report: report,
        title: report.title,
        id: report.id,
        task: report.the_task,
        work: report.the_work,
        attachments: report.attachments,
        editorState: editorState
      });
    }
    console.log(report);
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }

  onEditorStateChange(editorState){
      this.setState({
      editorState,
    });
  };

  removeAttachment(id){
    this.setState({
      attachments: this.state.attachments.filter(function (attachment) {
        return attachment.id !== id
      })
    });
    var data = { id: id }
    MyActions.removeInstance('uploads', data, this.state.token, this.state.page);
  }


  setInstance() {
    var report = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (report && klass === 'Report') { 
      this.$f7router.navigate('/reports/'+ report.id);
    }
    
  }


  render() {
    const { report, editorState, uuid, title, attachments} = this.state;
    return (
      <Page>
        <Navbar title={dict.report} backLink={dict.back} />
        <BlockTitle>{dict.workflow_form}</BlockTitle>
        <ReportForm 
        report={report} attachments={attachments} title={title} 
        uuid={uuid} editorState={editorState} 
        onEditorStateChange={this.onEditorStateChange} submit={this.submit}  
        handleChange={this.handleChangeValue} removeAttachment={this.removeAttachment}/>
      </Page>
    );
  }
}
