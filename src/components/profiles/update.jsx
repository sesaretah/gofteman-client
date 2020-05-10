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
    this.getInstance = this.getInstance.bind(this);
    this.onDrop = this.onDrop.bind(this);    
    

    

    this.state = {
      name: null,
      surename: null,
      token: window.localStorage.getItem('token'),
      profile: null,
      id: null, 
      pictures: [],
      avatar: null,
    }
  }


  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("file_posted", this.getInstance);    
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("file_posted", this.getInstance);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    if (this.$f7route.params['profileId']) {
      MyActions.getInstance('profiles', this.$f7route.params['profileId'], this.state.token);
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




  handleChangeValue(obj) {
    this.setState(obj);
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
        profile: profile,
        name: profile.name,
        surename : profile.surename,
        avatar: profile.avatar,
      });
    }
  }






  render() {
    const {profile, name, surename, avatar} = this.state;
    return (
      <Page>
        <Navbar title={dict.profile_form} backLink={dict.back} />
        <BlockTitle>{dict.profile_form}</BlockTitle>
        <ProfileForm profile={profile}
          name={name} avatar={avatar} surename={surename} onDrop={this.onDrop}  
         submit={this.submit} editing={true} 
         handleChange={this.handleChangeValue} 
         />
      </Page>
    );
  }
}

