import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import world from "./custom.geo.json";

const ChoroplethMap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    drawMap();
  }, [data]);

  const drawMap = () => {
    if (!data || data.length === 0) {
      console.error("Data is empty or undefined.");
      return;
    }

    const countries = new Map();

    // Count the frequency of each country
    data.forEach((item) => {
      const country = item.country;
      countries.set(country, (countries.get(country) || 0) + 1);
    });

    if (countries.size === 0) {
      console.error("No countries found in the data.");
      return;
    }

    // Preprocess world map data to mark countries that did not appear in the data as white
    const processedWorld = JSON.parse(JSON.stringify(world)); // Deep copy of world map data
    processedWorld.features.forEach((feature) => {
      const countryName = feature.properties.name;
      if (!countries.has(countryName)) {
        feature.properties.empty = true; // Mark country as empty
      }
    });

    // Define color scale based on frequency
    const maxFrequency = d3.max([...countries.values()]);
    const colorScale = d3
      .scaleSequential(d3.interpolateYlGn) // Use yellow to green color palette
      .domain([0, maxFrequency]) // Domain based on maximum frequency
      .interpolator((t) => d3.interpolateRgb("#ffea00", "#006400")(t)); // Yellow to green colors

    const projection = d3.geoMercator().fitSize([800, 400], world);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    // Draw countries
    svg
      .selectAll("path")
      .data(processedWorld.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        if (d.properties.empty) {
          return "white"; // Color countries that did not appear in data as white
        } else {
          const country = d.properties.name;
          return colorScale(countries.get(country) || 0);
        }
      })
      .attr("stroke", "white")
      .attr("stroke-width", 0.5);

    // Add title
    svg
      .append("text")
      .attr("x", 20)
      .attr("y", 40)
      .text("Country")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .style("fill", "#ffffff");
  };

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default ChoroplethMap;
