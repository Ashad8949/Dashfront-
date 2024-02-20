import React, { useState, useEffect } from "react";

const RegionFilter = ({ data, onChange }) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = () => {
      const distinctRegions = [...new Set(data.map((item) => item.region))];
      const filteredRegions = distinctRegions.filter(
        (region) => region !== null
      );
      const sortedRegions = filteredRegions.sort((a, b) => a.localeCompare(b));
      setRegions(sortedRegions);
    };
    fetchRegions();
  }, [data]);

  const handleRegionChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <label>Region:</label>
      <select onChange={handleRegionChange}>
        <option value="">All</option>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter;
