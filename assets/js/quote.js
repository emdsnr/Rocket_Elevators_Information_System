
$(document).ready(function () {
    $('#selectMe').change(function () {
        $('.building_type').hide();
        $('#' + $(this).val()).show();
    })
});

$("#selectMe, input[type=radio][name=exampleRadios], #mcalc-napartsr, #mcalc-nfloorsr, #mcalc-nbasementsr, #mcalc-nfloorscm, #mcalc-nbasementscm, #mcalc-nbusinesscm, #mcalc-nparkingcm, #mcalc-nelevatorcm, #mcalc-nparkingcr, #mcalc-ntenantcr, #mcalc-noccupantcr, #mcalc-nfloorscr, #mcalc-nbasementscr, #mcalc-nbusinessh, #mcalc-nfloorsh, #mcalc-nbasementsh, #mcalc-nparkingh, #mcalc-noccupanth, #mcalc-nhoursh").change(function () {
    mcalc();
});

$("#mcalc-napartsr, #mcalc-nfloorsr, #mcalc-nbasementsr, #mcalc-nfloorscm, #mcalc-nbasementscm, #mcalc-nbusinesscm, #mcalc-nparkingcm, #mcalc-nelevatorcm, #mcalc-nparkingcr, #mcalc-ntenantcr, #mcalc-noccupantcr, #mcalc-nfloorscr, #mcalc-nbasementscr, #mcalc-nbusinessh, #mcalc-nfloorsh, #mcalc-nbasementsh, #mcalc-nparkingh, #mcalc-noccupanth, #mcalc-nhoursh").keyup(function () {
    mcalc();
});

function mcalc() {
    var selectedtype = $("#selectMe").val();		                            // Building type
    var serviceline = $('input[name="exampleRadios"]:checked').val();	        // Service Line
    var installfee = 0.1;
    var totalcost = 0;
    var mcalc_elevetorunit = 0;

    if (serviceline === "standard") {
        mcalc_elevetorunit = 7565;
        installfee = 0.1;
        $("#mcalc-elevetorunit").text(mcalc_elevetorunit.formatMoney(2, '.', ','));
    } else if (serviceline === "premium") {
        mcalc_elevetorunit = 12345;
        installfee = 0.13;
        $("#mcalc-elevetorunit").text(mcalc_elevetorunit.formatMoney(2, '.', ','));
    } else if (serviceline === "excelium") {
        mcalc_elevetorunit = 15400;
        installfee = 0.16;
        $("#mcalc-elevetorunit").text(mcalc_elevetorunit.formatMoney(2, '.', ','));
    }

    if (selectedtype === "") {
        var result_columns = 0;
        var result_elevators = 0;

        $("#mcalc-result-elevators").text(result_elevators);
        $("#mcalc-result-columns").text(result_columns);

    } else if (selectedtype === "residential") {
        var mcalc_naparts = parseInt($("#mcalc-napartsr").val()); 		            // Number of apartments
        var mcalc_nfloors = parseInt($("#mcalc-nfloorsr").val());	    	        // Number of floors
        var mcalc_nbasements = parseInt($("#mcalc-nbasementsr").val());    	        // Number of basements
        var ntotalfloors = mcalc_nfloors + mcalc_nbasements
        var result_columns = 1;
        var result_elevators = 1;
        result_columns = Math.ceil(ntotalfloors / 20);
        result_elevators = Math.ceil(mcalc_naparts / mcalc_nfloors / 6) * result_columns;

        $("#mcalc-result-elevators").text(result_elevators);
        $("#mcalc-result-columns").text(result_columns);

    } else if (selectedtype === "commercial") {
        var mcalc_nfloors = parseInt($("#mcalc-nfloorscm").val());	    	        // Number of floors
        var mcalc_nbasements = parseInt($("#mcalc-nbasementscm").val());    	    // Number of basements
        var mcalc_nbusiness = parseInt($("#mcalc-nbusinesscm").val());    	        // Number of businesses
        var mcalc_nparking = parseInt($("#mcalc-nparkingcm").val()); 	    	    // Number of parking
        var mcalc_nelevator = parseInt($("#mcalc-nelevatorcm").val());     	        // Number of elevator needed
        var result_columns = 1;
        var result_elevators = 1;
        result_elevators = mcalc_nelevator;
        result_columns = result_elevators;

        $("#mcalc-result-elevators").text(result_elevators);
        $("#mcalc-result-columns").text(result_columns);

    } else if (selectedtype === "corporate") {
        var mcalc_nparking = parseInt($("#mcalc-nparkingcr").val()); 	    	    // Number of parking
        var mcalc_ntenant = parseInt($("#mcalc-ntenantcr").val()); 		            // Number of tenants companies
        var mcalc_noccupant = parseInt($("#mcalc-noccupantcr").val()); 	            // Number of occupants per floor
        var mcalc_nfloors = parseInt($("#mcalc-nfloorscr").val());	    	        // Number of floors
        var mcalc_nbasements = parseInt($("#mcalc-nbasementscr").val());    	    // Number of basements
        var ntotalfloors = mcalc_nfloors + mcalc_nbasements
        var result_columns = 1;
        var result_elevators = 1;
        var totaloccupents = mcalc_noccupant*ntotalfloors;
        var minelevators = Math.ceil(totaloccupents / 1000);
        result_columns = Math.ceil(ntotalfloors / 20);
        result_elevators = Math.ceil(minelevators/result_columns) * result_columns;

        $("#mcalc-result-elevators").text(result_elevators);
        $("#mcalc-result-columns").text(result_columns);

    } else if (selectedtype === "hybrid") {
        var mcalc_nbusiness = parseInt($("#mcalc-nbusinessh").val());               // Number of businesses
        var mcalc_nfloors = parseInt($("#mcalc-nfloorsh").val());	    	        // Number of floors
        var mcalc_nbasements = parseInt($("#mcalc-nbasementsh").val());    	        // Number of basements
        var mcalc_nparking = parseInt($("#mcalc-nparkingh").val()); 	    	    // Number of parking
        var mcalc_noccupant = parseInt($("#mcalc-noccupanth").val()); 	            // Number of occupants per floor
        var mcalc_nhours = parseInt($("#mcalc-nhoursh").val());    	                // Number of hour of activity in building
        var ntotalfloors = mcalc_nfloors + mcalc_nbasements
        var result_columns = 1;
        var result_elevators = 1;
        var minelevators = Math.ceil(mcalc_noccupant * ntotalfloors / 1000);
        result_columns = Math.ceil(ntotalfloors / 20);
        result_elevators = Math.ceil(minelevators/result_columns) * result_columns;

        $("#mcalc-result-elevators").text(result_elevators);
        $("#mcalc-result-columns").text(result_columns);
    }

    var totalcost1 = mcalc_elevetorunit * result_elevators * installfee;
    $("#mcalc-installcost").text(totalcost1.formatMoney(2, '.', ','));
    var totalcost2 = mcalc_elevetorunit * result_elevators;
    $("#mcalc-elevetortotal").text(totalcost2.formatMoney(2, '.', ','));
    var totalcost3 = mcalc_elevetorunit * result_elevators + totalcost1;
    $("#mcalc-totalcost").text(totalcost3.formatMoney(2, '.', ','));
}

