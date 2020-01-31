import React from "react";
import { Link, List, CardHeader, ListInput, CardContent, CardFooter, Button, Page, Card, ListButton, BlockFooter } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';

const LoginForm = (props) => {
  return (
    <Page>
      <Card>
        <CardHeader>{dict.login}</CardHeader>
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
              label={dict.password}
              type="password"
              placeholder={dict.enter_your_password}
              value={props.password}
              onInput={(e) => {
                props.handleChange({ password: e.target.value })
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
