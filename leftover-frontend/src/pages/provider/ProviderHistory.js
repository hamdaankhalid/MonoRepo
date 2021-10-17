import NavigationBar from '../../components/NavigationBar';
import auth from '../../wrappers/auth';
import useFetch from '../../apis/useFetch';
import { Form, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateItemForm from '../../components/UpdateItemForm';
import RepublishItemForm from '../../components/RepublishItemForm';

// view all items
// Unpublish item
// update items
// repost items

export default function ProviderHistory(props) {

    const [show, setShow] = useState({});

    const handleClose = (id) => setShow( prevState => ({
        ...prevState,
        [id]: false,
    }));

    const handleShow = (id) => setShow( prevState => ({
        ...prevState,
        [id]: true,
    }));

    const providerHistoryNavBar = [
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

    const handleDelete = (idUnpublish) => {
        console.log(idUnpublish);
        const auth_token = localStorage.getItem("auth_token");
        const config = { headers: { 'Authorization': 'Bearer ' + auth_token } }

        axios.post(
            `http://127.0.0.1:3000/item/unpublish`, {

            itemId: idUnpublish
        }
            ,
            config
        ).then(
            () => props.history.push("/provider/history")
        )
            .catch((error) => {
                console.error(error)

            });
    }

    const { data, loading, error } = useFetch(
        `http://127.0.0.1:3000/provider/me`, true
    );

    const providerProfileId = data?.id;
    
    const { data: itemData, loading: itemLoading, error: itemError } = useFetch(
        `http://127.0.0.1:3000/item?providerProfile=${providerProfileId}`, true,  providerProfileId!==null && providerProfileId !== undefined
    );

    if (loading || itemLoading ) {
        return (<>
            <div>Loading</div>
        </>)
    }

    if (error !== null || itemError !== null) {
        return (<>
            <div>ERROR: {error}, {itemError}</div>
        </>)
    }
    

    return (
        <>
            <NavigationBar homeLink="/" links={providerHistoryNavBar} logoutGroup={'food_bank'} history={props.history}  />
            <div className="">
                <div>
                    Welcome {data?.name}
                </div>
                <div className="BlurredCard">
                    <h3>History</h3>
                </div>
                <div>
                    {
                        itemData.map(function (d, idx) {
                           
                            if (d.published) {
                                
                                return (
                                    <div key={idx} style={{ padding: 10 }}>
                                        <Button variant="primary" onClick={() => handleShow(idx)}>
                                            {d.name}
                                        </Button>

                                        <Modal show={show[idx]} onHide={() => handleClose(idx)}>
                                            <Modal.Header >
                                                <Modal.Title>{d.name}</Modal.Title>

                                            </Modal.Header>
                                            <Modal.Body>
                                                <UpdateItemForm itemId={d.id}/>
                                                
                                                   
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="danger" onClick={() => handleDelete(d.id)}>
                                                    Un-publish
                                                </Button>

                                                <Button variant="secondary" onClick={() => handleClose(idx)}>
                                                    Close
                                                </Button>

                                            </Modal.Footer>
                                        </Modal>

                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={idx}>
                                        <Button variant="secondary" onClick={() => handleShow(idx)}>
                                            {d.name}
                                        </Button>

                                        <Modal show={show[idx]} onHide={() => handleClose(idx)}>
                                            <Modal.Header >
                                                <Modal.Title>{d.name}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>

                                                <RepublishItemForm itemId={d.id}/>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => handleClose(idx)}>
                                                    Close
                                                 </Button>
                                               
                                            </Modal.Footer>
                                        </Modal>

                                    </div>
                                )
                            }

                        })
                    }

                </div>

            </div>
        </>
    )
};