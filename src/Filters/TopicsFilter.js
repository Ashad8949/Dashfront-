import React, { useState, useEffect } from "react";

const TopicsFilter = ({ data, onChange }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = () => {
      const distinctTopics = [...new Set(data.map((item) => item.topic))];
      const sortedTopics = distinctTopics
        .filter((topic) => topic !== null) // Filter out null topics
        .sort((a, b) => a.localeCompare(b));
      setTopics(sortedTopics);
    };

    fetchTopics();
  }, [data]);

  const handleTopicChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <label>Topics:</label>
      <select onChange={handleTopicChange}>
        <option value="">All</option>
        {topics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TopicsFilter;
