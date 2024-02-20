import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import world from "./custom.geo.json";

const ChoroplethMapRegion = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    drawMap();
  }, [data]);

  const drawMap = () => {
    if (!data || data.length === 0) {
      console.error("Data is empty or undefined.");
      return;
    }

    const regions = new Map();

    // Count the frequency of each region
    data.forEach((item) => {
      const region = item.region;
      regions.set(region, (regions.get(region) || 0) + 1);
    });

    if (regions.size === 0) {
      console.error("No regions found in the data.");
      return;
    }

    // Define color scale based on frequency
    const colorScale = d3
      .scaleSequential(d3.interpolateOranges) // Use orange color palette
      .domain([0, d3.max([...regions.values()])]); // Domain based on frequency range

    const projection = d3.geoMercator().fitSize([800, 400], world);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    // Draw regions
    svg
      .selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const region = d.properties.name;
        return colorScale(regions.get(region) || 0);
      })
      .attr("stroke", "white")
      .attr("stroke-width", 0.5);

    // Add title
    svg
      .append("text")
      .attr("x", 20)
      .attr("y", 40)
      .text("Region")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .style("fill", "#ffffff");
  };

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default ChoroplethMapRegion;
