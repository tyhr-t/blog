export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table.string("content").notNullable()
    table.integer("userId").unsigned().references("id").inTable("users").notNullable()
    table.integer("blogId").unsigned().references("id").inTable("blogs").notNullable()
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("comments")
}
