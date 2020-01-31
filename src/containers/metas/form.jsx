import React from "react";
import { List, ListItem, ListInput, Card, CardFooter, Button, Link } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';



const MetaForm = (props) => {
  return (
    <Card>
      <List form>
        <ListInput
          label={dict.title}
          type="text"
          placeholder='...'
          defaultValue={props.meta.title}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />
        <ListInput
          label="Schema"
          type="text"
          inputStyle={{direction: 'ltr'}}
          defaultValue={JSON.stringify(props.meta.meta_schema)}
          placeholder="JSON"
          onInput={(e) => {
            props.handleChange({ metaSchema: e.target.value })
          }}
        ></ListInput>


      </List>
      <CardFooter>
        <Link></Link>
        <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
      </CardFooter>
    </Card>
  )
}
export default MetaForm;
