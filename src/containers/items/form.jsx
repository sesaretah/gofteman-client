import React from "react";
import { List, ListInput, Chip, Block, Link, Button, Card, CardHeader, CardFooter } from 'framework7-react';
import { dict } from '../../Dict';
import InputTrigger from 'react-input-trigger';


const CommentForm = (props) => {

  return (
    <Card>
      <CardHeader>{dict.new_address}</CardHeader>
      <List >
        <ListInput
          label={dict.title}
          inputId={"title-" + props.rnd}
          type="text"
          className="form-element"
          placeholder='...'
          resizable
          clearButton={true}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />

        <ListInput
          label={dict.description}
          inputId={"description-" + props.rnd}
          type="textarea"
          className="form-element"
          placeholder='...'
          maxlength='300'
          resizable
          clearButton={true}
          onInput={(e) => {
            props.handleChange({ description: e.target.value })
          }}
        />

        <ListInput
          label='url'
          className="form-element"
          inputId={"href-" + props.rnd}
          type="text"
          placeholder='...'
          maxlength='300'
          resizable
          clearButton={true}
          onInput={(e) => {
            props.handleChange({ href: e.target.value })
          }}
        />
      </List>
      <CardFooter>
        <Link></Link>
        <Link className="btn-notice"></Link>
        <Button className="col btn" fill onClick={props.submitItem}>{dict.submit}</Button>
      </CardFooter>
    </Card>
  )
}
export default CommentForm;
