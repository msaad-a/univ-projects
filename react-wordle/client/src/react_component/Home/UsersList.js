import React from "react";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";

class UsersList extends React.Component {

    
    render() {
        const { users, columns, removeUser } = this.props;

        return(
            <div className="adminUserTableContainer">
                <Table className="adminUserTable">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Action</th>

                    </tr>
                    </thead>

                    {users.map((user) => {
                        return(
                        
                            <tbody>
                            <tr>
                                <td contenteditable="true">{ user.username }</td>
                                <td contenteditable="true"> { user.firstName } </td>
                                <td contenteditable="true"> {user.lastName}</td>
                                <td contenteditable="true"> {user.age}</td>
                                <td><Button 
                                onClick={ () => removeUser(user) }
                                className="removeUser"> Remove </Button></td> 
                                
                            </tr>
                            </tbody>)
                        })}
                </Table>

                        
                    
                
            </div>
        )
    }

}

export default UsersList;