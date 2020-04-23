// const data = [

//     {
//         "Jaar": "2015",
//         "Waterkracht": 99,
//         "Biomassa": 5028,
//         "Windenergie": 6917,
//         "Zonnestroom": 1109
//     },
//     {
//         "Jaar": "2016",
//         "Waterkracht": 98,
//         "Biomassa": 5010,
//         "Windenergie": 8364,
//         "Zonnestroom": 1602
//     },
//     {
//         "Jaar": "2017",
//         "Waterkracht": 94,
//         "Biomassa": 4729,
//         "Windenergie": 9642,
//         "Zonnestroom": 2208
//     },
//     {
//         "Jaar": "2018",
//         "Waterkracht": 94,
//         "Biomassa": 4694,
//         "Windenergie": 10030,
//         "Zonnestroom": 3693
//     },
//     {
//         "Jaar": "2019",
//         "Waterkracht": 93,
//         "Biomassa": 5772,
//         "Windenergie": 10743,
//         "Zonnestroom": 5189
//     }

// ]

const color = d3.scaleOrdinal()
//.domain(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen" ])
.range([ '#FF0047', '#FF8600', '#6663D5', '#FFF800', '#29FF3E' ]);


const data2 = {
    dates: [2015, 2016, 2017, 2018, 2019],
    series: [
                {
                    name: "Zonnestroom",
                    values: [1109, 1602, 2208, 3693, 5189]
                },
                {
                    name: "Waterkracht",
                    values: [99, 98, 94, 94, 93]
                },
                {
                    name: "Biomassa",
                    values: [5028, 5010, 4729, 4694, 5772]
                },
                {
                    name: "Windenergie",
                    values: [6917, 8364, 9642, 10030, 10743]
                },
                
            ]
}



let parseDate = d3.timeParse("%Y")

const transformedToDates = data2.dates.map(d =>  {
       

    const date = parseDate(d);
    return date
  });


  data2.dates = transformedToDates

//   console.log(data2)


// data.map(d => console.log(d.Jaar))

const margin = { top: 20, right: 20, bottom: 10, left: 90 }
const innerWidth = 600 - margin.left - margin.right
const innerHeight = 300 - margin.top - margin.bottom
const legendWidth = 300

//responsive: https://stackoverflow.com/questions/44833788/making-svg-container-100-width-and-height-of-parent-container-in-d3-v4-instead
const svg = d3
  .select("#chart")
  // .attr("width", width + margin.left + margin.right + legendWidth)
  // .attr("height", height + margin.top + margin.bottom)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 800 500")
  .attr("aria-labelledby", "bar-chart-title")

const xValue = d => d.Jaar
const yValue = d => d.Zonnestroom

const xScale = d3.scaleTime()
    .domain(d3.extent(data2.dates, d => d))
    // .domain(data.map(d => d.Jaar))
    .range([0, innerWidth]);
    

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data2.series, d => d3.max(d.values))])
    .range([innerHeight, 0])
    .nice();

    // console.log(yScale.domain())

const line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => xScale(data2.dates[i])) // set the x values for the line generator
    .y((d) => yScale(d)) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%Y"))); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft    

// 9. Append the path, bind the data, and call the line generator 
// svg.append("path")
//     .datum(data) // 10. Binds data to the line 
//     .attr("fill", "none")
//     .attr("stroke", "#ffab00")
//     .attr("stroke-width", 1.5)
//     // .attr("stroke-linejoin", "round")
//     // .attr("stroke-linecap", "round")
//     .attr("class", "line") // Assign a class for styling 
//     .attr("d", line); // 11. Calls the line generator 

const path = svg.append("g")
.attr("fill", "none")
// .attr("stroke", "steelblue")
// .attr("stroke", "steelblue")
.attr("stroke-width", 3)
.attr("stroke-linejoin", "round")
.attr("stroke-linecap", "round")
.selectAll("path")
.data(data2.series)
.join("path")
.style("mix-blend-mode", "multiply")
.attr("d", d => line(d.values))
.attr("class", d => d.name)
.attr("stroke", d => color(d.name));

svg.selectAll(".dot")
  .data((data2.series))
//   .enter()
  .join("circle")
//   .join("circle")
  .attr("class", "dot")
//   .attr("cx", d => xScale(d.Jaar))
//   .attr("cy", d => xScale(d.Zonnestroom))
// .attr("cx", function(d, i) { return xScale(d.Jaar) })
.attr("cx", (d, i) => xScale(data2.dates[i]))
.attr("cy", d => yScale(d.values))
// .attr("cx", function(d, i) { return xScale(d.Jaar) })
// .attr("cy", function(d) { return yScale(d.Zonnestroom) })
.attr("r", 5)
        