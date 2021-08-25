import LoginForm from '../../components/LoginForm';
import NavigationBar from '../../components/NavigationBar';

export default function Login(){
    const loginNavBar = [
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
            <NavigationBar homeLink="/" links={loginNavBar} />
            <div className="AuthPage">
                <div className="BlurredCard">
                <div style={{ margin: '10px' }}>
                <LoginForm />
                </div>
                </div>
            </div>
        </>
    )
}