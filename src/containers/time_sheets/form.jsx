import React from "react";
import { List, ListItem, ListInput, Col, Row, Button, Link, Chip, Card, CardHeader, CardContent, CardFooter } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TimeSheetForm = (props) => {
  function association(type) {
    var chips = [
      <div>
        <a className='fs-11 ' href="#" id={type + '-association'}>
          <div className="item-title fs-11">
            <i className="va-minus-2 ml-5 fa fa-plus"></i>
            {dict.associations}:
        </div>
        </a>
      </div>
    ]
    if (props.associations) {
      props.associations.map((association) => {
        if (association.kind == type) {
          chips.push(<Chip text={association.title} deleteable onClick={() => props.removeAssociation(association.id, 'Morning')} />)
        }
      }
      )
    }
    return chips
  }

  function involvements() {
    var chips = [
      <div>
        <a className='fs-11 ' href="#" id='time-sheet-involvements'>
          <div className="item-title fs-11">
            <i className="va-minus-2 ml-5 fa fa-user-plus"></i>
            {dict.recipients}:
        </div>
        </a>
      </div>
    ]
    if (props.involvements) {
      props.involvements.map((involvement) => {
        chips.push(<Chip text={involvement.fullname} deleteable onClick={() => props.removeInvolvement(involvement.id)} />)
      }
      )
    }
    return chips
  }

  if (props.time_sheet) {
    return (
      <Card>
        <CardHeader>{dict.time_sheet}</CardHeader>
        <CardContent>
          <List >
            <ListInput
              label={dict.morning_report}
              type="textarea"
              placeholder={dict.write_appropriate_details}
              value={props.time_sheet.morning_report}
              onInput={(e) => {
                props.handleChange({ morningReport: e.target.value })
              }}
            />


            <ListItem title={association('Morning')}></ListItem>

            <ListInput
              label={dict.afternoon_report}
              type="textarea"
              placeholder={dict.write_appropriate_details}
              value={props.time_sheet.afternoon_report}
              onInput={(e) => {
                props.handleChange({ afternoonReport: e.target.value })
              }}
            />

            <ListItem title={association('Afternoon')}></ListItem>

            <ListInput
              label={dict.extra_report}
              type="textarea"
              placeholder={dict.write_appropriate_details}
              value={props.extra_report}
              onInput={(e) => {
                props.handleChange({ extraReport: e.target.value })
              }}
            />

            <ListItem title={association('Extra')}></ListItem>

            <li>
              <div className="item-content item-input">
                <div className="item-inner">
                  <div className="item-title item-label">{dict.sheet_date}</div>
                  <div className="item-input-wrap">
                    <input className="date-input" type="text" placeholder={dict.select_a_date} readonly="readonly" id="sheet-date-calendar" />
                  </div>
                </div>
              </div>
            </li>

            <ListItem title={involvements()}></ListItem>
          </List>
        </CardContent>
        <CardFooter>
          <Link></Link>
          <Button fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </CardFooter>
      </Card>
    )
  }
  else {
    return (null)
  }
}
export default TimeSheetForm;
