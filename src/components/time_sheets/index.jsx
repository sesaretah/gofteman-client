import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import TimeSheetIndex from "../../containers/time_sheets/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getMutipleList = this.getMutipleList.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.getList = this.getList.bind(this);
    
    this.state = {
      token: window.localStorage.getItem('token'),
      mine_time_sheets: [],
      related_time_sheets: [],
      page_mine: 1,
      page_related: 1,
    }
  }
  componentWillMount() {
    ModelStore.on("got_multiple_list", this.getMutipleList);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_multiple_list", this.getMutipleList);
    ModelStore.removeListener("got_list", this.getList);
  }
  

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getMultipleList('time_sheets', this.state.page, {}, this.state.token);
  }


  loadMore(p) {

    if( p === 'page_mine') {
      this.setState({ page_mine: this.state.page_mine + 1 }, () => {
        MyActions.getList('time_sheets/mine', this.state.page_mine, {}, this.state.token);
      });
    }
    if( p === 'page_related') {
      this.setState({ page_related: this.state.page_related + 1 }, () => {
        MyActions.getList('time_sheets/related', this.state.page_related, {}, this.state.token);
      });
    }
  }

  getList(){
    var list = ModelStore.getList()
    var klass = ModelStore.getKlass()
    console.log(list)
    if (list && klass === 'TimeSheetMine'){
      this.setState({
        mine_time_sheets: this.state.mine_time_sheets.concat(list),
      });
    }
    if (list && klass === 'TimeSheetRelated'){
      this.setState({
        related_time_sheets: this.state.related_time_sheets.concat(list),
      });
  }
}

  getMutipleList() {
    var multiple = ModelStore.getMutipleList()
    var klass = ModelStore.getKlass()
    if (multiple && klass === 'TimeSheet'){
      this.setState({
        mine_time_sheets: multiple.mine,
        related_time_sheets: multiple.related,
      });
    }
  }

  render() {
    const {mine_time_sheets, related_time_sheets} = this.state;
    return(<TimeSheetIndex 
      mine_time_sheets={mine_time_sheets} related_time_sheets={related_time_sheets}
      loadMore={this.loadMore}
      />)
  }
}
