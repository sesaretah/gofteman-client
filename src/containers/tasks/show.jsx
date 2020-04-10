import React from "react";
import { Block, AccordionContent, Card, Row, Col, CardHeader, CardContent, List, ListItem, Chip, Icon, CardFooter, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import Participants from './participants';

const TaskShow = (props) => {
  if (props.task) {
    return (
      <React.Fragment>
        <Row>
          <Col width='100' tabletWidth='50'>
            <Card>
              <CardHeader>{props.task.title}</CardHeader>
              <CardContent>{props.task.description}</CardContent>
              <CardFooter>
                <List accordionList>
                  <ListItem accordionItem className='fs-10'
                    title={<Chip text="Add Contact" mediaBgColor="blue">
                      <Icon slot="media" ios="f7:plus_circle" aurora="f7:plus_circle" md="material:add_circle"></Icon>
                    </Chip>}>
                    <AccordionContent>
                      <Block>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget ipsum.
          </p>
                      </Block>
                    </AccordionContent>
                  </ListItem>
                </List>

              </CardFooter>
            </Card>
          </Col>

          <Col width='100' tabletWidth='50'>
          <Participants task={props.task} searchProfile={props.searchProfile} removeProfile={props.removeProfile} addProfile={props.addProfile} profiles={props.profiles}></Participants>
          </Col>
        </Row>
       

        <Row>
          <Col width='100' tabletWidth='100'>
            <Card>
              <CardHeader>
                {dict.works}
              </CardHeader>
              <CardContent>
                <List>
                  {props.task.works.map((work) =>
                    <ListItem title={work.title}></ListItem>
                  )}
                </List>
              </CardContent>
              <CardFooter>
                +
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <BlockTitle>{dict.discussions}</BlockTitle>
        <Block>
          <List>
            {props.task.discussions.map((discussion) =>
              <ListItem title={discussion.content}></ListItem>
            )}
          </List>
        </Block>


      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default TaskShow;
