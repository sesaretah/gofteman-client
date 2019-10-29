import React from "react";
import { List, ListItem, ListInput, Block, Row, Button} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
import fa from '../../js/fa.js';
const ChannelForm = (props) => {
  if (props.channel) {
    return (
      <React.Fragment>
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder='...'
            value={props.title}
            onInput={(e) => {
              props.handleChange({ title: e.target.value})
            }}
            />
          <ListInput
            label={dict.abstract}
            type="textarea"
            placeholder='...'
            value={props.content}
            resizable
            onInput={(e) => {
              props.handleChange({ content: e.target.value})
            }}
            />
        </List>
        <Block strong className='minus-z'>
          <Row tag="p">
            <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
          </Row>
        </Block>
      </React.Fragment>
    )} else {
      return (null)
    }
  }
  export default ChannelForm;
