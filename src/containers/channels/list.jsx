import React from "react";
import { Card, CardHeader, BlockTitle, Link, CardFooter, CardContent, Row, Col, Menu, MenuItem, MenuDropdown, Icon, MenuDropdownItem} from 'framework7-react';
import crypto from 'crypto-js';
import InteractionMenu from "../interactions/menu"


const ChannelList = (props) => {
  if (props.channels && props.channels.length > 0) {
    return (
     <Row noGap>
        {props.channels.map((channel) =>
          <Col width="100" tabletWidth="33">
          <Card className="demo-facebook-card">
            <CardHeader className="no-border">
              <div className="demo-facebook-avatar"><img src={channel.avatar} width="34" height="34"/></div>
              <div className="demo-facebook-title "><Link className="gray-color" href={'/channels/'+channel.id}>{channel.title.substring(0, 30)}</Link></div>
              <div className="demo-facebook-date"><InteractionMenu model={channel} klass='Channel' interaction={props.interaction} sourceType='Channel' sourceId={channel.id}/></div>
            </CardHeader>
            <CardContent className='lightgray-color'>
              {channel.content.substring(0, 145) + '...'}
            </CardContent>
          </Card>
        </Col>
        )}
      </Row>

    )} else {
      return (<ul></ul>)
    }
  }
  export default ChannelList;
