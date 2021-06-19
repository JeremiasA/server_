# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

# USAGE
## Example Users 
You can login with this example credentials to test the site
### admin users:

{ email: `desiree@test.com`, password: "123456" }

{ email: `adam@test.com`, password: "5678" }

{ email: `ivet@test.com`, password: "as4567" }

{ email: `antonio@test.com`, password: "wer564" }

{ email: `remedios@test.com`, password: "97534" }

{ email: `vilalucas@test.com`, password: "w4d5f4" }

{ email: `braulio@test.com`, password: "68866as" }

{ email: `ericcantona@test.com`, password: "rtytry7897" }

{ email: `juliana@test.com`, password: "234fsdf" }

{ email: `ramona@test.com`, password: "234fd" }

### standard users:

{ email: `mariag@test.com`, password: "5fdf8" }

{ email: `olga@test.com`, password: "567wfsd8" }

{ email: `isidro@test.com`, password: "fds56f45sd4f" }

{ email: `victornaranjo@test.com`, password: "567123548" }

{ email: `claudiamorgan@test.com`, password: "utiy475" }

{ email: `marcosruiz@test.com`, password: "pj9324m0m" }

{ email: `adelaquesada@test.com`, password: "lh234oin" }

{ email: `freebus@test.com`, password: "3n48345v" }

{ email: `davidmonge@test.com`, password: "5678" }

{ email: `fernanda@test.com`, password: "er43e3" }
