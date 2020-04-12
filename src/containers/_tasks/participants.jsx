import React from "react";
import { Link, AccordionContent, Card, CardHeader, CardContent, List, ListItem, CardFooter, ListInput, Col } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';
import SimpleList from "../profiles/simpleList";

const Partcipants = (props) => {
    if (props.task) {

        return (
            <Card>
                <CardHeader>
                    {dict.coworkers}
                    <Link><i className="ml-5 fa fa-cog"></i></Link>
                </CardHeader>
                <CardContent>
                    <List>
                        <SimpleList profiles={props.task.participants} removeProfile={props.removeProfile} />
                    </List>
                </CardContent>
                <CardFooter>
                    <List accordionList className='w-100'>
                        <ListItem accordionItem className='fs-10' title={"+ " + dict.add}>
                            <AccordionContent>
                                <List >
                                    <ListInput
                                        outline
                                        label={dict.search}
                                        floatingLabel
                                        type="text"
                                        placeholder=""
                                        clearButton
                                        onInput={(e) => {
                                            props.searchProfile({ query: e.target.value })
                                          }}
                                    />
                                </List>
                                <SimpleList profiles={props.profiles} addProfile={props.addProfile}/>
                            </AccordionContent>
                        </ListItem>
                    </List>
                </CardFooter>
            </Card>
        )
    } else {
        return (<ul></ul>)
    }
}
export default Partcipants;
