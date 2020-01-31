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
    this.getList = this.getList.bind(this);

    this.state = {
      profile: {},
      metas: null,
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

  setInstance(){
    const self = this;
    this.$f7router.navigate('/profiles/');
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
        <ProfileForm profile={profile} metas={metas} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
