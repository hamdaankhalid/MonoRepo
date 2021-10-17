import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import auth from '../wrappers/auth';

export default function useFetch(url, authenticatedRequest, shouldMakeRequest = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();


    useEffect(() => {

        async function makeRequest() {

            var internalLoading = true
            var internalError = null
            var internalData = null

            try {
                if (shouldMakeRequest) {
                    if (authenticatedRequest) {
                        const auth_token = localStorage.getItem("auth_token");
                        const config = { headers: { 'Authorization': 'Bearer ' + auth_token } }
                        await axios.get(url, config).then(result => internalData = result.data.data);
                    }
                    else {
                        await axios.get(url).then(result => internalData = result.data.data);
                    }
                }

            } catch (error) {
                // if error is unauthenticated or unauthorized logout
                if (error.status === 403 || error.status === 401) {
                    auth.logout(() => {
                        history.push('/login');
                    })
                } else {
                    console.log(error)
                    internalError = error;
                }
            } finally {
                if (shouldMakeRequest) {
                    internalLoading = false;
                }
                return { internalData, internalLoading, internalError }
            }
        }

        makeRequest().then(
            (res) => {
                var { internalData, internalLoading, internalError } = res;
                console.log(internalData, internalLoading, internalError);
                setData(internalData);
                setLoading(internalLoading);
                setError(internalError);
            });

    }, [url, authenticatedRequest, history, shouldMakeRequest]);

    return { data, loading, error };

}