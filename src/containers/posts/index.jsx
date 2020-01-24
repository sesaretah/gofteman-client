import React from "react";
import { Page, Navbar, NavRight, Link, BlockTitle, ListItem, Fab, Icon, Preloader, Block } from 'framework7-react';
import PostList from "./list"
import { dict } from '../../Dict';

const PostIndex = (props) => {
  return (
    <Page>
      <Navbar title={dict.posts} >
        <NavRight>
          <Link panelOpen="right">
            <Icon f7="bars"></Icon>
          </Link>
        </NavRight>
      </Navbar>
      <BlockTitle></BlockTitle>
      <Fab href="/posts/new" target="#main-view" position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <PostList posts={props.posts} interaction={props.interaction} />
    </Page>
  )
}
export default PostIndex;
