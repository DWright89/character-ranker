const Model = require("./Model.js")

class Vote extends Model {
  static get tableName() {
    return "votes"
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId","characterId","voteValue"],
      properties : {
        userId: {type:"bigInteger"},
        characterId: {type: "bigInteger"},
        voteValue: {type:"integer"}
      }
    }
  }

  static get relationMappings(){
    const Character = require("./Character.js")
    const User = require("./User.js")

    return{
    characters:{
      relation: Model.HasOneRelation,
      modelClass: Character,
      join: {
        from: "votes.characterId",
        to: "character.id"
      }
    },
    users:{
      relation: Model.HasOneRelation,
      modelClass: User,
      join:{
        from:"votes.userId",
        to:"user.id"
      }
    }
}}
}

module.exports = Vote