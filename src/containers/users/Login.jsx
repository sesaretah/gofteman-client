import React from "react";
import { Link, List, CardHeader, ListInput, CardContent, CardFooter, Button, Page, Card, Navbar, Icon } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';

const LoginForm = (props) => {
  return (
    <Page>
      <Navbar title={dict.sign_up} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>
      <Card>
        <CardHeader>{dict.login}</CardHeader>
        <CardContent className='mh-auto'>
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
            {/*<ListInput
              label={dict.password}
              type="password"
              placeholder={dict.enter_your_password}
              value={props.password}
              onInput={(e) => {
                props.handleChange({ password: e.target.value })
              }}
            />*/}
          </List>
        </CardContent>
        <CardFooter>
          <Link href="/sign_up/" animate={false} ignoreCache={true}>{dict.you_can_sign_up} </Link>
          <Button fill className='fs-11 external f-color-black bg-teal' href="https://auth.ut.ac.ir:8443/cas/login?service=https%3A%2F%2Ftavan.ut.ac.ir%2Fusers%2Fservice"  animate={false} ignoreCache={true}>{dict.cas} </Button>
          
          <Button className="col" fill onClick={props.submit}>{dict.login}</Button>
        </CardFooter>
      </Card>
    </Page>
  )
}
export default LoginForm;
