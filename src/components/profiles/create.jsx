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
    
    
    this.getList = this.getList.bind(this);

    this.state = {
      profile: {},
      metas: null,
      token: window.localStorage.getItem('token'),
      fields: [],
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

  submit(){
    var data = {title: this.state.title}
    MyActions.setInstance('profiles', data);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  handleChangeValueFields(key, value) {
    var fields = this.state.fields
    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].fid && fields[i].fid === key) {
          let newState = Object.assign({}, this.state);
          newState.fields[i] = { fid: key, value: value }
          this.setState(newState);
        } else {
          this.setState({ fields: this.state.fields.concat({ fid: key, value: value }) });
        }
      }
    } else {
      this.setState({ fields: this.state.fields.concat({ fid: key, value: value }) });
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
    const {profile, metas} = this.state;
    return (
      <Page>
        <Navbar title={dict.profile_form} backLink={dict.back} />
        <BlockTitle>{dict.profile_form}</BlockTitle>
        <ProfileForm profile={profile} metas={metas} submit={this.submit} editing={true} handleChangeValueFields={this.handleChangeValueFields} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
