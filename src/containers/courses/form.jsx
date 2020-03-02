import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle, Card } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const CourseForm = (props) => {
  if (props.privateCourse) {
    var isPrivateCourse = true;
  } else {
    var isPrivateCourse = false
  }
  return (
    <Card>
      <BlockTitle>{dict.course}</BlockTitle>
      <List form>
        <ListInput
          label={dict.title}
          type="text"
          placeholder={dict.select_appropriate_title}
          defaultValue={props.course.title}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />

        <ListInput
          label={dict.details}
          type="textarea"
          placeholder={dict.write_appropriate_description}
          defaultValue={props.course.content}
          onInput={(e) => {
            props.handleChange({ content: e.target.value })
          }}
        />

        <ListItem title={dict.course_type} className="fs-10"></ListItem>
        <ListItem className="fs-10" radio value={false} checked={!isPrivateCourse} name="defaultCourse" title={dict.public}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ privateCourse: JSON.parse(e.target.value) })
          }}>
        </ListItem>
        <ListItem className="fs-10" radio value={true} checked={isPrivateCourse} name="defaultCourse" title={dict.private}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ privateCourse: JSON.parse(e.target.value) });
          }}>
        </ListItem>
      </List>

      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </Card>
  )
}
export default CourseForm;
