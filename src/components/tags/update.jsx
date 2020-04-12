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
import TagForm from "../../containers/tags/form"
import Framework7 from 'framework7/framework7.esm.bundle';


export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      tag : {},
      defaultTag: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);

  }


  submit(){
    var data = {id:this.state.id, title: this.state.title, default_tag: this.state.defaultTag}
    MyActions.updateInstance('tags', data,  this.state.token);
  }
  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['tagId']) {
      MyActions.getInstance('tags', this.$f7route.params['tagId'],  this.state.token);
    }
  }


  getInstance(){
    var tag = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (tag && klass === 'Tag'){
      this.setState({
        title: tag.title,
        id: tag.id,
        tag: tag,
        defaultTag: tag.default_tag
      });
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  setInstance(){
    const self = this;
    this.$f7router.navigate('/tags/');
  }


  render() {
        const {tag, defaultTag} = this.state;
    return (
      <Page>
        <Navbar title={dict.tag_form} backLink={dict.back} />
        <BlockTitle>{dict.tag_form}</BlockTitle>
        <TagForm tag={tag} defaultTag={defaultTag} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
