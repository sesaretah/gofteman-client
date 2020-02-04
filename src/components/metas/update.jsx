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
  Icon
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import MetaForm from "../../containers/metas/form"
import Framework7 from 'framework7/framework7.esm.bundle';


export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);


    this.state = {
      meta : {},
      title: null,
      metaSchema: null,
      id: null,
      label: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);

  }


  submit(){
    var data = {id:this.state.id, title: this.state.title, label: this.state.label, meta_schema: this.state.metaSchema}
    MyActions.updateInstance('metas', data);
  }
  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['metaId']) {
      MyActions.getInstance('metas', this.$f7route.params['metaId']);
    }
  }


  getInstance(){
    var meta = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    console.log(meta);
    if (meta && klass === 'Meta'){
      this.setState({
        title: meta.title,
        id: meta.id,
        meta: meta,
        metaSchema: meta.metaSchema,
        label: meta.label
      });
    }
  }

  handleChangeValue(obj) {
    console.log(obj);
    this.setState(obj);
  }


  setInstance(){
    const self = this;
    this.$f7router.navigate('/metas/');
  }


  render() {
        const {meta} = this.state;
    return (
      <Page>
        <Navbar title={dict.meta_form} backLink={dict.back} />
        <BlockTitle>{dict.meta_form}</BlockTitle>
        <MetaForm meta={meta} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
