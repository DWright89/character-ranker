/* eslint-disable no-console */
import { connection } from "../boot.js"
import CharacterSeeder from "./migrations/seeders/characterSeeder.js"
class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding characters")
    await CharacterSeeder.seed()
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder