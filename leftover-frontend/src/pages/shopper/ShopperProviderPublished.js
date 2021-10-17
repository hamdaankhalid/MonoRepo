import { Form, Button, Modal } from 'react-bootstrap';
import NavigationBar from '../../components/NavigationBar';
import { useState } from 'react';

export default function ShopperProviderPublished(props){

    const shopperProviderPublishedNavBar = [
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

    console.log('provider ID', props.match.params.id);

    const itemList = [
        {
            created_at: '10/10/2020',
            updated_at: '10/10/2020',
            provider_profile_id: '1',
            created_by_id: '111',
            updated_by_id: '111',
            unpublished_by_id: '111',
            name: 'Food',
            description: 'Lots of food',
            units: 12,
            unit_of_measurement: 'packs',
            amount_restriction: 1,
            price_before: '',
            price_after: '',
            item_expiration: '20/20/2020',
            published: true,
        },
    ]

    return(
        <> 
            <NavigationBar links={shopperProviderPublishedNavBar} logoutGroup={'shopper'} history={props.history} />

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

            {/* Display all items in clickable link manner, if pressed view info about provider then opens modal, else routes to a page for /shopper/provider/:id/items */}

            {itemList.map((function (d, idx) {
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
                            {d.description} <br />
                            {d.units} <br />
                            {d.unit_of_measurement} <br />
                            {d.amount_restriction} <br />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleClose(idx)}>
                            Close
                            </Button>
                            {/* <Button variant="primary"> View Items Published</Button> */}
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