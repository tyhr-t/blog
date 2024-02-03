export const up = async (db) => {
  await db.schema.createTable("postCategories", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })
  await db.schema.alterTable("posts", (table) => {
    table.text("isPublic").notNullable().defaultTo(false)
    table.integer("categoryId").notNullable()
    table.foreign("categoryId").references("id").inTable("postCategories")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("posts", (table) => {
    table.dropColumn("isPublic")
    table.dropColumn("categoryId")
  })
  await db.schema.dropTable("postCategories")
}
