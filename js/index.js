// Credits go to this example: https://bl.ocks.org/mmazanec22/d3cc26bc753f960cdb05f5075d5eae2f

//https://stackoverflow.com/questions/9419263/playing-audio-with-javascript




const data = [

    {
      name: "Fossiele brandstoffen",
      value: 76.3,
      soorten: [
          {
              Aardgas: 58.7
          },
          {
              Steenkool: 14.4
            },
            {
              Stookolie: 0.1
            },
            {
              'Overige fossiele brandstoffen': 3.2
            }
      ]
    },
    {
        name: "Totaal hernieuwbare energie",
        value: 18.5,
        soorten: [
          {
              "Zonne energie": 6
          },
          {
              Waterkracht: 5
            },
          {
             Windenergie: 3.2
          }
      ]
    },
    {
        name: "Kernenergie",
        value: 3.2,
        soorten: [
          {
              Aardgas: 58.7
          },
          {
              Steenkool: 14.4
            },
            {
              Stookolie: 0.1
            },
            {
              'Overige fossiele brandstoffen': 3.2
            }
      ]
    },
    {
        name: "Overige energiedragers",
        value: 2,
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
    .range([height, 0])
    .nice()

  const barGroups = svg
    .append("g")
    .attr("role", "list")
    .attr("aria-label", "bar chart")
    .attr("class", "data")
    .attr("transform", `translate(${margin.left}, 0)`)

  const barColors = ["#ff0000", "#fffb00", "#002fff", "#ff7b00", "#00ff04", "#9000ff", "#ff00bb", "#87582f", "#000000"]

  svg.on('keydown', () => handleArrowKey())

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




function handleArrowKey(){
    const pushed = d3.event.keyCode
    console.log(pushed)
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
    
    const numBars = bars.length

    highlightedBarIndex = highlightedBarIndex < 0 ? numBars + highlightedBarIndex : highlightedBarIndex % numBars;
    bars[highlightedBarIndex].focus();
}

const context = new AudioContext();

function handleBarFocus(data, index){
    
    console.log('klik: ', data)
    const utterance = new SpeechSynthesisUtterance(`Het percentage  ${data.name} is ${data.value}%`);
    speechSynthesis.speak(utterance);

    utterance.onend = () => listenToSpeech(data)
    // handleArrowKey()
    highlightedBarIndex = index
    const highlightedBar = d3.select(bars[index]);
    const volumeScale = d3.scaleLinear().domain([600, 1500]).range([2, 0.3]);
    // console.log('hiero', highlightedBar)

    d3.selectAll(bars)
    .classed('highlighted', false)
    .attr('tabindex', '-1');

    highlightedBar
    .classed('highlighted', true)
    .attr('tabindex', '0');


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

function listenToSpeech(data){

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
    recognition.lang = 'nl-nl';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();

recognition.onresult = function(event) {
    console.log('You said: ', event.results[0][0].transcript);

    if(event.results[0][0].transcript == 'meer info'){
        const utterance = new SpeechSynthesisUtterance(`Het percentage ${data.name} bestaat uit`);
        const utterance2 = new SpeechSynthesisUtterance(data.soorten.map(soort => `${Object.entries(soort)}%`))
        speechSynthesis.speak(utterance);
        utterance.onend = () => speechSynthesis.speak(utterance2)
    }

};

}