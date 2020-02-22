import React from 'react';
import {
  App,
  Panel,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';

import routes from '../routes';

export default function (props) {

  // Framework7 parameters here
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
      <Panel left cover  themeDark>
        <View url="/panel-left/" />
      </Panel>

      {/* Right Panel */}
      <Panel right reveal themeDark>
        <View url="/panel-right/"/>
      </Panel>

      {/* Main View */}
      <View id="main-view" url="/" pushState={true}  main className="safe-areas"/>

    </App>
  );
};
