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
import CourseForm from "../../containers/courses/form"
import Framework7 from 'framework7/framework7.esm.bundle';


export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      course : {},
      defaultCourse: null,
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
    var data = {id:this.state.id, title: this.state.title, default_course: this.state.defaultCourse}
    MyActions.updateInstance('courses', data,  this.state.token);
  }
  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['courseId']) {
      MyActions.getInstance('courses', this.$f7route.params['courseId'],  this.state.token);
    }
  }


  getInstance(){
    var course = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (course && klass === 'Course'){
      this.setState({
        title: course.title,
        id: course.id,
        course: course,
        defaultCourse: course.default_course
      });
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  setInstance(){
    const self = this;
    this.$f7router.navigate('/courses/');
  }


  render() {
        const {course, defaultCourse} = this.state;
    return (
      <Page>
        <Navbar title={dict.course_form} backLink={dict.back} />
        <BlockTitle>{dict.course_form}</BlockTitle>
        <CourseForm course={course} defaultCourse={defaultCourse} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
