import React from "react";
import { Page, Navbar, Subnavbar, Searchbar, BlockTitle, ListItem, Fab, Icon, Preloader, Block } from 'framework7-react';
import PostList from "./list"
import { dict } from '../../Dict';

const PostIndex = (props) => {
  return (
    <Page>
      <Navbar title={dict.posts} >
      <Subnavbar inner={false}>
        <Searchbar
          disableButtonText={dict.cancel}
          placeholder={dict.search}
          onChange={(e) => {
            props.search({ query: e.target.value})
          }}
        ></Searchbar>
      </Subnavbar>
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
