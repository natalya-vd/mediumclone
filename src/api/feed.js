import axios from '@/api/axios';

const getFeed = (apiUrl) => axios.get(apiUrl);

export default {getFeed};
