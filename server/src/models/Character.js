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
    const Review = require("./Review")

    return {
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "characters.id",
          to: "votes.characterId"
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "characters.id",
          to: "reviews.characterId"
        }
      },
      userVotes: {
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
      },
      userReviews: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        from: "characters.id",
        through: {
          from: "reviews.characterId",
          to: "reviews.userId"
        },
        to: "users.id"
      }
    }
  }
}




module.exports = Character