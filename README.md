## Environment Variables

```
mkdir .env
```

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=sample_blog
DB_CLIENT=mysql
PORT=9090

JWT_SECRET=super-secret

DEBUG=knex:*
```

## Database migration

### Migrate to latest DB
```
npm run migrate:db:latest
``