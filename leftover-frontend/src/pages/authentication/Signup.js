import { useReducer } from 'react';
import NavigationBar from '../../components/NavigationBar';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import ProviderSignupForm from '../../components/ProviderSignupForm';
import ShopperSignupForm from '../../components/ShopperSignupForm';


// Can signup as a Shopper or as a provider


function reducer(state, action) {
    switch (action.type) {
      case 'shopper':
        return {isProvider: false, isShopper: true};
      case 'provider':
        return {isProvider: true, isShopper: false};
      default:
        throw new Error();
    }
  }

export default function Signup(){
    const initialState = {isProvider: false, isShopper: false};

    const [state, dispatch] = useReducer(reducer, initialState);

    const signupNavBar = [
        {
            link: "/signup",
            name: "Signup",
            index: 1,
        },
        {
            link: "/login",
            name: "Login",
            index: 2,
        },
        {
            link: "/provider",
            name: "Provider",
            index: 3,
        },
    ];

    return (
        <>
        <NavigationBar homeLink="/" links={signupNavBar} />
        <div className="AuthPage">
            <div className="BlurredCard"> 
            <div style={{ margin: '10px' }}>

           
                <div className = "Selector">
                    <ToggleButtonGroup type="radio" name="options" defaultValue={[]} >
                        <ToggleButton id="tbg-radio-2" value={2} onClick={()=>dispatch({type: 'shopper'})}>
                        Shopper
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-3" value={3} onClick={()=>dispatch({type: 'provider'})}>
                        Provider
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div>
                    {   
                        state.isProvider ? <ProviderSignupForm /> : null
                    }
                    {
                        state.isShopper ? <ShopperSignupForm /> : null
                    }
                    
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
