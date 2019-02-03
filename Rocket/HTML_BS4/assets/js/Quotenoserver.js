$(document).ready(function() {
  $(
    "#sum, #naparts, #nfloors, #nbasements, #nbusinesses, #nparkings, #ncages, #noccperfloor, #ndha, .buttoncenter, #luxe"
  ).hide();

  //------------------------------------------hide everything that is not input for residential------------------------------------------

  $("#btnresidential").on("click", function() {
    $("#btnhybrid").removeClass("type_clicked");
    $("#btncorporate").removeClass("type_clicked");
    $("#btncommercial").removeClass("type_clicked");
    $("#btnresidential").addClass("type_clicked");
    $(
      "#naparts, #nfloors, #nbasements, #nbusinesses, #nparkings, #ncages, #noccperfloor, #ndha, .buttoncenter"
    ).hide();
    $("#sum, #naparts, #nfloors, #nbasements, .buttoncenter, #luxe").show(1000);
    $("#standard").prop("checked", true);
    // set the inbut to 0$
    $("input").val("");
    $("#cage2").html("0");
    $("#totsfees2").html("0$");
    $("#fees").html("0$");
    $("#total").html("0$");
  });

  //------------------------------------------hide everything thta is not input for commercial------------------------------------------

  $("#btncommercial").on("click", function() {
    $("#btnhybrid").removeClass("type_clicked");
    $("#btncorporate").removeClass("type_clicked");
    $("#btncommercial").addClass("type_clicked");
    $("#btnresidential").removeClass("type_clicked");
    $(
      "#naparts, #nfloors, #nbasements, #nbusinesses, #nparkings, #ncages, #noccperfloor, #ndha, .buttoncenter"
    ).hide();
    $(
      "#sum, #nbusinesses, #nfloors, #nbasements, #nparkings, #ncages, .buttoncenter, #luxe"
    ).show(1000);
    $("#standard").prop("checked", true);

    // set the inbut to 0$
    $("input").val("");
    $("#cage2").html("0");
    $("#totsfees2").html("0$");
    $("#fees").html("0$");
    $("#total").html("0$");
  });

  //------------------------------------------hide everything thta is not input for corporate------------------------------------------

  $("#btncorporate").on("click", function() {
    $("#btnhybrid").removeClass("type_clicked");
    $("#btncorporate").addClass("type_clicked");
    $("#btncommercial").removeClass("type_clicked");
    $("#btnresidential").removeClass("type_clicked");
    $(
      "#naparts, #nfloors, #nbasements, #nbusinesses, #nparkings, #ncages, #noccperfloor, #ndha, .buttoncenter"
    ).hide();
    $(
      "#sum, #nbusinesses, #nfloors, #nbasements, #nparkings, #noccperfloor, .buttoncenter, #luxe"
    ).show(1000);
    $("#standard").prop("checked", true);

    // set the inbut to 0$
    $("input").val("");
    $("#cage2").html("0");
    $("#totsfees2").html("0$");
    $("#fees").html("0$");
    $("#total").html("0$");
  });

  //------------------------------------------hide everything thta is not input for hybrid------------------------------------------

  $("#btnhybrid").on("click", function() {
    $("#btnhybrid").addClass("type_clicked");
    $("#btncorporate").removeClass("type_clicked");
    $("#btncommercial").removeClass("type_clicked");
    $("#btnresidential").removeClass("type_clicked");
    $(
      "#naparts, #nfloors, #nbasements, #nbusinesses, #nparkings, #ncages, #noccperfloor, #ndha, .buttoncenter"
    ).hide();
    $(
      "#sum, #nbusinesses, #nfloors, #nbasements, #nparkings, #noccperfloor, #ndha, .buttoncenter, #luxe"
    ).show(1000);
    $("#standard").prop("checked", true);

    // set the inbut to 0$
    $("input").val("");
    $("#cage2").html("0");
    $("#totsfees2").html("0$");
    $("#fees").html("0$");
    $("#total").html("0$");
  });

  //  ------------------------------------------onclick switch for standard - premium - excelium------------------------------------------

  $("#standard").on("click", function() {
    var collected_vars = collect_vars();
    computed_result = compute_price(7565, 0.1, collected_vars, "standard");
  });
  $("#premium").on("click", function() {
    var collected_vars = collect_vars();
    computed_result = compute_price(12345, 0.13, collected_vars, "premium");
  });
  $("#excelium").on("click", function() {
    var collected_vars = collect_vars();
    computed_result = compute_price(15400, 0.16, collected_vars, "excelium");
  });
  $(".residential1  :input").on("change keyup", function() {
    console.log("test");
    var collected_vars = collect_vars();
    computed_result = compute_price(7565, 0.1, collected_vars, "standard");
  });

  function compute_price(price, feespercent, collected_vars, calc_type) {
    let total;
    let fees;
    let cage2;
    let occfl1000;
    let calccol;

    //------------------------------------------ alert if isnan in the input and clear it ------------------------------------------
    if (isNaN($("#numbers_apartments").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_apartments").value = "";
    }
    if (isNaN($("#numbers_floors").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_floors").value = "";
    }
    if (isNaN($("#numbers_basements").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_basements").value = "";
    }
    if (isNaN($("#numbers_businesses").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_businesses").value = "";
    }
    if (isNaN($("#numbers_parkings").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_parkings").value = "";
    }
    if (isNaN($("#numbers_cages").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_cages").value = "";
    }
    if (isNaN($("#numbers_occupantsPerFloors").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_occupantsPerFloors").value = "";
    }
    if (isNaN($("#numbers_hourActivity").val())) {
      alert("Hey this is not a number!!");
      document.getElementById("numbers_hourActivity").value = "";
    }

     // ------------------------------------------calcul for residential ------------------------------------------

     if (collected_vars['business_type'].toLowerCase() === 'residential'){
      cage2 = collected_vars.cagesPerFloors * collected_vars.nbcolumns;
      // console.log("residential")
      
      

      if (calc_type === 'standard'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.1;
          total = totsfees2 + fees;
      }
      
      if (calc_type == 'premium'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.13;
          total = totsfees2 + fees;
          
          
      }
      if (calc_type == 'excelium'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.16;
          total = totsfees2 + fees;
          
          
      }
  }
  else if (collected_vars['business_type'].toLowerCase() === 'commercial'){        
      cage2 = collected_vars.nbcages;
      // console.log("commercial")
      if (calc_type === 'standard'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.10;
          total = totsfees2 + fees;
      }
      
      if (calc_type == 'premium'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.13;
          total = totsfees2 + fees;
          
          
      }
      if (calc_type == 'excelium'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.16;
          total = totsfees2 + fees;
          
          
      }
  }
  else if (collected_vars['business_type'].toLowerCase() === 'corporate' || 'hybrid'){        
          occfl1000 = Math.ceil((collected_vars.nbocperfloors * (collected_vars.nbfloors + collected_vars.nbbassements)) /1000).toFixed(2);
          calccol = Math.ceil(occfl1000 / collected_vars.nbcolumns).toFixed(2);
          cage2 = Math.ceil(calccol * collected_vars.nbcolumns).toFixed(2);



      if (calc_type === 'standard'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.10;
          total = totsfees2 + fees;
      }
      
      if (calc_type == 'premium'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.13;
          total = totsfees2 + fees;
          
          
      }
      if (calc_type == 'excelium'){
          totsfees2 = price * cage2;
          fees = totsfees2 * 0.16;
          total = totsfees2 + fees;
          
          
      }
  }


  if(isNaN(total, fees, totsfees2, cage2)){
      total=0;
      fees=0;
      totsfees2=0;
      cage2=0;

  }

  // nb_appart = colected_vars['nbapartments']
  // nb_floors = colected_vars['nbfloors']
  // if (type_of_business == 'residential'){
      // document.getElementById("cage1").style.display = "block";
      document.getElementById("cage2").innerHTML = cage2;
      // document.getElementById("totsfees1").style.display = "block";
      document.getElementById("totsfees2").innerHTML = totsfees2.toFixed(2) + "$";
      // document.getElementById("totalPrice1").style.display = "block";
      document.getElementById("fees").innerHTML = fees.toFixed(2) + "$";
      // document.getElementById("totalPrice").style.display = "block";
      document.getElementById("total").innerHTML = total.toFixed(2) + "$"; 
      
  }

function collect_vars(){

  var business_type = $('.type_clicked').html();
  var nbapartments = parseInt(document.getElementById("numbers_apartments").value);
  var nbfloors = parseInt(document.getElementById("numbers_floors").value);
  var nbbassements = parseInt(document.getElementById("numbers_basements").value);
  var nbbusinesses = parseInt(document.getElementById("numbers_businesses").value);
  var nbparkings = parseInt(document.getElementById("numbers_parkings").value);
  var nbcages = parseInt(document.getElementById("numbers_cages").value);
  var nbocperfloors = parseInt(document.getElementById("numbers_occupantsPerFloors").value);
  var nbhouractivity = parseInt(document.getElementById("numbers_hourActivity").value);

  
  var apartPerFloors = Math.ceil (nbapartments / nbfloors).toFixed(2);
  console.log(apartPerFloors)
  var cagesPerFloors = Math.ceil(apartPerFloors / 6).toFixed(2);
  console.log(cagesPerFloors)
  var nbcolumns = Math.ceil(nbfloors /20).toFixed(2);
  console.log(nbcolumns)

  return { business_type: business_type, nbapartments: nbapartments,nbfloors: nbfloors,nbbassements: nbbassements,nbbusinesses:nbbusinesses,nbparkings:nbparkings,
      nbcages:nbcages,nbocperfloors:nbocperfloors,nbhouractivity:nbhouractivity, apartPerFloors:apartPerFloors,
       cagesPerFloors:cagesPerFloors, nbcolumns:nbcolumns}

}});

