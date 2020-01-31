import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import MetaIndex from "../../containers/metas/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.state = {
      metas: null,
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
    MyActions.getList('metas', this.state.page);
  }

  getList() {
    var metas = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (metas  && klass === 'Meta'){
      this.setState({
        metas: metas,
      });
    }
  }

  render() {
    const {metas} = this.state;
    return(<MetaIndex metas={metas}/>)
  }
}
