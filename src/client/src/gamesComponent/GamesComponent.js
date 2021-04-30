import React, { useEffect, useState } from "react";
import LeagueComponent from "./leagueComponent/LeagueComponent";
function GamesComponent(props) {
  const warningMessage = <h3 className="warning">Error</h3>;
  const [isWarning, setWarning] = useState(false);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    try {
      if (props.leagues.length > 0) {
        let tempArray = [];

        props.leagues.map((currentLeague) => {
          const leagueComponent = (
            <LeagueComponent leagueInfo={currentLeague} />
          );
          tempArray.push(leagueComponent);
        });
        setLeagues(tempArray);
      } else {
        throw "Error";
      }
    } catch (e) {
      setWarning(true);
    }
  }, []);
  return <div>{isWarning ? warningMessage : leagues}</div>;
}

export default GamesComponent;
