# eskimi
After download project.

Commands for up project:

1) Up docker containers: docker-compose up -d
2) Exec php container: docker-compose exec php bash

Run next commands in php container

3) composer install
4) cp .env.testing .env
5) php artisan key:generate
6) php artisan storage:link
7) php artisan migrate --seed
8) npm install
9) npm run dev
