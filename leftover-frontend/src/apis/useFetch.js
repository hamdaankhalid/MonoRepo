import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import auth from '../wrappers/auth';

export default function useFetch(url, authenticatedRequest){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
        async function makeRequest(){

        setLoading(true);
        try {
            if(authenticatedRequest){
                const auth_token = localStorage.getItem("auth_token");
                const config = { headers: { 'Authorization': 'Bearer ' + auth_token } }
                await axios.get(url, config).then( result => setData(result.data.data));
            }
            else{
                await axios.get(url).then( result => setData(result.data.data));
            }
        } catch (error) {
            // if error is unauthenticated or unauthorized logout
            if(error.status === 403 || error.status === 401){
                auth.logout( () => {
                    history.push('/logout');
                })
            } else {
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    }
    makeRequest();

    }, [url, authenticatedRequest, history]);

    return { data, loading, error };    
   
}