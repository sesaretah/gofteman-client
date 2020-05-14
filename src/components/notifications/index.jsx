import React from "react"
import { Page, Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import NotificationIndex from "../../containers/notifications/index"
import * as MyActions from "../../actions/MyActions";
import { loggedIn } from "../../components/users/loggedIn.js"


export default class Notification extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.loggedIn = loggedIn.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.search = this.search.bind(this);
    this.loadMore = this.loadMore.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      notifications: [],
      query: null,
      page: 1
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  componentDidMount() {

    this.loggedIn();
    this.loadData();
  }

  loadData() {
    MyActions.getList('notifications', this.state.page, {}, this.state.token);
  }

  search(obj) {
    this.setState({ notifications: [], page: 1 });
    this.setState(obj, () => {
      MyActions.getList('notifications/search', this.state.page, { q: this.state.query });
    });

  }

  loadMore() {
    if (this.state.query && this.state.query.length > 0) {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('notifications/search', this.state.page, {q: this.state.query }, this.state.token);
      });
    } else {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('notifications', this.state.page, {}, this.state.token);
      });
    }
  }



  setInstance() {
    var notification = ModelStore.getIntance()
    if (notification) {
      this.setState({ notifications: this.state.notifications.map(el => (el.id === notification.id ? Object.assign({}, el, notification) : el)) });
    }
  }

  getList() {
    var notifications = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (notifications.length > 0 && klass === 'Notification') {
      this.setState({
        notifications: this.state.notifications.concat(notifications),
      });
    }
    var data = {}
    MyActions.setInstance('notifications', data, this.state.token);
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type = null, source_id = null) {
    var data = { interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id }
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const { notifications } = this.state;
    return (<NotificationIndex interaction={this.interaction} loadMore={this.loadMore} notifications={notifications} search={this.search} />)
  }
}
