import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import '../Login/login.css'

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = {username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        if(this.state.password === this.state.confirmPassword){
            axios.post(baseUrl + "/register", data).then(response => alert(response.data))
        }else{
            alert("Password and Confirm Password must match!!!")
        }
    }

    render(){
        return(
            <div className='register'>
                <h1>Create Account</h1>
                <Form>
                <label class="sr-only">Username</label>
                <FormGroup>
                <Input
                    type="email"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="Email Address"
                    v-model="user.username"
                    onChange={this.handleInputChange}
                    required
                />
                </FormGroup>
                <br/>
                <FormGroup>
                <label class="sr-only">Password</label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                </FormGroup>
                <br/>
                <FormGroup>
                <Input
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                </FormGroup>
                <br/>
                <Button color='primary' type="submit" onClick={this.handleSubmit}>Sign in</Button>
                </Form>
                <Link to="/login">Have an account?</Link>

            </div>
        )
    }
}

export default Register;