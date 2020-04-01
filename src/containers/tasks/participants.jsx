import React from "react";
import { Block, AccordionContent, Card, CardHeader, CardContent, List, ListItem, CardFooter, ListInput, Col } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';


const Partcipants = (props) => {
    if (props.task) {

        return (
            <Card>
                <CardHeader>
                    {dict.coworkers}
                </CardHeader>
                <CardContent>
                    <List>
                        {props.task.coworkers.map((worker) =>
                            <ListItem title={worker.fullname}></ListItem>
                        )}
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
                                    />
                                </List>

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
