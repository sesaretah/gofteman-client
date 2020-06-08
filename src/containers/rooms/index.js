import React from "react";
import {
  Page,
  Card,
  Row,
  Col,
  Fab,
  Icon,
  Navbar,
  Link,
  Button,
  CardContent,
  CardFooter,
  CardHeader,
  FabButtons,
  FabButton,
} from "framework7-react";

import { dict } from "../../Dict";
import ReactPlayer from "react-player";

const RoomIndex = (props) => {
  function videos() {
    var result = [];

    if (props.feeds) {
      {
        props.feeds.map((feed) =>{
          result.push(
            <React.Fragment  key={feed.id}>
            <Col width="100" tabletWidth="33">
                <video controls={true} key={feed.id} id={"video-"+feed.id} src="" width="320" height="240" autoPlay playsInline muted={true}/>
            </Col>
            </React.Fragment>
          )}
        );
      }
    }
    return result;
  }
  return (
    <Page onPageAfterIn={props.pageAfterIn.bind(this)}>
      <Navbar title={dict.profiles} backLink={dict.back}>
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>
      <Row className="center" id='hosts'>
        <Col width="50" tabletWidth="33">
          <video id="video0" src="" width="320" height="240" autoPlay playsInline />
          <Row>
            <Button fill onClick={() => props.off()}>
              off
            </Button>
            <Button fill onClick={() => props.on()}>
              on
            </Button>
          </Row>
        </Col>
      {videos()}
      </Row>
      <Button fill onClick={() => props.publishOwnFeed()}>
        publishOwnFeed
      </Button>
      <Fab
        position="center-bottom"
        slot="fixed"
        color="orange"
        className="f-color-black"
      >
        <i class="fa fa-cogs" aria-hidden="true"></i>
        <i class="fa fa-cog" aria-hidden="true"></i>
        <FabButtons position="center">
          <FabButton className="f-color-black" outline  active  onClick={() => props.publishMicrophone()}>
              <i class="fa fa-microphone" aria-hidden="true"></i>
          </FabButton>
          <FabButton className="f-color-black" onClick={() => props.publishCamera()}>
              <i class="fa fa-video-camera" aria-hidden="true"></i>
          </FabButton>
          <FabButton></FabButton>
          <FabButton className="f-color-black">
            <i class="fa fa-desktop" aria-hidden="true"></i>
          </FabButton>
        </FabButtons>
      </Fab>
    </Page>
  );
};
export default RoomIndex;
