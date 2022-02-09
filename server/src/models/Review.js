const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "characterId", "userId"],
      properties: {
        content: { type: "string", minLength: 1, maxLength: 500 },
        characterId: { type: ["integer", "string"] },
        userId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const Character = require("./Character.js")
    const User = require("./User.js")

    return {
      character: {
        relation: Model.BelongsToOneRelation,
        modelClass: Character,
        join: {
          from: "reviews.characterId",
          to: "characters.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Review