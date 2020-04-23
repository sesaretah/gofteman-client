import React from "react";
import { List, ListItem, ListInput, Col, Row, Button, Link, Chip, Card, CardHeader, CardContent, CardFooter } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TimeSheetForm = (props) => {
  function morningAssociation() {
    var chips = [
      <div>
        <a className='fs-11 ' href="#" id='morning-association'>
          <div className="item-title fs-11">
            <i className="va-minus-2 ml-5 fa fa-plus"></i>
            {dict.associations}:
        </div>
        </a>
      </div>
    ]
    if (props.associations) {
      props.associations.map((association) => {
        if (association.type == 'Morning') {
          chips.push(<Chip text={association.title} deleteable onClick={() => props.removeAssociation(association.id, 'Morning')} />)
        }
      }
      )
    }
    return chips
  }

  function afternoonAssociation() {
    var chips = [
      <div>
        <a className='fs-11 ' href="#" id='afternoon-association'>
          <div className="item-title fs-11">
            <i className="va-minus-2 ml-5 fa fa-plus"></i>
            {dict.associations}:
        </div>
        </a>
      </div>
    ]
    if (props.associations) {
      props.associations.map((association) => {
        if (association.type == 'Afternoon') {
          chips.push(<Chip text={association.title} deleteable onClick={() => props.removeAssociation(association.id, 'Afternoon')} />)
        }
      }
      )
    }
    return chips
  }

  function extraAssociation() {
    var chips = [
      <div>
        <a className='fs-11 ' href="#" id='extra-association'>
          <div className="item-title fs-11">
            <i className="va-minus-2 ml-5 fa fa-plus"></i>
            {dict.associations}:
        </div>
        </a>
      </div>
    ]
    if (props.tags) {
      props.tags.map((tag) =>
        chips.push(<Chip text={tag.title} deleteable onClick={() => props.removeTag(tag.id)} />)
      )
    }
    return chips
  }

  return (
    <Card>
      <CardHeader>{dict.time_sheet}</CardHeader>
      <CardContent>
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


          <ListItem title={morningAssociation()}></ListItem>

          <ListInput
            label={dict.afternoon_report}
            type="textarea"
            placeholder={dict.write_appropriate_details}
            value={props.afternoon_report}
            onInput={(e) => {
              props.handleChange({ afternoonReport: e.target.value })
            }}
          />

          <ListItem title={afternoonAssociation()}></ListItem>

          <ListInput
            label={dict.extra_report}
            type="textarea"
            placeholder={dict.write_appropriate_details}
            value={props.extra_report}
            onInput={(e) => {
              props.handleChange({ extraReport: e.target.value })
            }}
          />

          <ListItem title={extraAssociation()}></ListItem>

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


        </List>


      </CardContent>
      <CardFooter>
        <Link></Link>
        <Button fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
      </CardFooter>
    </Card>
  )
}
export default TimeSheetForm;
