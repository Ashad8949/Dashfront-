import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const RelevanceVsIntensity = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const margin = { top: 40, right: 30, bottom: 70, left: 70 }; // Adjusted margin to accommodate labels
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, 110]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);

    svg.selectAll("*").remove();

    if (data.length === 0) return;

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.intensity))
      .attr("cy", (d) => yScale(d.relevance))
      .attr("r", 5)
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5));

    svg.append("g").call(d3.axisLeft(yScale).ticks(5));

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Relevance vs Intensity")
      .style("font-weight", "bold")
      .style("fill", "#ffffff");

    // X-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Intensity");

    // Y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left / 1.5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Relevence");
  };

  return <svg ref={svgRef}></svg>;
};

export default RelevanceVsIntensity;
