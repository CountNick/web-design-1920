//https://stackoverflow.com/questions/9419263/playing-audio-with-javascript

const audio = new Audio()

const playList = new Array('./audio/all-samples/banjo/banjo_E3_very-long_forte_normal.mp3', './audio/all-samples/banjo/banjo_F3_very-long_forte_normal.mp3', './audio/all-samples/banjo/banjo_Fs3_very-long_piano_normal.mp3', './audio/all-samples/banjo/banjo_G3_very-long_piano_normal.mp3', './audio/all-samples/banjo/banjo_Gs4_very-long_forte_normal.mp3', './audio/all-samples/banjo/banjo_Gs4_very-long_piano_normal.mp3', './audio/all-samples/banjo/banjo_Gs5_very-long_piano_normal.mp3', './audio/all-samples/banjo/banjo_E5_very-long_piano_normal.mp3', './audio/all-samples/banjo/banjo_E6_very-long_forte_normal.mp3')



const data = [

    {
      name: "Avocado",
      value: 10,
    },

    {
      name: "Papaya",
      value: 20,
    },

    {
        name: "Pineapples",
        value: 30,
    },

    {
        name: "Mango's",
        value: 40,
    },

    {
        name: "Apples",
        value: 50,
    },

    {
        name: "Apricots",
        value: 60,
    },
    {
      name: "Icecream",
      value: 70,
    },
    {
      name: "Strawberries",
      value: 80,
    },
    {
        name: "Bananas",
        value: 100,
    }
    

  ]

  const margin = { top: 20, right: 20, bottom: 70, left: 90 }
  const width = 600 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom
  const legendWidth = 300

//responsive: https://stackoverflow.com/questions/44833788/making-svg-container-100-width-and-height-of-parent-container-in-d3-v4-instead
  const svg = d3
    .select("#chart")
    // .attr("width", width + margin.left + margin.right + legendWidth)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 500")
    .attr("aria-labelledby", "bar-chart-title")

  svg
    .append("text")
    .attr("x", margin.left)
    .attr("y", 250)
    .text("2018 Fruit Production")
    .attr("id", "bar-chart-title")

  svg
    .append("text")
    .text("Legend")
    .attr("x", width + margin.right + margin.left)
    .attr("y", 20)

  svg
    .append("text")
    .text("B = billion")
    .attr("x", width + margin.right + margin.left)
    .attr("y", 40)

  const xValues = []
  data.map((datum) => xValues.push(datum.name))

  const xScale = d3
    .scaleBand()
    .domain(xValues)
    .range([0, width])
    .padding(0.1)

  const yValues = []
  data.map((datum) => yValues.push(datum.value))

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(yValues)])
    .nice()
    .range([height, 0])

  const barGroups = svg
    .append("g")
    .attr("role", "list")
    .attr("aria-label", "bar chart")
    .attr("class", "data")
    .attr("transform", `translate(${margin.left}, 0)`)

  const barColors = ["#ff0000", "#fffb00", "#002fff", "#ff7b00", "#00ff04", "#9000ff", "#ff00bb", "#fffffff"]

  const g = barGroups
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("role", "listitem")

  g.append("rect")
    .attr("fill", (d, i) => barColors[i])
    .attr("stroke", "#000")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.name))
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.value))
    .on('focus', (d, i) => handleBarFocus(d, i))
    .on('blur', function () {
        d3.select(this)
            .classed('highlighted', false)
            .attr('tabindex', '-1');
    });

  const lineItemHeight = 30

  g.append("rect")
    .attr("fill", (d, i) => barColors[i])
    .attr("stroke", "#000")
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", width + margin.right)
    .attr("y", (d, i) => lineItemHeight * (i + 1) + 30)

  g.append("text")
    .text(
      (d) => `${d.name} - ${d3.format(".2s")(d.value).replace("G", "B")}`
    )
    .attr("x", width + margin.right + 30)
    .attr("y", (d, i) => lineItemHeight * (i + 1) + 45)

  const xAxis = d3.axisBottom(xScale).tickSize(0)

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("aria-label", "x axis")
    .attr("transform", `translate(${margin.left}, ${height})`)
    .call(xAxis)

  const increment = Math.ceil(d3.max(yValues) / 5)
  const tickRange = d3.range(0, d3.max(yValues), increment)

  var yAxis = d3
    .axisLeft(yScale)
    .tickValues(tickRange)
    .tickFormat((d) => d3.format(".2s")(d).replace("G", "B"))

  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("aria-label", "y axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis)

const bars = d3.selectAll('.bar').nodes()
let highlightedBarIndex = null


svg.on('keydown', () => handleArrowKey())

function handleArrowKey(){
    const pushed = d3.event.keyCode
    if(pushed !== 37 && pushed !== 39) return
    // else console.log(pushed)

    if(highlightedBarIndex === null){
        console.log(pushed)
        highlightedBarIndex = 0
    }
    else if (pushed === 37) {
        highlightedBarIndex -= 1;
    } else if (pushed === 39) {
        highlightedBarIndex += 1;
    }
    console.log('higleeee: ', highlightedBarIndex)
}

const context = new AudioContext();

function handleBarFocus(data, index){
    highlightedBarIndex = index
    const highlightedBar = d3.select(bars[index]);
    const volumeScale = d3.scaleLinear().domain([100, 1500]).range([2, 0.3]);
    console.log('hiero', highlightedBar)

    // d3.selectAll(bars)
    // .classed('highlighted', false)
    // .attr('tabindex', '-1');

    // highlightedBar
    // .classed('highlighted', true)
    // .attr('tabindex', '0');

    // const self = this
    // console.log('self: ', self)

    highlightedBar.attr('d', function (d) {
        // Audio functionality from: http://bl.ocks.org/aholachek/6e18a82c0f0ada144b854f788c07d7a4
        console.log(d)
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        gainNode.gain.value = volumeScale(d.value);
        oscillator.type = 'triangle';
        oscillator.frequency.value = d.value; // Hz
        // Connect the oscillator to our speakers after passing it
        // through the gainNode to modulate volume
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        // Start the oscillator now
        oscillator.start();
        // this rapidly ramps sound down
        gainNode.gain.setTargetAtTime(0, context.currentTime, 0.3);
    });

}