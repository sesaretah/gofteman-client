import React from "react";
import { Block, Card, CardHeader, Link, CardContent, List, ListItem, CardFooter, ListInput, Col } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const Works = (props) => {
    function chip(status) {
        if (status) {
            return (
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
            return (<div>{dict.add_stauts}</div>)
        }
    }
    if (props.task) {
        return (
            <Card>
                <CardHeader>
                    {dict.works}
                    <Link href={'/works/new/' + props.task.id}><i className="ml-5 fa fa-plus"></i> {dict.new}</Link>
                </CardHeader>
                <CardContent>
                    <List mediaList >
                        {props.task.works.map((work) =>
                            <ListItem
                                className='work-media'
                                link={"/works/" + work.id}
                                title={work.title}
                                after={chip(work.status)}
                                text={work.details}
                            >
                            </ListItem>
                        )}
                    </List>
                </CardContent>
                <CardFooter>
                    +
              </CardFooter>
            </Card>
        )
    } else {
        return (<ul></ul>)
    }
}
export default Works;
