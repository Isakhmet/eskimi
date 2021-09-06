# eskimi
Before you start up an application you need to install docker-compose. Link https://docs.docker.com/compose/install/

Instruction for Ubuntu OS:

1. Open terminal(Ctrl + Alt + T)
2. Enter in the command-line: git clone git@github.com:Isakhmet/eskimi.git
3. Go to the current directory with the command: cd eskimi/

Commands for up project:

1) Start docker containers with following command: docker-compose up -d
2) Check that containers up: docker-compose ps. 
3) After command, you must see statuses of containers. 
Something like this: 
eskimi_mysql_1   docker-entrypoint.sh mysqld      Up       0.0.0.0:33036->3306/tcp,:::33036->3306/tcp, 33060/tcp
eskimi_nginx_1   nginx -g daemon off;             Exit 0                                                        
eskimi_php_1     /docker-entrypoint.sh /usr ...   Up       0.0.0.0:49155->9000/tcp,:::49155->9000/tcp    
3) If everything is fine you need to enter inside container: docker-compose exec php bash
4) You must see in the command-line: root@php-8.0.0 in /application $ . That means you are in the container


The following commands must be entered into the container in order

1) Run composer for install all libraries: composer install
2) Copy file content to the current environment: cp .env.testing .env
5) php artisan key:generate
6) php artisan storage:link
7) php artisan migrate --seed
8) npm install
9) npm run dev
