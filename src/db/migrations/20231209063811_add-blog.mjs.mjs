export const up = async (db) => {
  await db.schema.createTable("blogs", (table) => {
    table.increments("id").primary()
    table.string("title").notNullable()
    table.string("content").notNullable()
    table.timestamp("createdAt").defaultTo(db.fn.now())
    table.timestamp("updatedAt").defaultTo(db.fn.now())
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("blogs")
}
