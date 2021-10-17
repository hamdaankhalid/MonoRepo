import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import auth from '../wrappers/auth';
import useFetch from '../apis/useFetch';



export default function RepublishItemForm(props){
    const history = useHistory();

    const { data, loading, error } = useFetch(
        `http://127.0.0.1:3000/item/${props.itemId}`, true
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const auth_token = localStorage.getItem("auth_token");
        const config = { headers: { 'Authorization': 'Bearer ' + auth_token } }

        console.log(
            {
                name: form.name.value,
                description: form.description.value,
                units: form.units.value,
                unit_of_measurement: form.unit_of_measurement.value,
                amount_restriction: form.amount_restriction.value,
                item_expiration: form.item_expiration.value
            }
        );

        axios.post(
          'http://127.0.0.1:3000/item/', {
            name: form.name.value,
            description: form.description.value,
            units: form.units.value,
            unit_of_measurement: form.unit_of_measurement.value,
            amount_restriction: form.amount_restriction.value,
            item_expiration: form.item_expiration.value
        }, config )
        .then((response) => {
            console.log(response);
            // history.push('/provider/profile');
        }).catch((error) => {
            console.log(error)
            event.stopPropagation();
      });
    };

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

    /*
        :name => params[:name],
        :description => params[:description],
        :units => params[:units],
        :unit_of_measurement => params[:unit_of_measurement],
        :amount_restriction => params[:amount_restriction],
        :item_expiration => params[:item_expiration],
        :published => true
        :provider_profile => provider_profile,
        :created_by => created_by
    */

    return (
        <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name of Item" defaultValue={data?.name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" defaultValue={data?.description}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="units">
                        <Form.Label>Units</Form.Label>
                        <Form.Control type="int" placeholder="Number of units" defaultValue={data?.units}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="unit_of_measurement">
                        <Form.Label>Unit Of Measurement</Form.Label>
                        <Form.Control type="text" placeholder="Enter unit of measurement" defaultValue={data?.unit_of_measurement}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="amount_restriction">
                        <Form.Label>Amount Restriction</Form.Label>
                        <Form.Control type="int" placeholder="Enter amount restriction" defaultValue={data?.amount_restriction}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="item_expiration">
                        <Form.Label>Item Expiration</Form.Label>
                        <Form.Control type="date" placeholder="Enter expiration" />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Republish
                    </Button>

        </Form>
    )
}