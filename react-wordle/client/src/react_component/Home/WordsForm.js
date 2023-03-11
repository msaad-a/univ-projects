import React from "react";
import '../../App.js';

class WordsForm extends React.Component {

    render() {

        const { name, 
                length,
                addWord, 
                handleInputChange,
                handleSubmit
             } = this.props;

        return(
            <div>
                <form className="adminUserInput" onSubmit={handleSubmit}>
                    <label>Word:</label>
                    <input 
                    value={ name }
                    onChange={ handleInputChange }
                    name ="word"
                    placeholder="Type Word here" />

                    <label>Length:</label>
                    <input 
                    value={ length }
                    onChange={ handleInputChange }
                    name ="length"
                    placeholder="Type length here" />

                    <input 
                    type="submit"
                    onClick={ addWord }
                    value="Add Word"  />
                </form>
            </div>
        )
    }

}

export default WordsForm;