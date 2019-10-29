import React from "react";
import { Actions, ActionsLabel, ActionsGroup, ActionsButton, Icon, Button} from 'framework7-react';
import { dict} from '../../Dict';


const PostMenu = (props) => {
  if (props.post){
    return(
      <React.Fragment>

      <Actions id={"actions-two-groups-"+props.post.id}>
        <ActionsGroup>
          <ActionsLabel>{dict.social_acts}</ActionsLabel>
          <ActionsButton onClick={props.post.bookmarked ? '': () => props.interaction('Bookmark', props.post.id, 'Post')}><i class="va ml-5 fas fa-bookmark"></i>{dict.bookmark} ({props.post.bookmarks})</ActionsButton>
          <ActionsButton onClick={props.post.liked ? '':() => props.interaction('Like', props.post.id, 'Post')}><i class="va ml-5 fas fa-heart"></i>{dict.like} ({props.post.likes})</ActionsButton>
          <ActionsButton ><i class="va ml-5 fas fa-retweet"></i>{dict.share}</ActionsButton>
          <ActionsButton onClick={props.post.followed ? '':() => props.interaction('Follow', props.post.id, 'Post')}><i class="va ml-5 fas fa-link"></i>{dict.follow} ({props.post.follows})</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red">{dict.cancel}</ActionsButton>
        </ActionsGroup>
      </Actions>
      <Button className="col" fill href={false} actionsOpen={"#actions-two-groups-"+props.post.id}><i class="va fas fa-users"></i></Button>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default PostMenu;
