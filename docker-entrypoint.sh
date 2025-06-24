#!/bin/sh

# Aguardar o banco de dados estar pronto
echo "Aguardando banco de dados..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "Banco de dados pronto!"

# Executar migrations se necessário
echo "Executando migrations..."
npm run migrate

# Executar seeds se necessário
echo "Executando seeds..."
npm run seed

# Iniciar a aplicação
echo "Iniciando aplicação..."
exec npm start 