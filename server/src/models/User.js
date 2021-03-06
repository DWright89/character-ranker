/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", format: "email" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Vote = require("./Vote.js")
    const Character = require("./Character.js")
    const Review = require("./Review.js")

    return {
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "users.id",
          to: "votes.userId"
        }
      },
      characterVotes: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "users.id",
          through: {
            from: "votes.userId",
            to: "votes.characterId"
          },
          to: "characters.id"
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "users.id",
          to: "reviews.userId"
        }
      },
      characterReviews: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: "users.id",
          through: {
            from: "reviews.userId",
            to: "reviews.characterId"
          },
          to: "characters.id"
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }
    return serializedJson;
  }
}

module.exports = User;