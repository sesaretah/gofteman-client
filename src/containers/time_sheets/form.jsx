import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TimeSheetForm = (props) => {
  if (props.defaultTimeSheet) {
    var isDefaultTimeSheet = true;
  } else {
    var isDefaultTimeSheet = false
  }
  return (
    <React.Fragment>
      <BlockTitle>{dict.time_sheet}</BlockTitle>
      <List form>
        <ListInput
          label={dict.morning_report}
          type="textarea"
          placeholder={dict.write_appropriate_details}
          value={props.morning_report}
          onInput={(e) => {
            props.handleChange({ morningReport: e.target.value })
          }}
        />

        <ListInput
          label={dict.afternoon_report}
          type="textarea"
          placeholder={dict.write_appropriate_details}
          value={props.afternoon_report}
          onInput={(e) => {
            props.handleChange({ afternoonReport: e.target.value })
          }}
        />

        <ListInput
          label={dict.extra_report}
          type="textarea"
          placeholder={dict.write_appropriate_details}
          value={props.extra_report}
          onInput={(e) => {
            props.handleChange({ extraReport: e.target.value })
          }}
        />

        <li>
          <div className="item-content item-input">
            <div className="item-inner">
              <div className="item-title item-label">{dict.start_date}</div>
              <div className="item-input-wrap">
                <input className="date-input" type="text" placeholder={dict.select_a_date} readonly="readonly" id="sheet-date-calendar" />
              </div>
            </div>
          </div>
        </li>


      </List>

      <Block strong>
        <Row time_sheet="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </React.Fragment>
  )
}
export default TimeSheetForm;
