import React from "react";
import { Actions, ActionsLabel, ActionsGroup, ActionsButton, Icon, Button, Sheet, Toolbar, Link, PageContent, Block} from 'framework7-react';
import { dict} from '../../Dict';


const InteractionMenu = (props) => {
  if (props.model){
    return(
      <React.Fragment>

      <Actions id={"actions-two-groups-"+props.model.id}>
        <ActionsGroup>
          <ActionsLabel>{dict.social_acts}</ActionsLabel>
          <ActionsButton onClick={props.model.bookmarked ? '': () => props.interaction('Bookmark', props.model.id, props.klass, props.sourceType, props.sourceId)}><i className="va ml-5 fas fa-bookmark"></i>{dict.bookmark} ({props.model.bookmarks})</ActionsButton>
          <ActionsButton onClick={props.model.liked ? '':() => props.interaction('Like', props.model.id, props.klass, props.sourceType, props.sourceId)}><i className="va ml-5 fas fa-heart"></i>{dict.like} ({props.model.likes})</ActionsButton>
          <ActionsButton onClick={props.model.followed ? '':() => props.interaction('Follow', props.model.id, props.klass, props.sourceType, props.sourceId)}><i className="va ml-5 fas fa-link"></i>{dict.follow} ({props.model.follows})</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red">{dict.cancel}</ActionsButton>
        </ActionsGroup>
      </Actions>
      
      <Button className="col"  href={false} actionsOpen={"#actions-two-groups-"+props.model.id}><i className="va fas fa-users"></i></Button>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default InteractionMenu;
