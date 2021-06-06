import axios from 'axios';

const config = {
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT'
  }
}

export default axios.create(config)
