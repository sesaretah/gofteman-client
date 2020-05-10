import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const StatusForm = (props) => {
  if (props.status) {
    if (props.isConfirmed) {
      var isConfirmedTag = true;
    } else {
      var isConfirmedTag = false
    }
    function confirm() {
      if (props.confirmable) {
        return (
          <List>
            <ListItem radio value={false} checked={!isConfirmedTag} name="selectedMode" title={dict.not_confirmed}
              onChange={(e) => {
                props.handleChange({ isConfirmed: JSON.parse(e.target.value) });
              }}>
            </ListItem>
            <ListItem radio value={true} checked={isConfirmedTag} name="selectedMode" title={dict.confirmed}
              onChange={(e) => {
                props.handleChange({ isConfirmed: JSON.parse(e.target.value) })
              }}>
            </ListItem>
          </List>
        )
      }

    }
    return (
      <React.Fragment>
        <BlockTitle>{dict.status}</BlockTitle>
        <List >
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

        {confirm()}

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
    return (null)
  }

}
export default StatusForm;
