import react from 'react';
import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

export function ProtectedRoute({ component: Component, authorizationGroup, ...rest }){

    return(
        <Route {...rest} render={
            (props) =>{
                if(auth.isAuthenticated() && auth.authorizationGroupIs() === authorizationGroup){
                    return <Component {...props} />
                }
                else {
                    return <Redirect to={{
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }}/>
                }
            } 
        }/>
    )
}
