import React from "react";
import { Card, CardContent, CardHeader } from 'framework7-react';
import 'react-dropzone-uploader/dist/styles.css'
import '../../css/upload.css'
import Dropzone from 'react-dropzone-uploader'
import { dict } from "../../Dict";
const server='http://localhost:3001/v1'

const UploadForm = (props) => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { fields:{'upload[title]':props.title, 'upload[uploadable_type]': props.uploadableType, 'upload[uploadable_id]': props.uploadableId}, url: server+'/uploads' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Card>
      <CardHeader>{dict.attachment}</CardHeader>
      <CardContent>
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      autoUpload={true}
      submitButtonDisabled={true}
      inputContent={dict.drag_or_browse}
    />
    </CardContent>
    </Card>
  )
}

export default UploadForm;
