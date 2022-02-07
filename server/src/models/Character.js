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
    const User = require("./User")
    const Review = require("./Review")
    
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "characters.id",
          to: "reviews.characterId"
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "characters.id",
          through: {
            from:"reviews.characterId",
            to:"reviews.userId"
          },
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Character