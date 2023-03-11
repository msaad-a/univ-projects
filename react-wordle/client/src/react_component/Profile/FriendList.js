import React from "react";

import { uid } from 'react-uid';
import Friend from "./Friend";

class FriendList extends React.Component {

    
    render() {
        const { friends, removeFriend } = this.props;

        return(
            <ul>
                { friends.map((friend) => {
                    return(
                        <Friend 
                            key={uid(friend)}
                            friend = { friend }
                            removeFriend = { removeFriend }
                        />
                    )
                })}
            </ul>
        )
    }

}

export default FriendList;