export const up = async (db) => {
  await db.schema.alterTable("comments", (table) => {
    table.integer("CounterComment").defaultTo(0)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("comments", (table) => {
    table.dropColumn("CounterComment")
  })
}
