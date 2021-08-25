import NavigationBar from '../../components/NavigationBar';
import './ShopperLanding.css'

export default function ShopperLanding(){
    const shopperLandingNavBar = [
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
        <NavigationBar homeLink="/" links={shopperLandingNavBar} />
        <div className="ShopperBase">
        
            <div className="BlurredCard">
                <h3>Welcome Shoppers</h3>
            </div>
     
        </div>
        </>
    )
};