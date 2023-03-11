// import raw from './words_alpha.txt'

class WordVerifier{
    constructor(fs){
        // removed for phase 1 since no files allowed
        // fetch(raw)
        // .then(r => r.text())
        // .then(text => {
        //     this.words = text;
        // });
    }

    isWord = (word) => {
        // this would be a server call.
        return true
        //return this.words.includes(word)
    }
}
export default WordVerifier