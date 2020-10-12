$("#selectMe, input[type=radio][name=exampleRadios], #mcalc-napartsr, #mcalc-nfloorsr, #mcalc-nbasementsr, #mcalc-nfloorscm, #mcalc-nbasementscm, #mcalc-nbusinesscm, #mcalc-nparkingcm, #mcalc-nelevatorcm, #mcalc-nparkingcr, #mcalc-ntenantcr, #mcalc-noccupantcr, #mcalc-nfloorscr, #mcalc-nbasementscr, #mcalc-nbusinessh, #mcalc-nfloorsh, #mcalc-nbasementsh, #mcalc-nparkingh, #mcalc-noccupanth, #mcalc-nhoursh").change(function () {
    mcalc1();
});


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


var URL = ``;

function mcalc1() {
    var selectedtype = $("#selectMe").val();
    var serviceline = $('input[name="exampleRadios"]:checked').val();
    //residential values
    var mcalc_napartsre = parseInt($("#mcalc-napartsr").val());
    var mcalc_nfloorsre = parseInt($("#mcalc-nfloorsr").val());
    var mcalc_nbasementsre = parseInt($("#mcalc-nbasementsr").val());
    //commercial values
    var mcalc_nelevatorcm = parseInt($("#mcalc-nelevatorcm").val());
    //corporative values
    var mcalc_nfloorscr = parseInt($("#mcalc-nfloorscr").val());
    var mcalc_nbasementscr = parseInt($("#mcalc-nbasementscr").val());
    var mcalc_noccupantcr = parseInt($("#mcalc-noccupantcr").val());
    //hybrid values
    var mcalc_nfloorshy = parseInt($("#mcalc-nfloorsh").val());
    var mcalc_nbasementshy = parseInt($("#mcalc-nbasementsh").val());
    var mcalc_noccupanthy = parseInt($("#mcalc-noccupanth").val());

    if (selectedtype === "---SELECT---") {
        return;
    }
    if (selectedtype === "residential") {
        var URL = `https://wjacques.tech/api/quote/residential/${serviceline}/${mcalc_napartsre}/${mcalc_nfloorsre}/${mcalc_nbasementsre}`;
    };
    if (selectedtype === "commercial") {
        var URL = `https://wjacques.tech/api/quote/commercial/${serviceline}/${mcalc_nelevatorcm}`;
    };
    if (selectedtype === "corporate") {
        var URL = `https://wjacques.tech/api/quote/corporate/${serviceline}/${mcalc_nfloorscr}/${mcalc_nbasementscr}/${mcalc_noccupantcr}`;
    };
    if (selectedtype === "hybrid") {
        var URL = `https://wjacques.tech/api/quote/hybrid/${serviceline}/${mcalc_nfloorshy}/${mcalc_nbasementshy}/${mcalc_noccupanthy}`;
    };
    console.log(URL);

    fetch(URL).then(function(response) {
        return response.json();
    }).then(function(data) {

/*
        console.log(data)
        console.log(data.totalcost1)
        console.log(data.totalcost2)
        console.log(data.totalcost3)
        console.log(data.result_columns)
        console.log(data.result_elevators)
*/
    $("#mcalc-result-elevators").text(data.result_elevators);
    $("#mcalc-result-columns").text(data.result_columns);
    $("#mcalc-installcost").text(data.totalcost1.formatMoney(2, '.', ','));
    $("#mcalc-elevetortotal").text(data.totalcost2.formatMoney(2, '.', ','));
    $("#mcalc-totalcost").text(data.totalcost3.formatMoney(2, '.', ','));
    });
    
}