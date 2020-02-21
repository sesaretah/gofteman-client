import React from "react";
import { Page, Navbar, Searchbar, BlockTitle, Subnavbar, Fab, Icon,Preloader, Block} from 'framework7-react';
import ProfileList from "./list"
import { dict} from '../../Dict';

const ProfileIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.profiles} backLink={dict.back} >
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
      <Fab href="/profiles/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <ProfileList profiles={props.profiles}/>
    </Page>
  )
}
export default ProfileIndex;
