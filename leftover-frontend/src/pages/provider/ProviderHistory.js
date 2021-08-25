import { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import auth from '../../wrappers/auth';
import axios from 'axios';

async function fetchHistory(){
    const auth_token = localStorage.getItem("auth_token");
    const config = { headers: { 'Authorization': 'Bearer ' + auth_token } }


    const profileData = await  axios.get(`http://127.0.0.1:3000/provider/${54}`, config)
    
    
    return profileData.data.data;
}

export default function ProviderHistory(props){
    
    const [providerProfile, setProviderProfile] = useState(null);

    const providerHistoryNavBar = [
        {
            link: "/provider/home",
            name: "Home",
            index: 1,
        },{
            link: "/provider/profile",
            name: "Profile",
            index: 2,
        },{
            link: "/provider/history",
            name: "History",
            index: 3,
        },
    ];

    useEffect(() => {
        const data = fetchHistory();
        console.log(data);
        setProviderProfile( data.address );
    },[])

    return (
        <>
        <NavigationBar homeLink="/" links={providerHistoryNavBar} />
        <div className="">
            <div className="BlurredCard">
                <h3>Authenticated and Authorized Provider Page</h3>
            </div>
            <div>
                { providerProfile }
            </div>
            <button onClick={() => {
                auth.logout( () => { props.history.push("/")} )}
            }>
                Logout
            </button>
        </div>
        </>
    )
};