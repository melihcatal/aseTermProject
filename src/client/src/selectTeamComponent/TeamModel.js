import React, { useState } from "react";
import Modal from "react-modal";
import SearchBar from "../searchComponent/search/SearchBar";
import axios from "axios";
import SelectResults from "../selectResultsComponent/SelectResults";
import "./ModalStyle.css";

Modal.setAppElement(document.getElementById("anan"));

function TeamModel(props) {
  async function getData(searchText) {
    const endPoint = props.isTeam ? "searchTeam" : "searchPlayer";
    const url = `http://localhost:3001/${endPoint}/${searchText}`;
    //const url = `/${endPoint}/${searchText}`;

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

  function itemSelected(id, image, name) {
    props.setImage(image);
    props.setName(name);
    props.setID(id);

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
      <h2>{props.title}</h2>
      <SearchBar
        getData={getData}
        placeholder={props.isTeam ? "Search Teeam" : "Search Player"}
      />
      {results != null && (
        <SelectResults
          results={results}
          itemSelected={itemSelected}
          isTeam={props.isTeam}
        />
      )}
    </Modal>
  );
}

export default TeamModel;
