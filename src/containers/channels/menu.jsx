import React from "react";
import { Actions, ActionsLabel, ActionsGroup, ActionsButton, Icon, Button} from 'framework7-react';
import { dict} from '../../Dict';


const ChannelMenu = (props) => {
  if (props.channel){
    return(
      <React.Fragment>

      <Actions id={"actions-two-groups-"+props.channel.id}>
        <ActionsGroup>
          <ActionsLabel>{dict.social_acts}</ActionsLabel>
          <ActionsButton onClick={props.channel.bookmarked ? '': () => props.interaction('Bookmark', props.channel.id, 'Channel')}><i class="va ml-5 fas fa-bookmark"></i>{dict.bookmark} ({props.channel.bookmarks})</ActionsButton>
          <ActionsButton onClick={props.channel.liked ? '':() => props.interaction('Like', props.channel.id, 'Channel')}><i class="va ml-5 fas fa-heart"></i>{dict.like} ({props.channel.likes})</ActionsButton>
          <ActionsButton ><i class="va ml-5 fas fa-retweet"></i>{dict.share}</ActionsButton>
          <ActionsButton onClick={props.channel.followed ? '':() => props.interaction('Follow', props.channel.id, 'Channel')}><i class="va ml-5 fas fa-link"></i>{dict.follow} ({props.channel.follows})</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red">{dict.cancel}</ActionsButton>
        </ActionsGroup>
      </Actions>
      <Button className="col" fill href={false} actionsOpen={"#actions-two-groups-"+props.channel.id}><i class="va fas fa-users"></i></Button>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default ChannelMenu;
