import React, { useState } from "react";
import Modal from "react-modal";
import SearchBar from "../searchComponent/search/SearchBar";
import axios from "axios";
import SelectResults from "../selectResultsComponent/SelectResults";
import "./ModalStyle.css";

Modal.setAppElement(document.getElementById("anan"));

function TeamModel(props) {
  async function getTeamData(searchText) {
    const url = `http://localhost:3001/searchTeam/${searchText}`;
    try {
      if (searchText != "") {
        const result = await axios.get(url);
        setResults(result.data);
      } else {
        setResults(null);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode == 404) {
        setResults([]);
      } else {
        setResults(null);
        alert("Server Error");
      }
    }
  }

  function itemSelected(id, clubLogo, clubName) {
    props.setLogo(clubLogo);
    props.setName(clubName);
    props.closeModel(false);
  }

  const [results, setResults] = useState(null);
  return (
    <Modal isOpen={props.isOpen} className="Modal">
      <button
        onClick={() => {
          props.closeModel(false);
        }}
        id="closeButton"
      >
        X
      </button>
      <h2>Search Team</h2>
      <SearchBar getData={getTeamData} placeholder="Search Team" />
      {results != null && (
        <SelectResults results={results} itemSelected={itemSelected} />
      )}
    </Modal>
  );
}

export default TeamModel;
