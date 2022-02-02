/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("characters", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("gameTitle").notNullable()
    table.string("gameSeries")
    table.string("pictureUrl")
    table.string("description")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => { 
  return knex.schema.dropTableIfExists("characters")
}