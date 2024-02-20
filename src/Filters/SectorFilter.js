import { sort } from "d3";
import React, { useState, useEffect } from "react";

const SectorFilter = ({ data, onChange }) => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const fetchSectors = () => {
      const distinctSectors = [...new Set(data.map((item) => item.sector))];
      const sortedSectors = distinctSectors
        .filter((sector) => sector !== null) // Filter out null sectors
        .sort((a, b) => a.localeCompare(b));
      setSectors(sortedSectors);
    };

    fetchSectors();
  }, [data]);

  const handleSectorChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <label>Sector:</label>
      <select onChange={handleSectorChange}>
        <option value="">All</option>
        {sectors.map((sector, index) => (
          <option key={index} value={sector}>
            {sector}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SectorFilter;
