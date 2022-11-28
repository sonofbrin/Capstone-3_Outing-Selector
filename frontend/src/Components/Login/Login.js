import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import './login.css';
import { func } from 'prop-types'


const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async (event) => {
        event.preventDefault()
        const data = { username: this.state.username, password: this.state.password };
        

        const userWithToken = await axios.post(baseUrl + '/login', data).catch(()=>{alert('Incorrect login credentials')})
        
        if(userWithToken !== undefined){
            await this.props.dispatch(addToken(userWithToken.data.token))
            await this.props.dispatch(addUser(userWithToken.data.user));
        }
        
       
        }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className='login'>
                <Form className='loginForm'>
                <h1>Please Sign In</h1>
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
                <Button className='loginButton' color='primary' type="submit" onClick={this.handleLogin}>Sign in</Button>
                </Form>
                <div className='underLogin'>
                <Link to="/register">Forgot Password</Link>
                
                {' '}
                <Link to="/register">Need an account?</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));