import React, { useState } from "react";
import { Link } from "react-router-dom";
import TeamItem from "../selectTeamComponent/teamItem/TeamItem";
import TeamModel from "../selectTeamComponent/TeamModel";

function SelectPlayerComponent(props) {
  const [team1Selected, setTeam1Selected] = useState(false);
  const [team2Selected, setTeam2Selected] = useState(false);
  const [team1Image, setTeam1Image] = useState(null);
  const [team1Name, setTeam1Name] = useState(null);
  const [team2Name, setTeam2Name] = useState(null);
  const [homePlayerID, setHomePlayerID] = useState(null);
  const [awayPlayerID, setAwayPlayerID] = useState(null);
  const [team2Image, setTeam2Image] = useState(null);
  const [isClicked, setClicked] = useState(false);
  const [turn, setTurn] = useState(null);

  return (
    <div id={"selectTeamDiv"}>
      <TeamItem
        setSelected={setTeam1Selected}
        setClicked={setClicked}
        isSelected={team1Image ? true : false}
        imageSource={team1Image ? team1Image : {}}
        name={team1Name ? team1Name : {}}
        setTurn={setTurn}
        turn="1"
        isTeam={false}
      />
      <TeamItem
        setSelected={setTeam2Selected}
        setClicked={setClicked}
        isSelected={team2Image ? true : false}
        imageSource={team2Image ? team2Image : {}}
        name={team2Name ? team2Name : {}}
        setTurn={setTurn}
        turn="2"
        isTeam={false}
      />
      <TeamModel
        isOpen={isClicked}
        setImage={turn == "1" ? setTeam1Image : setTeam2Image}
        closeModel={setClicked}
        setName={turn == "1" ? setTeam1Name : setTeam2Name}
        setID={turn == "1" ? setHomePlayerID : setAwayPlayerID}
        title={"Search Player"}
        isTeam={false}
      />
      <Link
        to={{
          pathname: "/comparePlayers",
          search: `?homePlayer=${team1Name}&awayPlayer=${team2Name}`,
          state: {
            homeLogo: team1Image,
            awayLogo: team2Image,
            homePlayerID: homePlayerID,
            awayPlayerID: awayPlayerID,
          },
        }}
      >
        Compare
      </Link>
    </div>
  );
}

export default SelectPlayerComponent;
