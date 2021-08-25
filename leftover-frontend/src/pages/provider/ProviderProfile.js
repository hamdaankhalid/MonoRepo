import NavigationBar from '../../components/NavigationBar';
import auth from '../../wrappers/auth';
import useFetch from '../../apis/useFetch';

export default function ProviderProfile(props){
    
   
    const providerProfileNavBar = [
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
        `http://127.0.0.1:3000/provider/${54}`, true
    )

    if(loading){
        return (<>
            <div>Loading</div>
        </>)
    }

    if(error !== null){
        return (<>
            <div>error</div>
        </>)
    }

    return (
        <>
        <NavigationBar homeLink="/" links={providerProfileNavBar} />
        <div className="">
            <div className="BlurredCard">
                <h3>PROFILE PAGE</h3>
            </div>
            <div>
                { data?.approved_by_super_admin === false  ? 
                <div>
                    {data?.name} <br />
                    {data?.email} <br />
                    {data?.phone} <br />
                    {data?.address} <br />
                    {data?.created_at} <br />
                </div> 
                :
                 <div> 
                 Sorry, profile awaiting approval
                 </div>
                }
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