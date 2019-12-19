import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';

class Navbar extends Component {

    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken');
        this.props.history.push(`/`)
    }

  render() {
    const loginRegLink = (
        <ul className="nav nav-tabs">

            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    <h1><img src="https://img.icons8.com/cute-clipart/64/000000/login-rounded-right.png"/> Login</h1>
                </Link>
            </li> 

            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    <h1><img src="https://img.icons8.com/dusk/64/000000/create-new.png"/> Register</h1>
                </Link>
            </li>     

        </ul>
    );

    const userLink = (
        <ul className="nav nav-tabs">

        <li className="nav-item">
            <Link to="/profile" className="nav-link">
                <h1><img src="https://img.icons8.com/clouds/100/000000/user.png" /> User</h1>
            </Link>
        </li> 

        <li className="nav-item">
            <Link to="/uploads" className="nav-link">
                <h1><img src="https://img.icons8.com/nolan/64/000000/upload.png" /> Assignment Submission</h1>
            </Link>
        </li>  

        
        <li className="nav-item">
            <Link to="/assigments" className="nav-link">
                <h1><img src="https://img.icons8.com/flat_round/64/000000/list--v3.png" /> Assignments </h1>
            </Link>
        </li>  


        <li className="nav-item">
            <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                <hi><img src="https://img.icons8.com/color/48/000000/logout-rounded-down--v1.png" />Logout</hi>
            </a>
        </li>  

    </ul>
    );

    return(
        <nav className="navbar navbar-expand-lg navbar-light rounded">
            <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbar1" 
            aria-controls="navbar1" 
            aria-expand="false" 
            aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <h1><img src="https://img.icons8.com/cute-clipart/64/000000/home.png"/> Home</h1>
                        </Link>
                    </li>
                </ul>

                {localStorage.usertoken ? userLink: loginRegLink}

            </div>

        </nav>
    )
  }
}

export default withRouter(Navbar);
