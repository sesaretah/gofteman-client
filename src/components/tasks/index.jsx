import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import TaskIndex from "../../containers/tasks/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.sortChange = this.sortChange.bind(this);
    
    this.state = {
      token: window.localStorage.getItem('token'),
      tasks: null,
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

  sortChange(i){
    MyActions.getList('tasks', this.state.page, {order: i.title}, this.state.token);
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getList('tasks', this.state.page, {}, this.state.token);
  }

  getList() {
    var tasks = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (tasks && klass === 'Task'){
      this.setState({
        tasks: tasks,
      });
    }
    console.log(tasks)
  }

  render() {
    const {tasks} = this.state;
    return(<TaskIndex tasks={tasks} sortChange={this.sortChange}/>)
  }
}
