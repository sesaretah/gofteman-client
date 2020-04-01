import React from "react";
import { List, ListItem, ListInput, CardFooter, Button, Card, Link, CardHeader, CardContent, Row } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
import ExpertiesList from "./experties";
import ImageUploader from 'react-images-upload';
const ProfileForm = (props) => {
  console.log(props)
  if (props.name && props.metas) {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>{dict.profile_info}</CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter>
            <Link></Link>
            <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>{dict.experties}</CardHeader>
          <CardContent>
            <List>
              <ListItem>
                <ExpertiesList experties={props.experties} editable={true} removeExperties={props.removeExperties}/>
              </ListItem>
            </List>

            <List form>
              <ListInput
                label={dict.new_experties}
                type="text"
                placeholder='...'
                defaultValue={props.expert}
                onInput={(e) => {
                  props.handleChange({ expert: e.target.value })
                }}
              />

            </List>
          </CardContent>
          <CardFooter>
            <Link></Link>
            <Button className="col" fill onClick={props.submitExperties}>{dict.submit}</Button>
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
            buttonClassName='upload-btn'
            imgExtension={['.jpg', '.jpeg', '.png']}
            maxFileSize={5242880}
          />
        </Card>


      </React.Fragment>
    )
  } else {
    return (null)
  }

}
export default ProfileForm;
