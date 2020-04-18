import React from "react";
import { Link, AccordionContent, Card, CardHeader, CardContent, List, ListItem, CardFooter, ListInput, Button } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';
import ParticipantList from "../works/participantList";
import  SimpleList from "../profiles/simpleList";
import  TodoForm from "./form";

const TodoList = (props) => {
    if (props.work) {
        function editable() {
            if (props.editable) {
                return ( <Link href={'/todos/new/' + props.work.id}><i className="ml-5 fa fa-plus"></i> {dict.new}</Link>)
            }
        }
        return (
            <Card>
                <CardHeader>
                    {dict.todo_list}
                    {editable()}
                </CardHeader>
                <CardContent>
                    <List>
                        <ParticipantList 
                            participants={props.work.participants} removeProfile={props.removeProfile} 
                            changeRole={props.changeRole} editable={props.editable} />
                    </List>
                </CardContent>
                <CardFooter>
                    
                </CardFooter>
            </Card>
        )
    } else {
        return (<ul></ul>)
    }
}
export default TodoList;
