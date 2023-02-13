import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import classes from './Graph.module.scss'

const drawChart = (svgRef, seaLevels) => {
  const data = seaLevels;
  const h = 300;
  const w = 700;
  const svg = d3.select(svgRef.current);

  svg
    .attr("width", w)
    .attr("height", h)

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", (d, i) => h - 10 * d)
    .attr("width", 20)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "steelblue");
}

export const Graph = ({ seaLevels }) => {
  const svg = useRef(null);

  useEffect(() => {
    drawChart(svg, seaLevels);
  }, [seaLevels]);

  return (
    <div className={classes['graph']}>
      <svg ref={svg} />
    </div>
  );
};