import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function ProviderSignupForm() {
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    axios.post(
      'http://127.0.0.1:3000/provider/', null, {
        params: {
          name: form.name.value,
          type: form.type.value,
          address: form.street.value,
          phone: form.phone.value,
          email: form.email.value,
          password: form.password.value
        }
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then((response) => {
      history.push('/login')
    }).catch((error) => {
      console.log("ERROR HAS BEEN SEEN")
      console.error(error)
      event.preventDefault();
      event.stopPropagation();
    });
    event.preventDefault();
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Row className="mb-3">
  
           <Form.Group as={Col} md="6" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
            />
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
           
           </Form.Group>
          

          <Form.Group as={Col} md="4" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control as="select">
              <option>Select Type</option>
              <option value="foodBank">Food Bank</option>
              <option value="groceryStore">Grocery Store</option>
              <option value="restaurant">Restaurant</option>
            </Form.Control>
          </Form.Group>


        </Row>


        <Row className="mb-3">

          <Form.Group as={Col} md="6" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control type="text" placeholder="street" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Street.
             </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
             </Form.Control.Feedback>
          </Form.Group>

        </Row> 

        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
             </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="zip">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
             </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="phone">
            <Form.Label>Phone#</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
             </Form.Control.Feedback>
          </Form.Group>

        </Row>


        <Row className="mb-3">


          <Form.Group md="5" as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
             </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Password"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

        </Row>

        <Button type="submit">Submit form</Button>

      </Form>
    </div>
  )
}

export default ProviderSignupForm;