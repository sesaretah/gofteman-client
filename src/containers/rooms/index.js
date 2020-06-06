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
} from "framework7-react";

import { dict } from "../../Dict";
import ReactPlayer from "react-player";

const ShortnerIndex = (props) => {
  function videos() {
    var result = [];
    if (props.urls) {
      {
        props.urls.map((url) =>
          result.push(
            <Col width="100" tabletWidth="33">
              <Card>
                <CardHeader>hhh</CardHeader>
                <CardContent>
                  <video src={url} width="320" height="240" autoPlay />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </Col>
          )
        );
      }
    }
    return result;
  }
  return (
    <Page>
      <Navbar title={dict.profiles} backLink={dict.back}>
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>
      <Row className="center">
        <Col width="50" tabletWidth="33">
          <video id="video1" src="" width="320" height="240" autoPlay />
          <Row>
            <Button fill onClick={() => props.off()}>
              off
            </Button>
            <Button fill onClick={() => props.on()}>
              on
            </Button>
          </Row>
        </Col>
        <Col width="50" tabletWidth="33">
          <video id="video2" src="" width="320" height="240" autoPlay />
        </Col>
        <Col width="50" tabletWidth="33">
          <video id="video3" src="" width="320" height="240" autoPlay />
        </Col>
      </Row>
    </Page>
  );
};
export default ShortnerIndex;
