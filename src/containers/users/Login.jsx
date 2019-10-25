import React from "react";
import { Link, List, ListItem, ListInput, Block, Row, Button, Page, LoginScreenTitle, ListButton, BlockFooter} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';

const LoginForm = (props) => {
    return (
      <Page noToolbar noNavbar noSwipeback loginScreen>
        <LoginScreenTitle>{dict.divan}</LoginScreenTitle>
        <List form>
          <ListInput
            label={dict.email}
            type="text"
            placeholder={dict.enter_your_email}
            value={props.email}
            onInput={(e) => {
              props.handleChange({ email: e.target.value})
            }}
          />
          <ListInput
            label={dict.password}
            type="password"
            placeholder={dict.enter_your_password}
            value={props.password}
            onInput={(e) => {
              props.handleChange({ password: e.target.value})
            }}
          />
        </List>
        <List>
          <ListButton onClick={props.submit}>{dict.login}</ListButton>
            <BlockFooter>{dict.if_not_registered}: 
              <Link href="/sign_up/" animate={false} ignoreCache={true}> {dict.you_can_sign_up} </Link>
            </BlockFooter>
        </List>
      </Page>
    )
  }
  export default LoginForm;
