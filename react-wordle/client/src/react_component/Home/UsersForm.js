import React from "react";
import '../../App.js';

class UsersForm extends React.Component {

    render() {

        const { name, 
                password,
                firstName,
                lastName,
                age,
                addUser, 
                handleInputChange,
                handleSubmit
             } = this.props;

        return(
            <div>
                <form className="adminUserInput" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input 
                    value={ name }
                    onChange={ handleInputChange }
                    name ="username"
                    placeholder="Type username here" />

                    <label>Password:</label>
                    <input 
                    value={ password }
                    onChange={ handleInputChange }
                    name ="password"
                    placeholder="Type password here" />

                    <label>First Name:</label>
                    <input 
                    value={ firstName }
                    onChange={ handleInputChange }
                    name ="firstName"
                    placeholder="Type first name here" />

                    <label>Last Name:</label>
                    <input 
                    value={ lastName }
                    onChange={ handleInputChange }
                    name ="lastName"
                    placeholder="Type last name here" />

                    <label>Age:</label>
                    <input 
                    value={ age }
                    onChange={ handleInputChange }
                    name ="age"
                    placeholder="Type age here" />
                    
                    <input 
                    type="submit"
                    onClick={ addUser }
                    value="Add User"  />
                </form>
            </div>
        )
    }

}

export default UsersForm;