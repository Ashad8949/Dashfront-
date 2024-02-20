import React, { useState, useEffect } from "react";
import CountryFilter from "./Filters/CountryFilter";
import EndYearFilter from "./Filters/EndYearFilter";
import TopicsFilter from "./Filters/TopicsFilter";
import SectorFilter from "./Filters/SectorFilter";
import RegionFilter from "./Filters/RegionFilter";
import LikeVsIntensity from "./components/LikeVsIntensity";
import RelevanceVsIntensity from "./components/RelevanceVsIntensity";
import TopicCloud from "./components/TopicCloud";
import SectorCloud from "./components/SectorCloud";
import ChoroplethMap from "./components/ChoroptethMap";
import ChoroplethMapRegion from "./components/ChoroptethMapRegion";

const DashFilter = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/insights/");
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEndYearChange = (value) => {
    // Filter data based on end year
    const filtered = data.filter((item) => !value || item.end_year === value);
    setFilteredData(filtered);
  };

  const handleTopicChange = (value) => {
    // Filter data based on topic
    const filtered = data.filter((item) => !value || item.topic === value);
    setFilteredData(filtered);
  };

  const handleSectorChange = (value) => {
    // Filter data based on sector
    const filtered = data.filter((item) => !value || item.sector === value);
    setFilteredData(filtered);
  };

  const handleRegionChange = (value) => {
    // Filter data based on region
    const filtered = data.filter((item) => !value || item.region === value);
    setFilteredData(filtered);
  };

  const handleCountryChange = (value) => {
    // Filter data based on country
    const filtered = data.filter((item) => !value || item.country === value);
    setFilteredData(filtered);
  };
  console.log(filteredData);
  return (
    <div className="filter-graph">
      <div className="filters">
        <EndYearFilter data={data} onChange={handleEndYearChange} />
        <TopicsFilter data={data} onChange={handleTopicChange} />
        <SectorFilter data={data} onChange={handleSectorChange} />
        <RegionFilter data={data} onChange={handleRegionChange} />
        <CountryFilter data={data} onChange={handleCountryChange} />
      </div>
      <div className="visualizations">
        <ChoroplethMap data={filteredData} />
        <ChoroplethMapRegion data={filteredData} />
        <LikeVsIntensity data={filteredData} />
        <RelevanceVsIntensity data={filteredData} />
        <TopicCloud data={filteredData} />
        <SectorCloud data={filteredData} />
      </div>
    </div>
  );
};

export default DashFilter;
