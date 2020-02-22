import React from "react";
import { Row, CardHeader, Card, CardContent, Col, Link, CardFooter, Chip, Gauge } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';

const ProfileList = (props) => {

  if (props.profiles) {
    console.log(props.profiles)
    return (
      <Row noGap>
        {props.profiles.map((profile) =>
          <Col width="100" tabletWidth="33">
            <Card className="demo-facebook-card">
              <CardHeader className="no-border">
                <div className="demo-facebook-avatar"><img src={profile.avatar} width="34" height="34" /></div>
                <div className="demo-facebook-name "><Link className="gray-color" href={'/profiles/' + profile.id}>{profile.fullname.substring(0, 30)}</Link></div>
        <div className="demo-facebook-sub">
          <Moment locale="fa" fromNow ago>{profile.last_login}</Moment> {dict.ago}
          </div>
              </CardHeader>
              <CardFooter className='profile-footer'>
                <Chip text="Example Chip" />
                <Chip text="Another Chip" />
              </CardFooter>
            </Card>
          </Col>
        )}
      </Row>
    )
  } else {
    return (<ul></ul>)
  }
}
export default ProfileList;
