import React from "react";
import { Searchbar, Card, CardHeader, Link, CardContent, List, ListItem, CardFooter, Row, Col } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const Works = (props) => {

    function chip(work) {
        var result = []
        if (work.deadline_alert) {
            result.push(
                <span className='color-red ml-5'>
                    <i class="fa fa-bell-o" aria-hidden="true"></i>
                </span>
            )
        }

        if (work.comment_alert) {
            result.push(
                <span className='color-green ml-5'>
                    <i class="fa fa-comments-o " aria-hidden="true"></i>
                </span>
            )
        }
        if (work.report_alert) {
            result.push(
                <span className='color-blue ml-5'>
                    <i class="fa fa-file-text-o " aria-hidden="true"></i>
                </span>
            )
        }
        if (work.status) {
            result.push(

                <div className="chip" key={'work-status-chip' + work.id }>
                    <div className="chip-media" style={{ backgroundColor: work.status.color }} >
                        <i className="icon f7-icons if-not-md">plus_circle</i>
                        <i className="icon material-icons md-only"></i>
                    </div>
                    <div className="chip-label">{work.status.title}</div>
                </div>
            )

        } else {
            result.push(dict.add_stauts)
        }
        return (result)
    }

    function editable() {
        if (props.editable) {
            return (<Link href={'/works/new/' + props.task.id}><i className="ml-5 fa fa-plus"></i> {dict.new}</Link>)
        }
    }

    if (props.task) {
        return (
            <Card>
                <CardHeader>
                    {dict.works}
                    {editable()}
                </CardHeader>
                <CardContent>
                    <List mediaList >
                        {props.task.works.map((work) =>
                            <ListItem
                                key={'work'+work.id}
                                className='fs-11 work-media'
                                link={"/works/" + work.id}
                                title={work.title}
                                after={chip(work)}
                                text={work.details}
                            >
                            </ListItem>
                        )}
                    </List>
                </CardContent>
                <CardFooter>

                    <Searchbar
                        className='p-static fs-10'
                        disableButtonText={dict.cancel}
                        placeholder={dict.search}
                        inline={true}
                    ></Searchbar>

                </CardFooter>
            </Card>
        )
    } else {
        return (<ul></ul>)
    }
}
export default Works;
