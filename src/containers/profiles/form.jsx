import React from "react";
import { List, ListItem, ListInput, CardFooter, Button, Card, Link, CardHeader } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
import ActualForm from "../actuals/form";
import ActualList from "../actuals/list";
import ImageUploader from 'react-images-upload';
const ProfileForm = (props) => {
  console.log(props)
  if (props.name && props.metas) {
    return (
      <React.Fragment>
        <Card>
          <List form>
            <ListInput
              label={dict.firstname}
              type="text"
              placeholder='...'
              defaultValue={props.name}
              onInput={(e) => {
                props.handleChange({ name: e.target.value })
              }}
            />

            <ListInput
              label={dict.surename}
              type="text"
              placeholder='...'
              defaultValue={props.surename}
              onInput={(e) => {
                props.handleChange({ surename: e.target.value })
              }}
            />


          </List>
          <CardFooter>
            <Link></Link>
            <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
          <img src={props.avatar} width="80"></img>
          </CardHeader>
        <ImageUploader
              withIcon={true}
              buttonText={dict.choose_image}
              onChange={props.onDrop}
              imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
            </Card>
        {props.metas.map((m) =>
          <React.Fragment>
            <ActualList meta={m.meta} editable={true} actuals={m.actuals} removeActual={props.removeActual} />
            <ActualForm meta={m.meta} submit={props.submitFields} onChangeValue={props.handleChangeValueFields} />
          </React.Fragment>
        )}
      </React.Fragment>
    )
  } else {
    return (null)
  }

}
export default ProfileForm;
