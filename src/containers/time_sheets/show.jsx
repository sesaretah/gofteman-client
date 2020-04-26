import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Chip, Icon, Preloader, Block } from 'framework7-react';
import { dict } from '../../Dict';
import CommentForm from "../comments/form"
import CommentList from "../comments/list"


const TimeSheetShow = (props) => {
  function association(kind) {
    var chips = [
      <div>
        <div className="item-title fs-11">
          {dict.associations}:
        </div>
      </div>
    ]
    if (props.time_sheet.the_associations) {
      props.time_sheet.the_associations.map((association) => {
        if (association.kind == kind) {
          chips.push(<a href={'/' + association.a_type + '/' + association.id + '/'}><Chip text={association.title} /></a>)
        }
      }
      )
    }
    return chips
  }

  if (props.time_sheet) {
    return (
      <React.Fragment>
        <BlockTitle>{dict.sheet_date}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.jdate}</ListItem>
        </List>

        <List className='fs-11'>
        {props.time_sheet.the_involvements.map((involvement) =>
          <ListItem
            key={'involvement' + involvement.profile.id}
            title={involvement.profile.fullname}
            after=''>
            <img slot="media" src={involvement.profile.avatar} width="27" height="27" />
          </ListItem>
        )}
      </List>

        <BlockTitle>{dict.morning_report}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.morning_report}</ListItem>
          <ListItem>{association('Morning')}</ListItem>
        </List>

        <BlockTitle>{dict.afternoon_report}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.afternoon_report}</ListItem>
          <ListItem>{association('Afternoon')}</ListItem>
        </List>

        <BlockTitle>{dict.extra_report}</BlockTitle>
        <List simple-list>
          <ListItem>{props.time_sheet.extra_report}</ListItem>
          <ListItem>{association('Extra')}</ListItem>
        </List>

        <CommentForm model={props.time_sheet} submit={props.submitComment} handleChange={props.handleChange}/>

        <CommentList
                comments={props.comments} deleteCommentConfirm={props.deleteCommentConfirm}
                loadMore={props.loadMore} />
      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default TimeSheetShow;
