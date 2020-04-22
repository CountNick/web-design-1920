const data = [

    {
        "Jaar": "2015",
        "Waterkracht": 99,
        "Biomassa": 5028,
        "Windenergie": 6917,
        "Zonnestroom": 1109
    },
    {
        "Jaar": "2016",
        "Waterkracht": 98,
        "Biomassa": 5010,
        "Windenergie": 8364,
        "Zonnestroom": 1602
    },
    {
        "Jaar": "2017",
        "Waterkracht": 94,
        "Biomassa": 4729,
        "Windenergie": 9642,
        "Zonnestroom": 2208
    },
    {
        "Jaar": "2018",
        "Waterkracht": 94,
        "Biomassa": 4694,
        "Windenergie": 10030,
        "Zonnestroom": 3693
    },
    {
        "Jaar": "2019",
        "Waterkracht": 93,
        "Biomassa": 5772,
        "Windenergie": 10743,
        "Zonnestroom": 5189
    }

]


// Stak the values on type of energy
const stack = d3.stack()
    .keys(['Waterkracht', 'Biomassa', 'Windenergie', 'Zonnestroom'])
    .order(d3.stackOrderAscending)
    .offset(d3.stackOffsetNone);

const series = stack(data)

console.log('series: ', series)


const margin = { top: 20, right: 20, bottom: 70, left: 90 }
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


        const yValue = d => d.Jaar;

      
        //set the xscale to the highest value in series, d[1] is selected because the second array index is always the higher one
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
            .range([0, innerWidth])
            .nice();
        //the origin names are spread over the y value
        const yScale = d3.scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.1);
      
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
        //append a new group for the y axis and set it on the left side
        g.append('g')
            .call(d3.axisLeft(yScale)
                .tickSize('0'))
              .append('text')
              .attr('fill', 'black');
      
        //append a new group for the x axis and set it at as the bottom axis
        g.append('g')
            .call(d3.axisBottom(xScale)
                //sets ticklines on the x axis
                .tickSize(-innerHeight))
            .attr('transform', `translate(0, ${innerHeight})`)
            .append('text')
            .attr('y', 60)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text('Miljoen kWh');
            
        //makes an ordinal color scale for each type
        const color = d3.scaleOrdinal()
        //.domain(["hasjpijpen", "tabakspijpen", "waterpijpen", "pijpen (rookgerei)", "opiumpijpen" ])
        .range([ '#FF0047', '#FF8600', '#6663D5', '#FFF800', '#29FF3E' ]);

                //source: https://observablehq.com/@d3/stacked-bar-chart
        //append a new group and fill each group with the value of that type and color
        g.append("g")
            .selectAll("g")
            .data(series)
            .join("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("y", d => yScale(d.data.Jaar))
            .attr("x", d => xScale(d[0]))
            .attr("height", yScale.bandwidth())
            .attr("width", d => xScale(d[1]) - xScale(d[0]))

        