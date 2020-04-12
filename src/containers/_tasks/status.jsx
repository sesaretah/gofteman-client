import React from "react";
import { Block, AccordionContent, Icon, Chip, CardContent, List, ListItem, CardFooter, ListInput, Col } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';
import SimpleList from "../statuses/simpleList";

const Statuses = (props) => {
    function chip(status){
        if(status) {
            return(
                <div>
                <div className="chip" >
                    <div className="chip-media" style={{ backgroundColor: status.color }} >
                        <i className="icon f7-icons if-not-md">plus_circle</i>
                        <i className="icon material-icons md-only"></i>
                    </div>
                    <div className="chip-label">{status.title}</div>
                </div>
            </div>
            )
        } else {
        return(<div>{dict.add_stauts}</div>)
        }
    }
    if (props.task) {
        
        return (
            <List accordionList className='w-100'>
                <ListItem accordionItem className='fs-10'
                    title={chip(props.task.status)}
                >


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
                                    props.searchStatus({ query: e.target.value })
                                }}
                            />
                        </List>
                        <SimpleList statuses={props.statuses} addStatus={props.addStatus} />
                    </AccordionContent>
                </ListItem>
            </List>
        )
    } else {
        return (<ul></ul>)
    }
}
export default Statuses;
