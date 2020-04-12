import React from "react";
import { Actions, ActionsLabel, ActionsGroup, ActionsButton, Icon, Button} from 'framework7-react';
import { dict} from '../../Dict';


const ReportMenu = (props) => {
  if (props.report){
    return(
      <React.Fragment>

      <Actions id={"actions-two-groups-"+props.report.id}>
        <ActionsGroup>
          <ActionsLabel>{dict.social_acts}</ActionsLabel>
          <ActionsButton onClick={props.report.bookmarked ? '': () => props.interaction('Bookmark', props.report.id, 'Report')}><i class="va ml-5 fas fa-bookmark"></i>{dict.bookmark} ({props.report.bookmarks})</ActionsButton>
          <ActionsButton onClick={props.report.liked ? '':() => props.interaction('Like', props.report.id, 'Report')}><i class="va ml-5 fas fa-heart"></i>{dict.like} ({props.report.likes})</ActionsButton>
          <ActionsButton ><i class="va ml-5 fas fa-retweet"></i>{dict.share}</ActionsButton>
          <ActionsButton onClick={props.report.followed ? '':() => props.interaction('Follow', props.report.id, 'Report')}><i class="va ml-5 fas fa-link"></i>{dict.follow} ({props.report.follows})</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red">{dict.cancel}</ActionsButton>
        </ActionsGroup>
      </Actions>
      <Button className="col" fill href={false} actionsOpen={"#actions-two-groups-"+props.report.id}><i class="va fas fa-users"></i></Button>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default ReportMenu;
