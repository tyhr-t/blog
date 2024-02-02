export const up = async (db) => {
  await db.schema.alterTable("blogs", (table) => {
    table.integer("visits").defaultTo(0)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("blogs", (table) => {
    table.dropColumn("visits")
  })
}
