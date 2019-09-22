import React from "react";
import { List, ListItem, BlockTitle, Button, Icon} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const WorkflowTableList = (props) => {

    return (
      <React.Fragment>
        {props.workflowTables.map((workflowTable) =>
        <div className="data-table card">
          <BlockTitle>{dict.workflow}: {props.workflows.filter(item => item.id == Object.keys(workflowTable)[0])[0].title}</BlockTitle>
          <table>
            <thead>
              <tr>
                <td>{dict.actions}</td>
                <td>{dict.auxiliary_table}</td>
              </tr>
            </thead>

            <tbody>
              {workflowTable[Object.keys(workflowTable)[0]].map((a) =>
                <tr>
                <td className="checkbox-cell" key={crypto.lib.WordArray.random(32)}>
                  <Button color='gray' onClick={() => props.remove({workflow_id: Object.keys(workflowTable)[0], auxiliary_table_id:  a.auxiliary_table_id})}>
                    <Icon ios="f7:trash" aurora="f7:trash" md="material:trash"></Icon>
                  </Button>
                </td>
                <td>
                  {
                    props.auxiliaryTables.filter(item => item.id == a.auxiliary_table_id)[0].title
                  }
                </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>)}
      </React.Fragment>
    )
  }
  export default WorkflowTableList;
