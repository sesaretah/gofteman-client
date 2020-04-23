import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Chip, Icon, Preloader, Block } from 'framework7-react';
import { dict } from '../../Dict';
import AssignmentForm from "../assignments/form";
import AssignmentList from "../assignments/list";

import AccessControlForm from "../access_controls/form";
import AccessControlList from "../access_controls/list";

const TimeSheetShow = (props) => {
  function morningAssociation() {
    var chips = [
      <div>
        <div className="item-title fs-11">
          {dict.associations}:
        </div>
      </div>
    ]
    if (props.time_sheet.the_associations) {
      props.time_sheet.the_associations.map((association) => {
        if (association.type == 'Morning') {
          chips.push(<Chip text={association.title} />)
        }
      }
      )
    }
    return chips
  }

  function afternoonAssociation() {
    var chips = [
      <div>
        <div className="item-title fs-11">
          {dict.associations}:
        </div>
      </div>
    ]
    if (props.time_sheet.the_associations) {
      props.time_sheet.the_associations.map((association) => {
        if (association.type == 'Afternoon') {
          chips.push(<Chip text={association.title} />)
        }
      }
      )
    }
    return chips
  }

  function extraAssociation() {
    var chips = [
      <div>
        <div className="item-title fs-11">
          {dict.associations}:
        </div>
      </div>
    ]
    if (props.time_sheet.the_associations) {
      props.time_sheet.the_associations.map((association) => {
        if (association.type == 'Extra') {
          chips.push(<Chip text={association.title} />)
        }
      }
      )
    }
    return chips
  }
  if (props.time_sheet) {
    console.log(props.time_sheet.the_associations)
    return (
      <React.Fragment>
        <BlockTitle>{dict.sheet_date}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.jdate}</ListItem>
        </List>

        <BlockTitle>{dict.morning_report}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.morning_report}</ListItem>
          <ListItem>{morningAssociation()}</ListItem>
        </List>

        <BlockTitle>{dict.afternoon_report}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.afternoon_report}</ListItem>
          <ListItem>{afternoonAssociation()}</ListItem>
        </List>

        <BlockTitle>{dict.extra_report}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.extra_report}</ListItem>
          <ListItem>{extraAssociation()}</ListItem>
        </List>


      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default TimeSheetShow;
