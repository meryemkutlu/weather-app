import { useState } from "react";
import { Link } from "react-router-dom";

import "./Search.css";

function Search() {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      document.getElementById("link").click();
    }
  };

  return (
    <div className="container-search">
      <input
        type="text"
        placeholder="Search location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />

      <Link id="link" to={`/weather/${city}`}>
        Get Weather
      </Link>
    </div>
  );
}

export default Search;
