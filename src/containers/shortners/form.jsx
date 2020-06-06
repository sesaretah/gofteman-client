import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const ShortnerForm = (props) => {

  return (
    <React.Fragment>
      <BlockTitle>{dict.shortner}</BlockTitle>
      <List >
        <ListInput
          label={dict.url}
          type="text"
          placeholder='...'
          defaultValue={props.shortner.url}
          onInput={(e) => {
            props.handleChange({ url: e.target.value })
          }}
        />
      </List>

      <Block strong>
        <Row shortner="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </React.Fragment>
  )
}
export default ShortnerForm;
