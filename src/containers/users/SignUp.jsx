import React from "react";
import { Link, List, ListItem, ListInput, Navbar, Icon, Button, Page, LoginScreenTitle, ListButton, CardFooter, Card, CardHeader, CardContent } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';

const SignUpForm = (props) => {
  return (
    <Page>
      <Navbar title={dict.sign_up} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>Ï
      <Card>
        <CardHeader>{dict.sign_up}</CardHeader>
        <CardContent>
          <List form>
            <ListInput
              label={dict.email}
              type="text"
              placeholder={dict.enter_your_email}
              value={props.email}
              onInput={(e) => {
                props.handleChange({ email: e.target.value })
              }}
            />
            <ListInput
              label={dict.username}
              type="text"
              name={crypto.lib.WordArray.random(32)}
              onInput={(e) => {
                props.handleChange({ username: e.target.value })
              }}
            />
            <ListInput
              label={dict.password}
              type="password"
              placeholder={dict.enter_your_password}
              autocomplete='new-password'
              name={crypto.lib.WordArray.random(32)}
              value={props.password}
              onInput={(e) => {
                props.handleChange({ password: e.target.value })
              }}
            />
            <ListInput
              label={dict.password_confirmation}
              type="password"
              autocomplete='off'
              placeholder={dict.enter_your_password_confirmation}
              value={props.password}
              onInput={(e) => {
                props.handleChange({ password_confirmation: e.target.value })
              }}
            />
          </List>
        </CardContent>
        <CardFooter>
          <Link href="/login/" animate={false} ignoreCache={true}>{dict.if_registered}{'\u00A0'}{dict.you_can_login} </Link>
          <Button className="col" fill onClick={props.submit}>{dict.sign_up}</Button>
        </CardFooter>
      </Card>
    </Page>
  )
}
export default SignUpForm;
