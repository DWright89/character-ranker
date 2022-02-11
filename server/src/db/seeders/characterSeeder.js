import { Character } from "../../models/index.js"

class CharacterSeeder {

  static async seed() {
    const characterData = [
      {
        name: "Master Chief",
        gameTitle: "Halo 3",
        gameSeries: "Halo",
        description: "doomguy",
        pictureUrl: "https://www.pcgamesn.com/wp-content/uploads/2018/12/halo-3.jpg"
      },
      {
        name: "Mario",
        gameTitle: "Super Mario Odyssey",
        gameSeries: "Super Mario Bros",
        description: "Luigi's Brother",
        pictureUrl: "https://i.imgur.com/1fXq1jU.png"
      },
      {
        name: "Link",
        gameTitle: "The Legend of Zelda: Ocarina of Time",
        gameSeries: "Legend of Zelda",
        description: "Courageous",
        pictureUrl: "https://www.smashbros.com/wiiu-3ds/sp/images/character/link/main.png"
      },
      {
        name: "Zelda",
        gameTitle: "Ocarina of Time",
        gameSeries: "Legend of Zelda",
        description: "Wise",
        pictureUrl: "https://www.zelda.com/assets/img/about/zelda_play.png"
      },
      {
        name: "Cloud Strife",
        gameTitle: "Final Fantasy VII",
        gameSeries: "Final Fantasy",
        description: "Hair care afficionado",
        pictureUrl: "https://cdn.vox-cdn.com/thumbor/SZwKRTpONbDDFLCHvBleq8OspmY=/0x0:1920x1080/1200x800/filters:focal(760x348:1066x654)/cdn.vox-cdn.com/uploads/chorus_image/image/65224808/chrome_2019_09_11_12_39_56.0.jpg"
      }
    ]

    for (const singleCharacterData of characterData) {
      const currentCharacter = await Character.query().findOne(singleCharacterData)
      if (!currentCharacter) {
        await Character.query().insert(singleCharacterData)
      }
    }
  }
}

export default CharacterSeeder