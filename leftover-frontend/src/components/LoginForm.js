import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import auth from '../wrappers/auth';


export default function LoginForm(){
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        axios.post(
          'http://127.0.0.1:3000/authenticate/',null, {params:{
            email: form.email.value,
            password: form.password.value,
        }}, { headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then((response) => {
            
            auth.login(response.data.type_of, () => {
                localStorage.auth_token = response.data.token 
                history.push('/provider/home');
                console.log('To Home Scene')
                });
        }).catch((error) => {
            console.error(error)
            event.stopPropagation();
      });
    };

    return (
        <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
    )
}