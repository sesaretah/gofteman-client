import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle, Chip } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const GroupForm = (props) => {
  console.log(props)
  function groupings() {
    var chips = [
      <div>
        <a className='fs-11 ' href="#" id='time-sheet-grouping'>
          <div className="item-title fs-11">
            <i className="va-minus-2 ml-5 fa fa-user-plus"></i>
            {dict.profiles}:
        </div>
        </a>
      </div>
    ]
    if (props.grouping) {
      props.grouping.map((profile) => {
        chips.push(<Chip text={profile.fullname} deleteable onClick={() => props.removeGrouping(profile.id)} />)
      }
      )
    }
    return chips
  }
  return (
    <React.Fragment>
      <BlockTitle>{dict.group}</BlockTitle>
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
        <ListItem title={groupings()}></ListItem>
      </List>
      

      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </React.Fragment>
  )}
export default GroupForm;
