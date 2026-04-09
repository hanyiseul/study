mariadb-server
--------------

apt update -y

sudo apt install -y mariadb-server

sudo service mariadb start

sudo mysql -u root -p

CREATE DATABASE testdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE testdb;

CREATE USER 'testuser'@'localhost' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON testdb.* TO 'testuser'@'localhost';

FLUSH PRIVILEGES;



react-server
------------

npx create-vite@latest bootcamp --template react

cd bootcamp

npm install
npm install react-router-dom
 
cat << 'EOF' > vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '.trycloudflare.com'
    ]
  }
})
EOF


npm install express && npm install -g cloudflared

nohup npm run dev -- --host 0.0.0.0 > vite.log 2>&1 &

nohup cloudflared tunnel --url http://localhost:5173/ > tunnel.log 2>&1 &

tail -n 20 tunnel.log

mkdir layout, mkdir pages, mkdir components

npm run build

cp -r dist/* ../node-server/static/

node-server
-----------

npm install express mysql2 cors

nohup node server/server.cjs > server.log 2>&1 &

tail -n 20 server.log

npm install -g cloudflared

nohup cloudflared tunnel --url http://localhost:3000/ > tunnel.log 2>&1 &

tail -n 20 tunnel.log