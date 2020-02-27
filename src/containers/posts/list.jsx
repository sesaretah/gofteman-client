import React from "react";
import { Card, CardHeader, BlockTitle, Link, CardFooter, CardContent, Row, Col, Menu, MenuItem, MenuDropdown, Icon, MenuDropdownItem } from 'framework7-react';
import crypto from 'crypto-js';
import InteractionMenu from "../interactions/menu"
import { dict } from "../../Dict";


const PostList = (props) => {

  if (props.posts && props.posts.length > 0) {
    return (
      <React.Fragment>
        <Row noGap>
          {props.posts.map((post) =>
            <Col width="100" tabletWidth="33">
              <Card className="demo-facebook-card">
                <CardHeader className="no-border">
                  <div className="demo-facebook-avatar"><img src={post.profile.avatar} height="34" /></div>
                  <div className="demo-facebook-name ">
                    <div className="demo-facebook-profile ">
                      <Link className="gray-color" href={'/profiles/' + post.profile.id}>{post.profile.fullname.substring(0, 40)}</Link>
                    </div>
                    <Link tooltip={dict.view} className="gray-color" href={'/posts/' + post.id}>{post.title.substring(0, 15) + '..'}</Link></div>
                  <div className="demo-facebook-date">
                    <InteractionMenu model={post} klass='Post' interaction={props.interaction} sourceType={props.sourceType} sourceId={props.sourceId} />
                  </div>
                </CardHeader>
                <CardContent className='lightgray-color'>
                  {post.content.substring(0, 120) + '...'}
                  <div className="demo-facebook-more">
                    <Link className="gray-color" href={'/posts/' + post.id}>
                      {dict.view}
                      <i className="va fa fa-arrow-left mr-2"></i>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Col>
          )}
        </Row>
        <Row noGap>
          <Col></Col>
          <Col className='center mb-20'>
          <a className="gray-color" onClick={() => props.loadMore()}>
            {dict.more}
          </a>
          </Col>
          <Col></Col>
        </Row>
      </React.Fragment>
    )
  } else {
    return (<ul></ul>)
  }
}
export default PostList;
