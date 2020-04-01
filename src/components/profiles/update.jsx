import React, { Component } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
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
    this.submitExperties = this.submitExperties.bind(this);
    this.removeExperties = this.removeExperties.bind(this);
    

    

    this.state = {
      name: null,
      surename: null,
      metas: null,
      metaId: null,
      actuals: null,
      experties: null,
      expert: null,
      token: window.localStorage.getItem('token'),
      fields: [],
      id: null, 
      pictures: [],
      avatar: null,
    }
  }


  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
    ModelStore.on("deleted_instance", this.getInstance);
    ModelStore.on("file_posted", this.getInstance);    
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
    ModelStore.removeListener("deleted_instance", this.getInstance);
    ModelStore.removeListener("file_posted", this.getInstance);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    if (this.$f7route.params['profileId']) {
      MyActions.getInstance('profiles', this.$f7route.params['profileId']);
    }
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

  submitExperties(){
    var data = {id: this.state.id, experties: this.state.expert}
    MyActions.setInstance('profiles/add_experties/'+this.$f7route.params['profileId'], data, this.state.token);
  }

  removeExperties(experties){
    var data = {id: this.state.id, experties: experties}
    MyActions.setInstance('profiles/remove_experties/'+this.$f7route.params['profileId'], data, this.state.token);
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
        id: profile.id, 
        metas: profile.metas,
        name: profile.name,
        surename : profile.surename,
        avatar: profile.avatar,
        experties: profile.experties
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
    const {name, surename, avatar,metas, actuals, experties} = this.state;
    return (
      <Page>
        <Navbar title={dict.profile_form} backLink={dict.back} />
        <BlockTitle>{dict.profile_form}</BlockTitle>
        <ProfileForm name={name} avatar={avatar} surename={surename} metas={metas} experties={experties} onDrop={this.onDrop} removeActual={this.removeActual} submitFields={this.submitFields} submit={this.submit} editing={true} handleChangeValueFields={this.handleChangeValueFields} handleChange={this.handleChangeValue} submitExperties={this.submitExperties} removeExperties={this.removeExperties}/>
      </Page>
    );
  }
}

