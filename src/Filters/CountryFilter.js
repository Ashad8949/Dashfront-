import React, { useState, useEffect } from "react";

const CountryFilter = ({ data, onChange }) => {
  const [countrys, setCountrys] = useState([]);

  useEffect(() => {
    const fetchCountrys = () => {
      const distinctCountrys = [...new Set(data.map((item) => item.country))];
      const filteredCountrys = distinctCountrys.filter(
        (country) => country !== null
      );
      const sortedCountrys = filteredCountrys.sort((a, b) =>
        a.localeCompare(b)
      );
      setCountrys(sortedCountrys);
    };
    fetchCountrys();
  }, [data]);

  const handleCountryChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <label>Country:</label>
      <select onChange={handleCountryChange}>
        <option value="">All</option>
        {countrys.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryFilter;
