import React, { useEffect } from 'react'
import * as d3 from "d3";


export const Perceptron = () => {

    var drag = function () {

        function dragstarted(d) {
            d3.select(this).raise().attr("stroke", "black");
        }

        function dragged(d) {
            d3.select(this).attr("transform", `translate(${d3.event.x} ${d3.event.y})`);
        }

        function dragended(d) {
            d3.select(this).attr("stroke", null);
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    useEffect(() => {
        // create a new node
        d3.select('#app')
            .append('svg')
            .attr("id", "perceptron_plot")
            .style("width", "1400px")
            .style("height", "400px")
            .style("border", "solid 3px black")

        // select the svg
        const svg = d3.select("svg#perceptron_plot");

        const group = svg.append("g")
        group.append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple")
        group.append("path").attr("d", d3.line()([[25, 25], [100, 25]]))
            .attr('stroke', 'black')
        group.call(drag())

    }, [])


    return (
        <div>
            <h1>Perceptron</h1>
        </div>
    )
}
