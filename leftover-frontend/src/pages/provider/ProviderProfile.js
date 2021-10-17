import NavigationBar from '../../components/NavigationBar';
import auth from '../../wrappers/auth';
import useFetch from '../../apis/useFetch';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function ProviderProfile(props) {


    const providerProfileNavBar = [
        {
            link: "/provider/home",
            name: "Home",
            index: 1,
        }, {
            link: "/provider/profile",
            name: "Profile",
            index: 2,
        }, {
            link: "/provider/history",
            name: "History",
            index: 3,
        },
    ];

    const { data, loading, error } = useFetch(
        `http://127.0.0.1:3000/provider/me`, true
    );

    const providerProfileId = data?.id;


    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const auth_token = localStorage.getItem("auth_token");
        const config = { headers: { 'Authorization': 'Bearer ' + auth_token } }

        axios.patch(
            `http://127.0.0.1:3000/provider/${providerProfileId}`,
            {
            provider: {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                address: form.address.value,
            }
            }, config)
            .then((response) => {
                console.log("SUCCESS", response)
            }).catch((error) => {
                console.error(error)
                event.stopPropagation();
            });
    }

    const handleDelete = (event) => {
        event.preventDefault();

        const auth_token = localStorage.getItem("auth_token");
        const config = { headers: { 'Authorization': 'Bearer ' + auth_token } }

        axios.delete(
            `http://127.0.0.1:3000/provider/${providerProfileId}`,
            config
        ).then(() => {
                auth.logout(() => { props.history.push("/") })
            }
        ).catch((error) => {
            console.error(error)
            event.stopPropagation();
        });
    }

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
            <NavigationBar homeLink="/" links={providerProfileNavBar} logoutGroup={'food_bank'} history={props.history}  />
            <div className="">
                <div className="BlurredCard">
                    <h3>PROFILE PAGE</h3>
                </div>
                <div>
                    {data?.approved_by_super_admin ?
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" defaultValue={data?.name} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" defaultValue={data?.email} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone #</Form.Label>
                                    <Form.Control type="text" defaultValue={data?.phone} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" defaultValue={data?.address} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>

                            {data?.type_of} <br />
                            {data?.created_at} <br />
                            {data?.updated_at} <br />

                            <Button variant="danger" onClick={handleDelete}>
                                DELETE
                            </Button>

                        </div>
                        :
                        <div>
                            Sorry, profile awaiting approval
                 </div>
                    }
                </div>

            </div>
        </>
    )
};