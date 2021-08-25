import NavigationBar from '../../components/NavigationBar';
import './ProviderLanding.css'

export default function ProviderLanding(){
    const providerLandingNavBar = [
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
            link: "/",
            name: "Shoppers",
            index: 3,
        },
    ];

    return (
        <>
        <NavigationBar homeLink="/" links={providerLandingNavBar} />
        <div className="ProviderBase">
            <div className="BlurredCard">
                <h3>Welcome Providers</h3>
            </div>
        </div>
        
        </>
    )
};