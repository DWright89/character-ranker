/* eslint-disable no-console */
import { connection } from "../boot.js"
import CharacterSeeder from "./seeders/characterSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding characters")
    await CharacterSeeder.seed()
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder