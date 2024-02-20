import React, { useState, useEffect } from "react";

const EndYearFilter = ({ data, onChange }) => {
  const [endYears, setEndYears] = useState([]);

  useEffect(() => {
    const fetchEndYears = () => {
      const distinctYears = [...new Set(data.map((item) => item.end_year))];
      const sortedYear = distinctYears.sort((a, b) => b - a);
      setEndYears(sortedYear);
    };

    fetchEndYears();
  }, [data]);

  const handleYearChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <label>End Year:</label>
      <select onChange={handleYearChange}>
        <option value="">All</option>
        {endYears.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EndYearFilter;
