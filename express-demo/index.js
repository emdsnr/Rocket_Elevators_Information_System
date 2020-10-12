const express = require('express');
const app = express();

//$("#mcalc-installcost").text(totalcost1.formatMoney(2, '.', ','));


// telling system to be able to get request (url) from anywhere
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
   
    next();
});

app.get('/hello', (req, res) => {
    res.send('hello world!!!');
});


//residential
app.get('https://wjacques.tech/api/quote/residential/:service/:apart/:floor/:basement', (req, res) => {
    const quoteValues = {
        serviceline: req.params.service,
        numApart: parseInt(req.params.apart),
        numFloor: parseInt(req.params.floor),
        numBasement: parseInt(req.params.basement),
    };

    var installfee = 0.1;
    var totalcost = 0;
    var elevatorunit = 7565;

    if (quoteValues.serviceline === "standard") {
        elevatorunit = 7565;
        installfee = 0.1;
    } else if (quoteValues.serviceline === "premium") {
        elevatorunit = 12345;
        installfee = 0.13;
    } else if (quoteValues.serviceline === "excelium") {
        elevatorunit = 15400;
        installfee = 0.16;
    }

    var ntotalfloors = quoteValues.numFloor + quoteValues.numBasement
    var result_columns = 1;
    var result_elevators = 1;
    result_columns = Math.ceil(ntotalfloors / 20);
    result_elevators = Math.ceil(quoteValues.numApart / quoteValues.numFloor / 6) * result_columns;
    var totalcost1 = elevatorunit * result_elevators * installfee;
    var totalcost2 = elevatorunit * result_elevators;
    var totalcost3 = elevatorunit * result_elevators + totalcost1;

    res.json({
        result_elevators: result_elevators,
        result_columns: result_columns,
        totalcost2: totalcost2,
        totalcost1: totalcost1,
        totalcost3: totalcost3
    });

})

//commercial
app.get('https://wjacques.tech/api/quote/commercial/:service/:nelevators', (req, res) => {
    const quoteValues = {
        serviceline: req.params.service,
        numelevator: parseInt(req.params.nelevators),
    };

    var installfee = 0.1;
    var totalcost = 0;
    var elevatorunit = 7565;

    if (quoteValues.serviceline === "standard") {
        elevatorunit = 7565;
        installfee = 0.1;
    } else if (quoteValues.serviceline === "premium") {
        elevatorunit = 12345;
        installfee = 0.13;
    } else if (quoteValues.serviceline === "excelium") {
        elevatorunit = 15400;
        installfee = 0.16;
    }

    var result_columns = 1;
    var result_elevators = 1;
    result_elevators = quoteValues.numelevator;
    result_columns = result_elevators;
    var totalcost1 = elevatorunit * result_elevators * installfee;
    var totalcost2 = elevatorunit * result_elevators;
    var totalcost3 = elevatorunit * result_elevators + totalcost1;

    res.json({
        result_elevators: result_elevators,
        result_columns: result_columns,
        totalcost2: totalcost2,
        totalcost1: totalcost1,
        totalcost3: totalcost3
    });
})

//corporate
app.get('https://wjacques.tech/api/quote/corporate/:service/:floor/:basement/:occupants', (req, res) => {
    const quoteValues = {
        serviceline: req.params.service,
        numFloor: parseInt(req.params.floor),
        numBasement: parseInt(req.params.basement),
        noccupants: parseInt(req.params.occupants),
    };

    var installfee = 0.1;
    var totalcost = 0;
    var elevatorunit = 7565;

    if (quoteValues.serviceline === "standard") {
        elevatorunit = 7565;
        installfee = 0.1;
    } else if (quoteValues.serviceline === "premium") {
        elevatorunit = 12345;
        installfee = 0.13;
    } else if (quoteValues.serviceline === "excelium") {
        elevatorunit = 15400;
        installfee = 0.16;
    }

    var ntotalfloors = quoteValues.numFloor + quoteValues.numBasement
    var result_columns = 1;
    var result_elevators = 1;
    var totaloccupents = quoteValues.noccupants*ntotalfloors;
    var minelevators = Math.ceil(totaloccupents / 1000);
    result_columns = Math.ceil(ntotalfloors / 20);
    result_elevators = Math.ceil(minelevators/result_columns) * result_columns;
    var totalcost1 = elevatorunit * result_elevators * installfee;
    var totalcost2 = elevatorunit * result_elevators;
    var totalcost3 = elevatorunit * result_elevators + totalcost1;

    res.json({
        result_elevators,
        result_columns,
        totalcost2,
        totalcost1,
        totalcost3
    });
})

//hybrid
app.get('https://wjacques.tech/api/quote/hybrid/:service/:floor/:basement/:occupants', (req, res) => {
    const quoteValues = {
        serviceline: req.params.service,
        numFloor: parseInt(req.params.floor),
        numBasement: parseInt(req.params.basement),
        noccupants: parseInt(req.params.occupants),
    };

    var installfee = 0.1;
    var totalcost = 0;
    var elevatorunit = 7565;

    if (quoteValues.serviceline === "standard") {
        elevatorunit = 7565;
        installfee = 0.1;
    } else if (quoteValues.serviceline === "premium") {
        elevatorunit = 12345;
        installfee = 0.13;
    } else if (quoteValues.serviceline === "excelium") {
        elevatorunit = 15400;
        installfee = 0.16;
    }

    var ntotalfloors = quoteValues.numFloor + quoteValues.numBasement
    var result_columns = 1;
    var result_elevators = 1;
    var totaloccupents = quoteValues.noccupants*ntotalfloors;
    var minelevators = Math.ceil(totaloccupents / 1000);
    result_columns = Math.ceil(ntotalfloors / 20);
    result_elevators = Math.ceil(minelevators/result_columns) * result_columns;
    var totalcost1 = elevatorunit * result_elevators * installfee;
    var totalcost2 = elevatorunit * result_elevators;
    var totalcost3 = elevatorunit * result_elevators + totalcost1;

    res.json({
        result_elevators: result_elevators,
        result_columns: result_columns,
        totalcost2: totalcost2,
        totalcost1: totalcost1,
        totalcost3: totalcost3
    });

})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));