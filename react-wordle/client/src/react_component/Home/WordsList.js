import React from "react";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";

class WordsList extends React.Component {

    
    render() {
        const { words, wordColumns, removeWord } = this.props;

        return(
            <div className="adminUserTableContainer">
                <Table className="adminUserTable">
                    <thead>
                    <tr>
                        <th>Word</th>
                        <th>Length</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                    </thead>
                    { words.map((word) => {
                        return(
                        
                            <tbody>
                            <tr>
                                <td contenteditable="true">{ word.word }</td> 
                                <td contenteditable="true">{ word.length }</td> 
                                <td contenteditable="true"> { word.status } </td>
                                <td><Button 
                                onClick={ () => removeWord(word) }
                                className="removeUser"> Remove </Button></td> 
                                
                            </tr>
                            </tbody>)
                        })}
                </Table>

                        
                    
                
            </div>
        )
    }

}

export default WordsList;