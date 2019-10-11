import React, { Component } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Icon, Fab,Col
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import Framework7 from 'framework7/framework7.esm.bundle';

export default class AuxiliaryForm extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.addComplement = this.addComplement.bind(this);
    this.addField = this.addField.bind(this);
    this.fields = this.fields.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.getList = this.getList.bind(this);
    this.setInstance = this.setInstance.bind(this);

    this.state = {
      title: '',
      table_type: 'Basic',
      auxiliary_table: {},
      auxiliaryTables: [],
      id: null,
      fields: [{field_name: dict.title, title: true,type: 'String', content: ''}]
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_list", this.getList);
  }

  submit(){
    var data = {id: this.state.id, table_type: this.state.table_type, title: this.state.title, data_format: this.state.fields}
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.submitting, closeTimeout: 2000, position: 'top'});
    if (this.state.id){
      MyActions.updateInstance('auxiliary_tables', data);
    } else {
      MyActions.setInstance('auxiliary_tables', data);
    }

  }

  componentDidMount(){
    if (this.$f7route.params['auxiliaryTableId']) {
      this.setState({ id:this.$f7route.params['auxiliaryTableId']});
      MyActions.getInstance('auxiliary_tables', this.$f7route.params['auxiliaryTableId']);
    }
    MyActions.getList('auxiliary_tables', this.state.page);
  }

  getList(){
    var auxiliaryTables = ModelStore.getList()
    if (auxiliaryTables.length > 0){
      this.setState({
        auxiliaryTables: auxiliaryTables,
      });
    }
  }

  getInstance(){
    var auxiliary_table = ModelStore.getIntance()
    if (auxiliary_table){
      this.setState({
        fields: auxiliary_table.data_format,
        title: auxiliary_table.title,
        id: auxiliary_table.id,
      });
    }
  }

  setInstance(){
    this.$f7router.navigate('/auxiliary_tables/');
  }

  addComplement(i){
    switch (this.state.fields[i].type) {

      case 'Table':
      return(
        <ListItem
          title={dict.table}
          smartSelect
          >
          <select name="content"
            onChange={(e) => {
              let newState = Object.assign({}, this.state);
              newState.fields[i].content= e.target.value
              this.setState(newState);
            }}>
            {this.tables()}
          </select>
        </ListItem>
      )
      break;
      default:

    }
  }

  tables(){
    if (this.state.auxiliaryTables) {
      var options = [<option value=''></option>]
      var tables = this.state.auxiliaryTables
      for (let i = 0; i < tables.length; i++) {
        options.push(<option value={tables[i].id}>{tables[i].title}</option>)
      }
      return options
    }
  }

  addField(){
    this.setState({fields: this.state.fields.concat([{field_name: '', title:false ,type: 'String', content: ''}])});
  }

  removeTitlefield(){
    this.setState({
      fields: this.state.fields.filter(function(item) {
        return item.title !== true;
      })
    });
    console.log(this.state.fields);
  }

  addTitleField(){
    if (this.state.fields.filter(function(item) {return item.title == true;}).length == 0){
      this.setState({ fields: this.state.fields.concat([{field_name: dict.title, title: true,type: 'String', content: ''}])});
    }
      console.log(this.state.fields);
  }

  removeField(index){
    if (this.state.fields[index].title == false ){
      this.setState({fields: this.state.fields.filter((_, i) => i !== index)})
    }
  }

  fields(){
    var length = this.state.fields.length;
    let items = []
    for (let i = 0; i < length; i++) {
      items.push(
        <React.Fragment>
          <List form>
            <ListInput
              label={dict.field_name}
              type="text"
              placeholder="..."
              value={this.state.fields[i].field_name}
              onInput={(e) => {
                let newState = Object.assign({}, this.state);
                newState.fields[i].field_name= e.target.value
                this.setState(newState);
              }}
              />
            <ListInput
              label={dict.type}
              type="select"
              defaultValue={this.state.fields[i].type}
              placeholder="Please choose..."
              onChange={(e) => {
                let newState = Object.assign({}, this.state);
                newState.fields[i].type= e.target.value
                this.setState(newState);
              }}
              >
              <option value="String">{dict.string}</option>
              <option value="Text">{dict.text}</option>
              <option value="Date">{dict.date}</option>
              <option value="Table">{dict.table}</option>
            </ListInput>
            {this.addComplement(i)}
          </List>
          <Block>
            <Row>
              <Col width="20">
                <Button fill color="red" onClick={() => this.removeField(i)}>
                  <Icon ios="f7:delete" aurora="f7:delete" md="material:delete"></Icon>
                  {dict.remove}
                </Button>
              </Col>
            </Row>
          </Block>
        </React.Fragment>
      )
    }
    return items
  }
  render() {
    return (
      <Page>
        <Navbar title="Form" backLink="Back" />
        <BlockTitle>{dict.auxiliary_table_form}</BlockTitle>
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder="..."
            value={this.state.title}
            onInput={(e) => {
              this.setState({ title: e.target.value});
            }}
            />
          <List>
            <ListItem radio value="Basic" defaultChecked name="table_type" title={dict.basic_table}
              onChange={(e) => {
                this.setState({ table_type: e.target.value});
                this.addTitleField()
              }}>
            </ListItem>
            <ListItem radio value="Relation" name="table_type" title={dict.relation_table}
              onChange={(e) => {
                this.setState({ table_type: e.target.value});
                this.removeTitlefield()
              }}>
            </ListItem>
          </List>
        </List>
        <Block>
          <Row>
            <Col width="20">
              <Button fill color="green" onClick={this.addField.bind(this)}>
                <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
                {dict.add}
              </Button>
            </Col>
          </Row>
        </Block>

        {this.fields()}

        <Block strong>
          <Row tag="p">
            <Button className="col" fill onClick={this.submit.bind(this)}>{dict.submit}</Button>
          </Row>
        </Block>
      </Page>
    );
  }
}
