FROM mongo:latest
COPY ./teams.csv ./datasets/teams.csv
COPY ./cleanFifaData.csv ./datasets/players.csv

COPY database.sh /docker-entrypoint-initdb.d/
