export const up = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.integer("visits").defaultTo(0)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.dropColumn("visits")
  })
}
