const Model = require("./Model.js")

class Character extends Model {
  static get tableName() {
    return "characters"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "gameSeries"],
      properties: {
        name: { type: "string" },
        gameTitle: { type: "string" },
        gameSeries: { type: "string" },
        pictureUrl: { type: "string" },
        description: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const User = require("./User.js")
    const Vote = require("./Vote.js")

    return {
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "characters.id",
          to: "votes.characterId"
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "characters.id",
          through: {
            from: "votes.characterId",
            to: "votes.userId"
          },
          to: "users.id"
        }
      }
    }
  }
}


module.exports = Character