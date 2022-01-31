import { Character } from "../../../models/index.js"

class CharacterSeeder {
    static async seed() {
        const characterData = [
            {
            name: "Master Chief",
            gameTitle: "Halo 3",
            gameSeries: "Halo",
            description: "doomguy"  
            },
            {
            name: "Mario",
            gameTitle: "Super Mario Odyssey",
            gameSeries: "Super Mario Bros",
            description: "Luigi's Brother"
            },
            {
            name: "Link",
            gameTitle: "The Legend of Zelda: Ocarina of Time",
            gameSeries: "Legend of Zelda",
            description: "Courageous"
            },
            {
            name: "Zelda",
            gameTitle: "Ocarina of Time",
            gameSeries: "Legend of Zelda",
            description: "Wise"
            },
            {
            name: "Cloud Strife",
            gameTitle: "Final Fantasy VII",
            gameSeries: "Final Fantasy",
            description: "Hair care afficionado"
            }
        ]
        for (const singleCharacterData of characterData) {
            const currentCharacter = await Character.query().findOne(singleCharacterData)
            if(!currentCharacter) {
                await Character.query().insert(singleCharacterData)
            }
        }
    }
}

export default CharacterSeeder