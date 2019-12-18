import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'


class Profile extends Component {

   constructor(){
       super()
       this.state ={
            first_name: '',
            last_name: '',
            email: ''
       }
   }

   componentDidMount(){
       const token= localStorage.usertoken
       const decoded = jwt_decode(token)
       this.setState({
           first_name:decoded.first_name,
           last_name:decoded.last_name,
           email:decoded.email
       })
   }


  render() {

    return (
      <div className="container">
          <div className="jumborton mt-5">
              <div className="col-sm8 mx-auto">
                  <h1 className="text-center">Profile</h1>
              </div>

              <table className="table col-md6 mx-auto">
                  <h2>
                      <tbody>

                          <tr>
                              <td>First Name</td>
                              <td>{this.state.first_name}</td>
                          </tr>

                          <tr>
                              <td>Lastt Name</td>
                              <td>{this.state.last_name}</td>
                          </tr>

                          <tr>
                              <td>Email</td>
                              <td>{this.state.email}</td>
                          </tr>

                      </tbody>
                  </h2>
              </table>
          </div>
        
      </div>
    );
    
  }
}

export default Profile;
