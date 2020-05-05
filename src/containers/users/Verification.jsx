import React from "react";
import { Link, List, CardHeader, ListInput, CardContent, CardFooter, Button, Page, Card, Navbar, Icon } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';

const LoginForm = (props) => {
  return (
    <Page>
      <Navbar title={dict.verification} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>
      <Card>
        <CardHeader>{dict.login}</CardHeader>
        <CardContent >
          <List >
          <ListInput
              label={dict.email}
              type="text"
              autofocus={true}
              placeholder={dict.enter_your_email}
              value={props.email}
              onInput={(e) => {
                props.handleChange({ email: e.target.value })
              }}
            />
            <ListInput
              label={dict.verification_code}
              type="text"
              placeholder={dict.enter_verification_code}
              onInput={(e) => {
                props.handleChange({ verificationCode: e.target.value })
              }}
            />
          </List>
        </CardContent>
        <CardFooter>
          <Link href="/sign_up/" animate={false} ignoreCache={true}>{dict.you_can_sign_up} </Link>
          <Button className="col" fill onClick={props.submit}>{dict.login}</Button>
        </CardFooter>
      </Card>
    </Page>
  )
}
export default LoginForm;
