import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import TagIndex from "../../containers/tags/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.state = {
      token: window.localStorage.getItem('token'),
      tags: null,
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
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getList('tags', this.state.page, {}, this.state.token);
  }

  getList() {
    var tags = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (tags && klass === 'Tag'){
      this.setState({
        tags: tags,
      });
    }
  }

  render() {
    const {tags} = this.state;
    return(<TagIndex tags={tags}/>)
  }
}
