export const up = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table
      .integer("ownerId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.dropForeign("ownerId")
  })
}
