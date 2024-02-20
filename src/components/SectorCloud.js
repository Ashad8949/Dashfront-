import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const SectorCloud = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    drawWordCloud();
  }, [data]);

  const drawWordCloud = () => {
    const sectors = data.map((item) => item.sector);
    const wordCounts = {};

    sectors.forEach((sector) => {
      if (!wordCounts[sector]) {
        wordCounts[sector] = 0;
      }
      wordCounts[sector]++;
    });

    const wordEntries = Object.entries(wordCounts);

    const layout = cloud()
      .size([600, 300])
      .words(
        wordEntries.map(([sector, count]) => ({
          text: sector,
          size: count * 10,
        }))
      )
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current);

      svg.selectAll("*").remove();

      svg
        .append("text")
        .attr("x", 300)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "1 em")
        .text("Sectors Word Cloud")
        .style("font-weight", "bold")
        .style("fill", "#ffffff");

      svg
        .append("g")
        .attr("transform", "translate(300,150)")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", "steelblue")
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text);
    }
  };

  return <svg ref={svgRef} width={600} height={300}></svg>;
};

export default SectorCloud;
