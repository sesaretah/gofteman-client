import React from "react";
import { Card, CardHeader, Link, CardContent, Row, Col} from 'framework7-react';
import crypto from 'crypto-js';

import { dict } from "../../Dict";

const ReportList = (props) => {
  if (props.reports && props.reports.length > 0) {
    return (
      <React.Fragment>
        <Row noGap>
          {props.reports.map((report) =>
            <Col width="100" tabletWidth="33" key={crypto.lib.WordArray.random(128/8)}> 
              <Card className="demo-facebook-card">
                <CardHeader className="no-border">
                <div className="demo-facebook-avatar"><Link tooltip={report.profile.fullname} href={'/profiles/' + report.profile.id}><img src={report.profile.avatar} height="34" /></Link></div>
                  <div className="demo-facebook-name ">
                    <div className="demo-facebook-profile ">
                      <Link className="gray-color" href={'/profiles/' + report.profile.id}>{report.profile.fullname.substring(0, 40)}</Link>
                    </div>
                    <Link tooltip={dict.view} className="gray-color" href={'/reports/' + report.id}>{report.title.substring(0, 15) + '..'}</Link></div>
                  <div className="demo-facebook-date">
                    
                  </div>
                </CardHeader>
                <CardContent className='lightgray-color fs-12'>
                  {report.content.substring(0, 150) + '...'}
                  <div className="demo-facebook-more">
                    <Link className="gray-color" href={'/reports/' + report.id}>
                      {dict.view}
                      <i className="va fa fa-arrow-left mr-2"></i>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Col>
          )}
        </Row>
        <Row noGap>
          <Col></Col>
          <Col className='center mb-20'>
          <a className="gray-color" onClick={() => props.loadMore()}>
            {dict.more}
          </a>
          </Col>
          <Col></Col>
        </Row>
      </React.Fragment>
    )
  } else {
    return (<ul></ul>)
  }
}
export default ReportList;
