import React from "react";
import '../../App.js';

class FriendForm extends React.Component {

    render() {

        const { name, 
                addFriend, 
                handleInputChange
             } = this.props;

        return(
            <div>
                <input className="UserSearch"
                value={ name }
                onChange={ handleInputChange }
                type="text"
                name ="friendName"
                placeholder="Search username" />

                <input type="submit"
                onClick={ addFriend } />
            </div>
        )
    }

}

export default FriendForm;