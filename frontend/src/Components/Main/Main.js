import {Component} from 'react'
import {Switch, Route, Redirect, Link, NavLink} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Outing from '../Outing/Outing'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Navbar, NavbarBrand } from 'reactstrap'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())}
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){
        return(
            <div className='main-container'>
                <Navbar>
                    <NavbarBrand>
                        Restaurant Tinder
                    </NavbarBrand>
                    <NavLink to='/home'>Home</NavLink>
                    {this.props.token.token && <NavLink to='/outing'>My Outings</NavLink>}
                    {
                        this.props.token.token !== undefined ?
                            <NavLink to='/login' onClick={this.handleLogout}>Log Out</NavLink>
                        :
                            <NavLink to='/login'>Log In</NavLink>
                    }
                </Navbar>
                
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={() => <Home/>}/>
                    <Route path='/outing' component={() => <Outing userToken={this.props.token.token}/>} />
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));