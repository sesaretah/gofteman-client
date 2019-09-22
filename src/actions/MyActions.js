import dispatcher from "../dispatcher";
import axios from 'axios';
const server='http://localhost:3001/v1';
//const server='http://95.156.255.115/api';


export function getList(model, page=1, params={}) {
  var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  axios.get(server + '/'+ model +'?page='+page+'&'+queryString)
  .then(function (response) {
    dispatcher.dispatch({
      type: "LIST_MODEL_SUCCESS",
      list: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getInstance(model, id) {
  axios.get(server + '/'+ model +'/'+id)
  .then(function (response) {
    dispatcher.dispatch({
      type: "GET_INSTANCE_SUCCESS",
      instance: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function removeInstance(model, params={}) {
  var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  axios.get(server + '/'+ model +'/delete?'+queryString)
  .then(function (response) {
    dispatcher.dispatch({
      type: "DELETE_INSTANCE_SUCCESS",
      instance: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function setInstance(model, data) {
  axios.post(server + '/'+ model +'/', data)
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SET_INSTANCE_SUCCESS",
      instance: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function updateInstance(model, data) {
  axios.put(server + '/'+ model +'/'+data.id, data)
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SET_INSTANCE_SUCCESS",
      instance: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}
