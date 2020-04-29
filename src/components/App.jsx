import React, {Component} from 'react';
import {
  App,
  Panel,
  View,
  Statusbar,
} from 'framework7-react';
import ModelStore from "../stores/ModelStore";
import * as MyActions from "../actions/MyActions";
import { messaging } from "../init-fcm.js";


import routes from '../routes';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      token: window.localStorage.getItem('token'),
    }
  }
  async componentDidMount() {
    const self = this;
    const app = self.$f7;
    if(messaging){
    messaging.requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log(token)
        var data = {token: token}
        MyActions.setInstance('devices', data, self.state.token);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    }
    navigator.serviceWorker.addEventListener("message", (message) => {
    const self = this;
    const app = self.$f7;
    console.log(message.data['firebase-messaging-msg-data'])
    app.notification.create({
      icon: '',
      title: message.data['firebase-messaging-msg-data'].notification.title,
      titleRightText: '',
      cssClass: 'notification',
      subtitle: message.data['firebase-messaging-msg-data'].notification.body,
      closeTimeout: 3000,
    }).open();
  }
    
    );
  }
  // Framework7 parameters here

  render() {
    const f7params = {
      id: 'io.framework7.testapp', // App bundle ID
      name: 'Framework7', // App name
      theme: 'aurora', // Automatic theme detection
      panel: {
        rightBreakpoint: 960,
      },
      view: {
        //ignoreCache: true,
        //reloadCurrent: true
      },
      // App routes
      routes,
    };
    return (
      <App params={f7params}>
        {/* Statusbar */}
        <Statusbar />

        {/* Left Panel */}
        <Panel left cover themeDark>
          <View url="/panel-left/" />
        </Panel>

        {/* Right Panel */}
        <Panel right reveal themeDark>
          <View url="/panel-right/" />
        </Panel>

        {/* Main View */}
        <View id="main-view" url="/app" pushState={true} main className="safe-areas" />

      </App>
    );
  }
};
