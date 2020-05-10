import React, { Component } from 'react';
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

    if (messaging) {
      messaging.requestPermission()
        .then(async function () {
          const token = await messaging.getToken();
          var data = { token: token }
          if (self.state.token && self.state.token.length > 10) {
            MyActions.setInstance('devices', data, self.state.token);
          }
        })
        .catch(function (err) {
          console.log("Unable to get permission to notify.", err);
        });
    }
    navigator.serviceWorker.addEventListener("message", (message) => {

      app.notification.create({
        icon: '',

        title: message.data.firebaseMessaging.payload.notification.title,
        titleRightText: '',
        cssClass: 'notification',
        subtitle: message.data.firebaseMessaging.payload.notification.body,
        closeTimeout: 5000,
      }).open();
    });


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

    const server = React.createContext('http://localhost:3001/v1/');
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
