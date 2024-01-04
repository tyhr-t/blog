export const up = async (db) => {
  await db.schema.createTable("blogCategories", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })
  await db.schema.alterTable("blogs", (table) => {
    table.text("isPublic").notNullable().defaultTo(false)
    table.integer("categoryId").notNullable()
    table.foreign("categoryId").references("id").inTable("blogCategories")
  })
}

export const down = async (db) => {
  await db.schema.alterTable("blogs", (table) => {
    table.dropColumn("isPublic")
    table.dropColumn("categoryId")
  })
  await db.schema.dropTable("blogCategories")
}
