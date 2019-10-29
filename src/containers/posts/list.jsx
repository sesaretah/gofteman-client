import React from "react";
import { Card, CardHeader, BlockTitle, Link, CardFooter, CardContent, Row, Col, Menu, MenuItem, MenuDropdown, Icon, MenuDropdownItem} from 'framework7-react';
import crypto from 'crypto-js';
import InteractionMenu from "../interactions/menu"


const PostList = (props) => {

  if (props.posts) {
    return (
     <Row noGap>
        {props.posts.map((post) =>
          <Col width="100" tabletWidth="50">
          <Card className="demo-facebook-card">
            <CardHeader className="no-border">
              <div className="demo-facebook-avatar"><img src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg" width="34" height="34"/></div>
              <div className="demo-facebook-name "><Link className="gray-color" href={'/posts/'+post.id}>{post.title.substring(0, 30)}</Link></div>
              <div className="demo-facebook-date"><InteractionMenu model={post} klass='Post' interaction={props.interaction} sourceType={props.sourceType} sourceId={props.sourceId}/></div>
            </CardHeader>
            <CardContent className='lightgray-color'>
              {post.content.substring(0, 145) + '...'}
            </CardContent>
          </Card>
        </Col>
        )}
      </Row>

    )} else {
      return (<ul></ul>)
    }
  }
  export default PostList;
