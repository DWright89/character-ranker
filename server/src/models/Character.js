const Model = require("./Model.js")

class Character extends Model{
  static get tableName(){
    return "characters"
  }

  static get jsonSchema(){
    return {
      type:"object",
      required:["name", "gameSeries"],
      properties:{
        name: { type: "string" },
        gameTitle: { type: "string" },
        gameSeries: { type: "string" },
        pictureUrl: { type: "string" },
        description: { type: "string" }
      }
    }
  }
}

module.exports = Character