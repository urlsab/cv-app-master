import axios from 'axios';

const API_URL = 'http://localhost:4000/';

const API = axios.create({
    baseURL: API_URL
});

export const getAllResumesData = async () => {
    try {
        const { data } = await API.get('allResume');

        return data;
        
    } catch (err) {
        console.log(err);
    }
}

// export const getResumeById = async () => {
//     try {
//         const { data } = await API.get('')
//     }
// }