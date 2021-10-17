import { Form, Button, Modal } from 'react-bootstrap';
import NavigationBar from '../../components/NavigationBar';
import { useState } from 'react';

export default function ShopperHome(props){

    const shopperHomeNavBar = [
        {
            link: "/shopper/home",
            name: "Home",
            index: 1,
        },{
            link: "/shopper/items",
            name: "Item Search",
            index: 2,
        },{
            link: "/shopper/profile",
            name: "Profile",
            index: 3,
        },
    ];

    const [show, setShow] = useState({});

    const handleClose = (id) => setShow(prevState => ({
        ...prevState,
        [id]: false,
    }));

    const handleShow = (id) => setShow(prevState => ({
        ...prevState,
        [id]: true,
    }));

    const providerList = [
        {   
            id: 1,
            name: 'Target Food Donations',
            type_of: 'food_bank',
            address: '186 south front street',
            email: 'target@foodbank.com',
            phone: '1234567890',
        },
        {
            id: 2,
            name: 'Walmart Donations',
            type_of: 'food_bank',
            address: '220 ohio street',
            email: 'walmart@foodbank.com',
            phone: '11122233340',
        },
        {
            id: 3,
            name: 'Target Donations',
            type_of: 'food_bank',
            address: '186 south front street',
            email: 'target@foodbank.com',
            phone: '1234567890',
        },
    ]

    return(
        <> 
            <NavigationBar links={shopperHomeNavBar} logoutGroup={'shopper'} history={props.history} />

            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="search" placeholder="" />
                <Form.Text className="text-muted">

                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Search
            </Button>
            </Form>

            {/* Display all providers in clickable link manner, if pressed view info about provider then opens modal, else routes to a page for /shopper/provider/:id/items */}

            {providerList.map((function (d, idx) {
                    return (
                    
                        
                        <div key={idx}>
                        <br />

                        <Button variant="secondary" onClick={() => handleShow(idx)}>
                        {d.name}
                        </Button>

                        <Modal
                        show={show[idx]} 
                        onHide={() => handleClose(idx)}
                        backdrop="static"
                        keyboard={false}
                        >
                        <Modal.Header >
                            <Modal.Title>{d.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                             <br />
                            {d.type_of} <br />
                            {d.address} <br />
                            {d.email} <br />
                            {d.phone} <br />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleClose(idx)}>
                            Close
                            </Button>
                            <Button variant="primary" onClick={() => props.history.push(`provider/${d.id}/items`)}> View Items Published</Button>
                        </Modal.Footer>
                        </Modal>

                        {/* <div>
                            
                        </div> */}

                        </div>
                        
                        

                       
                    )

                    })
                )
            }
        </>
    )
}