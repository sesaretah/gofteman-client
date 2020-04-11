import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const StatusForm = (props) => {
  if (props.status) {
    return (
      <React.Fragment>
        <BlockTitle>{dict.status}</BlockTitle>
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder='...'
            defaultValue={props.title}
            onInput={(e) => {
              props.handleChange({ title: e.target.value })
            }}
          />
  
        </List>
  
        <div className="list ">
          <ul>
            <li>
              <div className="item-content item-input">
                <div className="item-media">
                <i class="fa fa-2x fa-circle-o demo-list-icon" aria-hidden="true" id="demo-color-picker-spectrum-value"></i>
                </div>
                <div className="item-inner">
                  <div className="item-input-wrap">
                    <input type="text" placeholder="Color" value={props.color} readonly="readonly" id="demo-color-picker-spectrum" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
  
        <Block strong>
          <Row tag="p">
            <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
          </Row>
        </Block>
      </React.Fragment>
    )
  } else {
    return(null)
  }

}
export default StatusForm;
