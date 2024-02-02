export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table.string("content").notNullable()

    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users")

    table.integer("blogId").notNullable()
    table.foreign("blogId").references("id").inTable("blogs")

    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("comments")
}
