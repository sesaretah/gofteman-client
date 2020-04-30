import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, Chip, Col } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const SettingForm = (props) => {
  if (true) {
    function involvementChecked(workInvolvement) {
      var flag = false
      props.involvements.map((involvement) => {
        if (involvement.id === workInvolvement.profile.id) {
          flag = true
        }
      }
      )
      return flag
    }
    return (
      <List form>
        <ListInput
          key='settings-form-title'
          label={dict.title}
          type="text"
          placeholder={dict.select_appropriate_title}
          defaultValue={props.title}
          required={true}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />

        <List className='fs-11 ' >
          {props.workInvolvements.map((workInvolvement) =>
            <ListItem
              key={workInvolvement.id}
              checkbox
              checked={involvementChecked(workInvolvement)}
              onChange={(e) => props.involvementCheck(workInvolvement.profile.id, e)}
              title={workInvolvement.profile.fullname}
              after=''>
            </ListItem>

          )}
        </List>



        <Block strong>
          <Row tag="p">
            <Col>
              <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
            </Col>
          </Row>
        </Block>
      </List>
    )
  } else {
    return (null)
  }

}
export default SettingForm;
