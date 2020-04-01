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
import ProfileForm from "../../containers/profiles/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class ProfileCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeValueFields = this.handleChangeValueFields.bind(this);
    this.removeActual = this.removeActual.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.submitFields = this.submitFields.bind(this);
    this.onDrop = this.onDrop.bind(this);    
    this.getList = this.getList.bind(this);
    
    
    this.getList = this.getList.bind(this);

    this.state = {
      profile: {},
      metas: null,
      token: window.localStorage.getItem('token'),
      fields: [],
      name: 'dd',
      surename: '',
      pictures: [],
      avatar: null,
    }
  }


  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
    ModelStore.on("deleted_instance", this.getInstance);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
    ModelStore.removeListener("deleted_instance", this.getInstance);
    ModelStore.removeListener("got_list", this.getList);
  }

  componentDidMount(){
    this.loadData();

  }

  loadData(){
    MyActions.getList('metas', this.state.page);
  }

  onDrop(picture) {
    console.log(picture[0])
    MyActions.fileUpload('profiles', this.state.id, picture[0], this.state.token);
  }


  submit(){
    var data = {id: this.state.id, name: this.state.name, surename: this.state.surename}
    MyActions.updateInstance('profiles', data, this.state.token);
  }

  submitFields(){
    var data = {meta_id: this.state.metaId, content: this.state.fields}
    MyActions.setInstance('actuals', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  handleChangeValueFields(key, value, metaId) {
    var fields = this.state.fields
    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].fid && fields[i].fid === key) {
          let newState = Object.assign({}, this.state);
          newState.fields[i] = { fid: key, value: value, metaId: metaId }
          this.setState(newState);
        } else {
          this.setState({ fields: this.state.fields.concat({ fid: key, value: value , metaId:metaId}) });
        }
      }
    } else {
      this.setState({ fields: this.state.fields.concat({ fid: key, value: value, metaId:metaId }) });
    }
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/profiles/');
  }

  getInstance() {
    var profile = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (profile && klass === 'Profile') {
      this.setState({
        metas: profile.metas,
        profile: profile
      });
    }
  }


  removeActual(uuid){
    MyActions.removeInstance('actuals', {uuid: uuid});
  }

  getList() {
    var metas = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (metas && klass === 'Meta'){
      this.setState({
        metas: metas,
      });
    }
  }



  render() {
    const {profile, metas, name, avatar, surename} = this.state;
    return (
      <Page>
        <Navbar title={dict.profile_form} backLink={dict.back} />
        <BlockTitle>{dict.profile_form}</BlockTitle>
        <ProfileForm name={name} avatar={avatar} surename={surename} metas={metas} onDrop={this.onDrop} removeActual={this.removeActual} submitFields={this.submitFields} submit={this.submit} editing={true} handleChangeValueFields={this.handleChangeValueFields} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
