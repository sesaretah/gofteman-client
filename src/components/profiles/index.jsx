import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import ProfileIndex from "../../containers/profiles/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.search = this.search.bind(this);
    
    this.state = {
      profiles: null,
      query: null,
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    MyActions.getList('profiles', this.state.page);
  }

  search(obj){
    this.setState(obj, () => {
      MyActions.getList('profiles/search', this.state.page, {q: this.state.query});
  });    
  }

  getList() {
    var profiles = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (profiles && klass === 'Profile'){
      this.setState({
        profiles: profiles,
      });
    }
  }

  render() {
    const {profiles} = this.state;
    return(<ProfileIndex profiles={profiles} search={this.search}/>)
  }
}
