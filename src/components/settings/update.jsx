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
    this.loadBlockList = this.loadBlockList.bind(this);
    this.removeBlocked = this.removeBlocked.bind(this);
    


    this.state = {
      token: window.localStorage.getItem('token'),
      setting: {},
      title: null,
      id: null,
      setting: null,
      notification_setting: null,
      blockList: []
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

  pageAfterIn() {
    this.loadBlockList();
  }


  loadBlockList() {
    const self = this;
    const app = self.$f7;
    app.autocomplete.create({
      openIn: 'popup', //open in page
      openerEl: '#user-blocklist', //link that opens autocomplete
      multiple: true, //allow multiple values
      valueProperty: 'id', //object's "value" property name
      textProperty: 'fullname', //object's "text" property name
      searchbarDisableText: dict.cancel,
      popupCloseLinkText: dict.close,
      notFoundText: dict.not_found,
      limit: 50,
      searchbarPlaceholder: dict.search,
      //preloader: true, //enable preloader
      source: function (query, render) {
        var autocomplete = this;
        var results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        // Show Preloader
       // autocomplete.preloaderShow();
        // Do Ajax request to Autocomplete data
        app.request({
          url: 'http://localhost:3001/v1/profiles/search',
          method: 'GET',
          dataType: 'json',
          //send "query" to server. Useful in case you generate response dynamically
          data: {
            q: query
          },
          success: function (item) {
            // Find matched items
            for (var i = 0; i < item.data.length; i++) {
               results.push(item.data[i]);
            }
            // Hide Preoloader
            //autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
          }
        });
      },
      on: {
        change: function (value) {
          if (value && value[value.length - 1]) {
            self.setState({ blockList: self.state.blockList.concat({ fullname: value[value.length - 1].fullname, id: value[value.length - 1].id }) })
            var data = {profile_id: value[value.length - 1].id }
            MyActions.setInstance('settings/add_block', data, self.state.token)
          }
        },
      },
    });
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
    } else {
      this.setState({
        notification_setting: []
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

  removeBlocked(id){
    this.setState({
      blockList: this.state.blockList.filter(function (profile) {
        return profile.id !== id
      })
    });
    var data = {profile_id: id }
    MyActions.setInstance('settings/remove_block', data, this.state.token)
  }




  render() {
    const { notification_setting, title, blockList } = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <SettingForm
          notification_setting={notification_setting}
          title={title} changeSetting={this.changeSetting} blockList={blockList}
          submit={this.submit} editing={true} handleChange={this.handleChangeValue} 
          removeBlocked={this.removeBlocked}
          />
      </Page>
    );
  }
}
