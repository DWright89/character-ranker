import VoteSerializer from "./voteSerializer.js"

class CharacterSerializer {
  static async getDetails(character, currentUser) {
    character.votes = await character.$relatedQuery('votes')
    const cleanedVote = VoteSerializer.getDetails(character.votes, currentUser)

    let cleanedCharacter = {
      id: character.id,
      name: character.name,
      gameTitle: character.gameTitle,
      gameSeries: character.gameSeries,
      pictureUrl: character.pictureUrl,
      description: character.description,
      sum: cleanedVote.sum,
      voted: cleanedVote.voted
    }
    return cleanedCharacter
  }

  static async getSummary(characterArray) {
    const allowedAttributes = ["id", "name", "pictureUrl"]
    const serializedCharacters = []
    for (const character of characterArray) {
      const serializedCharacter = {}
      for (const attribute of allowedAttributes) {
        serializedCharacter[attribute] = character[attribute]
      }
      character.votes = await character.$relatedQuery("votes")
      serializedCharacter.sum = VoteSerializer.voteCount(character.votes)
      serializedCharacters.push(serializedCharacter)
    }
    const sortedCharacters = serializedCharacters.sort((a, b) => {
      return b.sum - a.sum
    })

    return sortedCharacters
  }

  static async getRanked(characterArray) {
    const allCharacters = await this.getSummary(characterArray)
    const topFiveCharacters = allCharacters.slice(0, 5)
    const bottomCharacter = allCharacters.pop()
    return { topFiveCharacters, bottomCharacter }
  }

  static validateCharacter(cleanedForm) {
    const regex = /[a-zA-Z0-9.,?!: ]*/
    const { name, gameTitle, gameSeries, description } = cleanedForm
    const checkedName = name.match(regex)
    const checkedTitle = gameTitle.match(regex)
    const checkedSeries = gameSeries.match(regex)
    const checkedDescription = description.match(regex)

    if (checkedName[0] === name && checkedTitle[0] === gameTitle && checkedSeries[0] === gameSeries && checkedDescription[0] === description) {
      return true
    } else {
      return false
    }
  }
}

export default CharacterSerializer