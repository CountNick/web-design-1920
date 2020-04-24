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
let context;
const color = d3
  .scaleOrdinal()
  //.domain(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen" ])
  .range(["#FF0047", "#FF8600", "#6663D5", "#FFF800", "#29FF3E"]);

const data2 = {
  dates: [2015, 2016, 2017, 2018, 2019],
  series: [
    {
      name: "Zonnestroom",
      values: [1109, 1602, 2208, 3693, 5189],
    },
    {
      name: "Waterkracht",
      values: [99, 98, 94, 94, 93],
    },
    {
      name: "Biomassa",
      values: [5028, 5010, 4729, 4694, 5772],
    },
    {
      name: "Windenergie",
      values: [6917, 8364, 9642, 10030, 10743],
    },
  ],
};

let parseDate = d3.timeParse("%Y");

const transformedToDates = data2.dates.map((d) => {
  const date = parseDate(d);
  return date;
});

data2.dates = transformedToDates;

//   console.log(data2)

// data.map(d => console.log(d.Jaar))

const margin = { top: 20, right: 20, bottom: 10, left: 90 };
const innerWidth = 600 - margin.left - margin.right;
const innerHeight = 300 - margin.top - margin.bottom;
const legendWidth = 300;


//responsive: https://stackoverflow.com/questions/44833788/making-svg-container-100-width-and-height-of-parent-container-in-d3-v4-instead
const svg = d3
  .select("#chart")
//   .attr("width", width + margin.left + margin.right + legendWidth)
//   .attr("height", height + margin.top + margin.bottom)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "-60 -30 800 500")
  .attr("aria-labelledby", "bar-chart-title");

const xValue = (d) => d.Jaar;
const yValue = (d) => d.Zonnestroom;

const xScale = d3
  .scaleTime()
  .domain(d3.extent(data2.dates, (d) => d))
  // .domain(data.map(d => d.Jaar))
  .range([0, innerWidth]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data2.series, (d) => d3.max(d.values))])
  .range([innerHeight, 0])
  .nice();

// console.log(yScale.domain())

const line = d3
  .line()
  .defined((d) => !isNaN(d))
  .x((d, i) => xScale(data2.dates[i])) // set the x values for the line generator
  .y((d) => yScale(d)) // set the y values for the line generator
  .curve(d3.curveMonotoneX); // apply smoothing to the line

// 3. Call the x axis in a group tag
svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")")
  .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%Y"))); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g").attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

const path = svg
  .append("g")
  .attr("fill", "none")
  .attr("stroke-width", 3)
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .selectAll("path")
  .data(data2.series)
  .join("path")
  .style("mix-blend-mode", "multiply")
  .attr("d", (d) => line(d.values))
  .attr("class", (d) => d.name)
  .attr("stroke", (d) => color(d.name))
  .on('focus', d => console.log(d));




svg
  .selectAll(".dot")
  .data(data2.series)
  .enter()
  .append("g")
  .attr("fill", (d) => color(d.name))
  .selectAll("circle")
  .data(d => d.values)
  .enter()
  .append("circle")
  .attr("class", "dot")
  .attr("cx", (d, i) => xScale(data2.dates[i]))
  .attr("cy", (d, i) => yScale(d))
  .attr("stroke", "#fff")
  .attr("r", 10)
  .on('focus', d => console.log(d));




const musicNotes  = svg.selectAll('.musicnote')
    
    .data(data2.series)
    .enter()
    // .append('g')
    .append("circle")
    .attr('class', d => d.name)
    .attr("cx", (d, i) => xScale(data2.dates[0]))
    .attr("cy", (d, i) => yScale(d.values[0]))
    .attr("r", 25)
    .on("click", function(d, i ){
        d3.select(this)
        .transition()
        .delay(250)
        .duration(2000)
        .attrTween("pathTween", () => pathTween(path._groups[0][i]))

    });
    

    function pathTween(path){
        
        console.log(path)
        // console.log(circle)

        var length = path.getTotalLength(); // Get the length of the path
        // console.log(length)
        var r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length

        return function(t) {
            // console.log('t: ', t)
            var point = path.getPointAtLength(r(t)); // Get the next point along the path
            // console.log(point)
            // createSound(point)
            d3.select(this) // Select the circle
            // .transition()
            // .delay(250)
            // .duration(1000)

                .attr("cx", point.x) // Set the cx
                .attr("cy", point.y) // Set the cy
                .attr("sound", createSound(point.y))
        }
    }

    

    function createSound(yVal) {
        context = context || new AudioContext();
        const volumeScale = d3.scaleLinear().domain([600, 1500]).range([2, 0.3]);
        var toneScale = d3.scaleLinear().domain([0, d3.max(data2.series, (d) => d3.max(d.values))]).range([80, 1500]);
        var oscillator = context.createOscillator();
        var gainNode = context.createGain();
        gainNode.gain.value = volumeScale(toneScale(yVal));
        oscillator.type = 'triangle';
        oscillator.frequency.value = toneScale(yVal); // Hz
        // Connect the oscillator to our speakers after passing it
        // through the gainNode to modulate volume
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        // Start the oscillator now
        oscillator.start();
        // this rapidly ramps sound down
        gainNode.gain.setTargetAtTime(0, context.currentTime, .3);
      }