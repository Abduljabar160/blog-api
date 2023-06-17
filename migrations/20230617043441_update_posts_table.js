exports.up = function (knex) {
  return knex.schema.alterTable('posts', (table) => {
    table.text('bloodtype').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('posts', (table) => {
    table.dropColumn('bloodtype');
  });
};
