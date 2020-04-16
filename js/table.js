d3.csv('./data/Elektriciteit__productie_en_inzet_16042020_113840.csv')
    .then(data => structureData(data))


function structureData(data){
    console.log('Structure Data functin: ', data)

    const cleanedData = data.map(object => {
        return {
            name: object.Energiedragers,
            jaar: object.Perioden,
            value: +object['Bruto productie elektriciteit en warmte/Elektriciteit/Elektriciteit (%) (%)']
        }
    })

    cleanYear(cleanedData)

    console.log('clean: ', cleanedData)

    const lastYear = cleanedData.filter(object => object.jaar === 2019)



    // nest(lastYear)
}

function cleanYear(data){
    data.map(object => {
        if(object.jaar == "2018**") object.jaar = 2018
        if(object.jaar == "2019*") object.jaar = 2019
    })
}
