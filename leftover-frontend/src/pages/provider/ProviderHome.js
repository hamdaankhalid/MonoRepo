import { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import auth from '../../wrappers/auth';
import axios from 'axios';
import useFetch from '../../apis/useFetch';
import CreateItemForm from '../../components/CreateItemForm';


export default function ProviderHome(props){

    const providerHomeNavBar = [
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

    const { data, loading, error } = useFetch(
        `http://127.0.0.1:3000/provider/me`, true
    );

    const providerProfileId = data?.id;

    if (loading) {
        return (<>
            <div>Loading</div>
        </>)
    }

    if (error !== null) {
        return (<>
            <div>ERROR: {error}</div>
        </>)
    }


    return (
        <>
        <NavigationBar homeLink="/" links={providerHomeNavBar} logoutGroup={'food_bank'} history={props.history}  />
        <div>
           Welcome { data?.name }
        </div>

        <div className="">
            <div className="BlurredCard">
                <h3>Authenticated and Authorized Provider Page</h3>
            </div>
            
            <div>

                <CreateItemForm />

            </div>

        </div>
        </>
    )
};