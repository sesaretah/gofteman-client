import React from "react";
import { Searchbar, Card, CardHeader, Link, CardContent, List, ListItem, CardFooter, ListInput, Col } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const Reports = (props) => {
    if (props.task) {
        function creation(t) {
            var date = new Date(new window.ODate(t))
            return (<Moment date={date} fromNow></Moment>)
        }
        function editable() {
            if (props.editable) {
                return (<Link href={'/reports/new/tasks/' + props.task.id}><i className="ml-5 fa fa-plus"></i> {dict.new}</Link>)
            }
        }
        return (
            <Card>
                <CardHeader>
                    {dict.reports}
                    {editable()}
                </CardHeader>
                <CardContent>
                    <List mediaList >
                        {props.task.reports.map((report) =>
                            <ListItem
                                key={'report' + report.id}
                                className='fs-11 work-media'
                                link={"/reports/" + report.id}
                                title={report.title}
                                after={creation(report.creation_date)}
                                text={report.content}
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
export default Reports;
