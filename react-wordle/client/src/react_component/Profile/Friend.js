import React from "react";

import '../../App.js';
import Button from "@material-ui/core/Button";

class Friend extends React.Component {

    render() {

        const { friend, removeFriend } = this.props;

        return (
            <div>
                <li>
                    <b>{ friend.name }</b> 
                    <span className={ friend.status }> { friend.status } </span>
                    <Button 
                    onClick={ () => removeFriend(friend) }
                    className="removeFriend-button"> Remove </Button>
                </li>
            </div>
        )
    }

}

export default Friend;