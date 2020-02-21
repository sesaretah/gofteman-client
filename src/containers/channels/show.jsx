import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block, Row, Col, Button} from 'framework7-react';
import { dict} from '../../Dict';
import InteractionMenu from "../interactions/menu"
import ShareMenu from "../shares/menu"
import PostList from "../posts/list"

const ChannelShow = (props) => {
  if (props.channel){
    console.log(props.channel.posts)
    return(
      <React.Fragment>
        <Block>
          <Row noGap>
            <Col width='80'></Col>

            <Col width="20">
              <Button><InteractionMenu model={props.channel} klass='Channel' interaction={props.interaction} sourceType='Channel' sourceId={props.channel.id}/></Button>
            </Col>
          </Row>
        </Block>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.channel.title}</ListItem>
        </List>

        <BlockTitle>{dict.details}</BlockTitle>
        <List simple-list>
          <ListItem>{props.channel.content}</ListItem>
        </List>
        <BlockTitle>{dict.posts}</BlockTitle>
        <PostList posts={props.channel.posts} interaction={props.interaction} sourceType='Channel' sourceId={props.channel.id}/>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default ChannelShow;
