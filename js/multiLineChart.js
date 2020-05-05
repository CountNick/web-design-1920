const mainTitle = document.querySelector('h1')
const instructions = document.querySelector('.instructions')

// console.log(instructions.textContent)

instructions.addEventListener('click', function() {speak(this.textContent)})
mainTitle.addEventListener('click', function() {speak(this.textContent)})




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
  .attr("viewBox", "-70 -30 800 500")
  .attr("aria-labelledby", "bar-chart-title");

  svg
    .append("text")
    // .attr("x", margin.left)
    .attr("y", 320)
    .text("Jaren")
    .style("font-family", "'Roboto', sans-serif")
    .style("font-weight", "300")
    .attr("id", "label")

  svg
    .append("text")
    .attr("x", -margin.left -60)
    .attr("y", -50)
    .text("TeraJoule")
    .style("font-family", "'Roboto', sans-serif")
    .style("font-weight", "300")
    .attr("transform", "rotate(270)")
    .attr("id", "label")

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


svg.on('keydown', () => handleArrowKey())

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
  .on('focus', (value, i) =>  {
    
    const energyKind = data2.series.find(d => d.values.includes(value))
    const info = `in ${data2.dates[i].getFullYear()} was het bruto eindverbruik van ${energyKind.name} ${value} terajoule`
    speak(info)

  });

  const dots = d3.selectAll('.dot').nodes()
  

  let highlightedDotIndex = null

  // data2.dates[0], 
  // console.log(d, data2.series[i]),



const musicNotes  = svg.selectAll('.musicnote')
    
    .data(data2.series)
    .enter()
    // .append('g')
    .append("circle")
    .attr('class', d => d.name)
    .attr("cx", (d, i) => xScale(data2.dates[0]))
    .attr("cy", (d, i) => yScale(d.values[0]))
    .attr("r", 25)
    .style('opacity', 0)
    .on("click", function(d, i ){  
      d3.select(this)
        .transition()
        .delay(250)
        .duration(2000)
        .attrTween("pathTween", () => pathTween(path._groups[0][i]))
    });
    
    const lineItemHeight = 30

    svg.selectAll("circles")
    .data(data2.series)
    .enter()
    .append("circle")
      .attr("fill", (d, i) => color(d.name))
      .attr("stroke", "#000")
      .attr("r", 12)
      // .attr("height", 20)
      .attr("cx", innerWidth + margin.right + 10)
      .attr("cy", (d, i) => lineItemHeight * (i + 1) + 30)
    
    
    svg
    .selectAll("circles")
    .data(data2.series)
    .enter()
    .append("text")
    .text(
      (d) => `${d.name}`
    )
    .attr("x", innerWidth + margin.right + 30)
    .attr("y", (d, i) => lineItemHeight * (i + 1) + 35)
    .style("font-family", "'Roboto', sans-serif")
    .style("font-weight", "300")

    svg
    .append("text")
    .text("Legenda")
    .style("font-family", "'Roboto', sans-serif")
    .attr("x", innerWidth + margin.right)
    .attr("y", 20)

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

    const context = new AudioContext();

    function createSound(yVal) {
        const volumeScale = d3.scaleLinear().domain([100, 1500]).range([2, 0.3]);
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

    function speak(data){
      // console.log('klik: ', data)
      const utterance = new SpeechSynthesisUtterance(data);
      speechSynthesis.speak(utterance);
    }

    function handleArrowKey(){
      const pushed = d3.event.keyCode
      console.log(pushed)
      if(pushed !== 37 && pushed !== 39) return
      // else console.log(pushed)
  
      if(highlightedDotIndex === null){
          console.log(pushed)
          highlightedBarIndex = 0
      }
      else if (pushed === 37) {
        highlightedDotIndex -= 1;
      } else if (pushed === 39) {
        highlightedDotIndex += 1;
      }
      
      const numBars = dots.length
  
      highlightedDotIndex = highlightedDotIndex < 0 ? numBars + highlightedDotIndex : highlightedDotIndex % numBars;
      dots[highlightedDotIndex].focus();
  }


  function handleDotFocus(index){
    
    // handleArrowKey()
    highlightedDotIndex = index
    const highlightedDot = d3.select(dots[index]);
    // console.log('hiero', highlightedBar)

    d3.selectAll(dots)
    .classed('highlighted', false)
    .attr('tabindex', '-1');

    highlightedDot
    .classed('highlighted', true)
    .attr('tabindex', '0');

}