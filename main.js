var visitsData = [
    { date: "2022-01", visits: Math.floor(Math.random() * 100) },
    { date: "2022-02", visits: Math.floor(Math.random() * 100) },
    { date: "2022-03", visits: Math.floor(Math.random() * 100) },
    { date: "2022-04", visits: Math.floor(Math.random() * 100) },
    { date: "2022-05", visits: Math.floor(Math.random() * 100) },
    { date: "2022-06", visits: Math.floor(Math.random() * 100) },
    { date: "2022-07", visits: Math.floor(Math.random() * 100) },
    { date: "2022-08", visits: Math.floor(Math.random() * 100) },
    { date: "2022-09", visits: Math.floor(Math.random() * 100) },
    { date: "2022-10", visits: Math.floor(Math.random() * 100) },
    { date: "2022-11", visits: Math.floor(Math.random() * 100) },
    { date: "2022-12", visits: Math.floor(Math.random() * 100) }
];

// Set up the chart dimensions and margins
const margin = { top: 20, right: 70, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create the SVG element and set its dimensions
const svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Define the x and y scales and axes
const xScale = d3.scaleTime()
    .domain(d3.extent(visitsData, d => new Date(d.date)))
    .range([0, width]);
const yScale = d3.scaleLinear()
    .domain([0, d3.max(visitsData, d => d.visits)])
    .range([height, 0]);
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Draw the x and y axes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

// Draw the line chart
const line = d3.line()
    .x(d => xScale(new Date(d.date)))
    .y(d => yScale(d.visits));
svg.append("path")
    .datum(visitsData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

// Add axis labels
svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
    .style("text-anchor", "middle")
    .text("Month");
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Visits");