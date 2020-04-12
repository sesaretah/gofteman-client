import React from "react"
import { Page, Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import ReportIndex from "../../containers/reports/index"
import * as MyActions from "../../actions/MyActions";
import { loggedIn } from "../../components/users/loggedIn.js"


export default class Report extends React.Component {
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
      reports: [],
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
    MyActions.getList('reports', this.state.page, {}, this.state.token);
  }

  search(obj) {
    this.setState({ reports: [], page: 1 });
    this.setState(obj, () => {
      MyActions.getList('reports/search', this.state.page, { q: this.state.query });
    });

  }

  setInstance() {
    var report = ModelStore.getIntance()
    if (report) {
      this.setState({ reports: this.state.reports.map(el => (el.id === report.id ? Object.assign({}, el, report) : el)) });
    }
  }


  loadMore() {
    if (this.state.query && this.state.query.length > 0) {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('reports/search', this.state.page, {q: this.state.query }, this.state.token);
      });
    } else {
      this.setState({ page: this.state.page + 1 }, () => {
        MyActions.getList('reports', this.state.page, {}, this.state.token);
      });
    }
  }

  getList() {
    var reports = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (reports.length > 0 && klass === 'Report') {
      this.setState({
        reports: this.state.reports.concat(reports),
      });
    }
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type = null, source_id = null) {
    var data = { interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id }
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const { reports } = this.state;
    return (<ReportIndex interaction={this.interaction} loadMore={this.loadMore} reports={reports} search={this.search} />)
  }
}
