import axios from 'axios'

const url = 'http://localhost:5000/api/archives';

export const fetchArchives = () =>  axios.get(url);

