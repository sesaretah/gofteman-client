import React, { Component } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import SettingForm from "../../containers/settings/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class SettingCreate extends Component {
  constructor() {
    super();

    this.getInstance = this.getInstance.bind(this);
    this.changeSetting = this.changeSetting.bind(this);



    this.state = {
      token: window.localStorage.getItem('token'),
      setting: {},
      title: null,
      id: null,
      setting: null,
      notification_setting: null,
    }
  }


  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    MyActions.getInstance('settings', 1, this.state.token);
  }





  getInstance() {
    var setting = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (setting && klass === 'Setting') {
      this.setState({
        title: setting.title,
        id: setting.id,
        notification_setting: setting.notification_setting
      });
    }
  }

  changeSetting(e, item) {
    var data = { item: item }
    if (e.target.checked) {
      this.setState(prevState => {
        let notification_setting = Object.assign({}, prevState.notification_setting);
        notification_setting[item] = true;
        return { notification_setting };
      })
      MyActions.setInstance('settings/add', data, this.state.token)
    } else {
      this.setState(prevState => {
        let notification_setting = Object.assign({}, prevState.notification_setting);
        notification_setting[item] = false;
        return { notification_setting };
      })
      MyActions.setInstance('settings/remove', data, this.state.token);
    }
  }




  render() {
    const { notification_setting, title } = this.state;
    return (
      <Page backLink={dict.back} backLinkForce={true}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <SettingForm
          notification_setting={notification_setting}
          title={title} changeSetting={this.changeSetting}
          submit={this.submit} editing={true} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
