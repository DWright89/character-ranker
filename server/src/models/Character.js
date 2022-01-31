const Model = require("./Model.js")

class Character extends Model{
    static get tableName(){
        return "characters"
    }

    static get jsonSchema(){
        return {
            type:"object",
            required:["name", "gameTitle"],
            properties:{
                name: { type: "string" },
                gameTitle: { type: "string"}
            }
        }
    }
}

module.exports = Character