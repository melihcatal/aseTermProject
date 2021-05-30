This project was carried out as University of Zürich Advanced Software Engineering Spring 21 Term Project.

# Getting Started

## Team Members

Melih Catal <melih.catal@uzh.ch>

## Project Description

|                            |                                                                |
| -------------------------- | -------------------------------------------------------------- |
| **Project Title :**        | Fifa Player Dataset Based Football Comparision Web Application |
| **Dataset :**              | Fifa Player Dataset                                            |
| **Target Platform :**      | Web                                                            |
| **Programming Language :** | JavaScript                                                     |

The application aims to let user to gain more detail information about players and teams. With the help of external Footbal-API user is able to get past or future football games from 25 different leagues .
So user can have more information about upcoming games , the strengths and weaknesses of the teams against each other. 

As a user you have various options in the app.
- You can search the player that you want to know in more depth 👀
- You can compare two players to know about their developments by years or to find the answer which one is best ? 😎
- You can compare teams to find their strengths and weaknesses against each other . 💪
- You can get information about real football matches that has been played or will be played ! You choose the date we show the games ⚽️


## 💨 How To Run 

The app is composed of different microservices. Each microservice is independent from each other and run by itself. 
In order to run the app as a whole **docker compose** is used. 

So first you have to pull the code from github if you don't have it already

```sh
git pull "https://github.com/melihcatal/aseTermProject.git"
```

Then go to folder with docker-compose.yml file. 

```sh
cd aseTermProject
```

Finally run docker compose command in order to wake the applicaton. Don't forget to run Docker beforehand
```sh
docker-compose up -d
```

You can check if all the services up and running
```sh
docker ps
```
🥂 Congrats ! Now you are good to explore more about the application !
 
 
 # Complete Documentation 
 
 > For Detail Documentation please refer [here](https://nifty-pike-f9dd5b.netlify.app)


