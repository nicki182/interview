import { useRef, useEffect } from "react";
import * as d3 from "d3";
const useCreateHistogram = (dimensions, data) => {
  const refHisto = useRef(null);
  useEffect(() => {
    // set the dimensions and margins of the graph
    const { width, height, margin = {} } = dimensions;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    // append the svg object to the body of the page
    d3.select(refHisto.current).selectAll("*").remove();
    const svg = d3
      .select(refHisto.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis: scale and draw:
    const x = d3
      .scaleLinear()
      .domain([0, 10]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // set the parameters for the histogram
    const histogram = d3
      .bin()
      .value(function (d) {
        return d;
      }) // I need to give the vector of value
      .domain(x.domain()) // then the domain of the graphic
      .thresholds(x.ticks(30)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(data);

    // Y axis: scale and draw:
    const y = d3.scaleLinear().range([height, 0]);
    y.domain([
      0,
      d3.max(bins, function (d) {
        return d.length;
      }),
    ]); // d3.hist has to be called before the Y axis obviously
    svg.append("g").call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function (d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .style("fill", "#69b3a2");
  }, [dimensions, data]);
  return refHisto;
};
export default useCreateHistogram;
