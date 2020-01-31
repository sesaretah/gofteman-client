import React from "react";
import { List, ListItem, ListInput, Block, Row, Button } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
import ActualForm from "../actuals/form";


const ProfileForm = (props) => {
  if (props.metas) {
    return (
      <React.Fragment>
        <List form>
          <ListInput
            label={dict.firstname}
            type="text"
            placeholder='...'
            defaultValue={props.profile.name}
            onInput={(e) => {
              props.handleChange({ name: e.target.value })
            }}
          />

          <ListInput
            label={dict.surename}
            type="text"
            placeholder='...'
            defaultValue={props.profile.surename}
            onInput={(e) => {
              props.handleChange({ surename: e.target.value })
            }}
          />
        </List>
        <Block strong>
          <Row tag="p">
            <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
          </Row>
        </Block>
        {props.metas.map((meta) =>
          <ActualForm meta={meta} submit={props.submit} onChangeValue={props.onChangeValue} />
        )}
      </React.Fragment>
    )
  } else {
    return (null)
  }

}
export default ProfileForm;
