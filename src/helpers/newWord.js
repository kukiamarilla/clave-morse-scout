import wordList from 'an-array-of-spanish-words';

export const newWord = () => {
    const words = wordList.filter(word => word.length === 6)
    return words[Math.floor(Math.random() * words.length)]
}