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

    if (collected_vars["business_type"].toLowerCase() === "residential") {
      if (
        document.getElementById("numbers_apartments").value !== "" &&//--------------------- calcul if input in value
        document.getElementById("numbers_floors").value !== ""//--------------------- calcul if input in value
      ) {
        // ------------------------------------------calcul for residential / standard ------------------------------------------
        if (calc_type === "standard") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/api/res/",
            {
              nbapartments: collected_vars.nbapartments,
              nbfloors: collected_vars.nbfloors,
              price: price,
              feespercent: feespercent
            },

            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        } 
        // ------------------------------------------calcul for residential / premium ------------------------------------------
        else if (calc_type == "premium") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/api/res/",
            {
              nbapartments: collected_vars.nbapartments,
              nbfloors: collected_vars.nbfloors,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
        // ------------------------------------------calcul for residential / excelium------------------------------------------
        else if (calc_type == "excelium") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/api/res/",
            {
              nbapartments: collected_vars.nbapartments,
              nbfloors: collected_vars.nbfloors,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
      }
    }
    // ------------------------------------------calcul for commercial ------------------------------------------
    else if (collected_vars["business_type"].toLowerCase() === "commercial") {
      if (document.getElementById("numbers_cages").value !== "") { //--------------------- calcul if input in value
        // ------------------------------------------calcul for commercial/ ------------------------------------------
        if (calc_type === "standard") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/api/com/",
            {
              nbcages: collected_vars.nbcages,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
// ------------------------------------------calcul for commercial / premium------------------------------------------
        if (calc_type == "premium") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/api/com/",
            {
              nbcages: collected_vars.nbcages,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
        // ------------------------------------------calcul for commercial / excelium------------------------------------------
        if (calc_type == "excelium") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/api/com/",
            {
              nbcages: collected_vars.nbcages,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
      }
    } else if (
       // ------------------------------------------calcul for corporate and hybrid ------------------------------------------
      collected_vars["business_type"].toLowerCase() === "corporate" ||
      "hybrid"
    ) {
      if (
        document.getElementById("numbers_floors").value !== "" && //--------------------- calcul if input in value
        document.getElementById("numbers_basements").value !== "" && //--------------------- calcul if input in value
        document.getElementById("numbers_occupantsPerFloors").value !== "" //--------------------- calcul if input in value
      ) {
        // ------------------------------------------calcul for corporate and hybrid / standard ------------------------------------------
        if (calc_type === "standard") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/corphyb/",
            {
              nbocperfloors: collected_vars.nbocperfloors,
              nbbassements: collected_vars.nbbassements,
              nbcolumns: collected_vars.nbcolumns,
              nbfloors: collected_vars.nbfloors,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
// ------------------------------------------calcul for corporate and hybrid / premium ------------------------------------------
        if (calc_type == "premium") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/corphyb/",
            {
              nbocperfloors: collected_vars.nbocperfloors,
              nbbassements: collected_vars.nbbassements,
              nbcolumns: collected_vars.nbcolumns,
              nbfloors: collected_vars.nbfloors,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
        // ------------------------------------------calcul for corporate and hybrid / standard / excelium ------------------------------------------
        if (calc_type == "excelium") {
          $.post(
            "RocketElevators-env.ux2jw7mvfb.us-east-2.elasticbeanstalk.com/corphyb/",
            {
              nbocperfloors: collected_vars.nbocperfloors,
              nbbassements: collected_vars.nbbassements,
              nbcolumns: collected_vars.nbcolumns,
              nbfloors: collected_vars.nbfloors,
              price: price,
              feespercent: feespercent
            },
            function(data, status) {
              console.log("data" + data + "status" + status);
              $("#cage2").html(data.nbcages);
              $("#totsfees2").html(data.totalsfrais);
              $("#fees").html(data.fees);
              $("#total").html(data.totalreal);
            }
          );
        }
      }
    }

  
  }
// ------------------------------------------ all my variable------------------------------------------
  function collect_vars() {
    var business_type = $(".type_clicked").html();
    var nbapartments = parseInt(
      document.getElementById("numbers_apartments").value
    );
    var nbfloors = parseInt(document.getElementById("numbers_floors").value);
    var nbbassements = parseInt(
      document.getElementById("numbers_basements").value
    );
    var nbbusinesses = parseInt(
      document.getElementById("numbers_businesses").value
    );
    var nbparkings = parseInt(
      document.getElementById("numbers_parkings").value
    );
    var nbcages = parseInt(document.getElementById("numbers_cages").value);
    var nbocperfloors = parseInt(
      document.getElementById("numbers_occupantsPerFloors").value
    );
    var nbhouractivity = parseInt(
      document.getElementById("numbers_hourActivity").value
    );

    var apartPerFloors = Math.ceil(nbapartments / nbfloors).toFixed(2);
    console.log(apartPerFloors);
    var cagesPerFloors = Math.ceil(apartPerFloors / 6).toFixed(2);
    console.log(cagesPerFloors);
    var nbcolumns = Math.ceil(nbfloors / 20).toFixed(2);
    console.log(nbcolumns);

    return {
      business_type: business_type,
      nbapartments: nbapartments,
      nbfloors: nbfloors,
      nbbassements: nbbassements,
      nbbusinesses: nbbusinesses,
      nbparkings: nbparkings,
      nbcages: nbcages,
      nbocperfloors: nbocperfloors,
      nbhouractivity: nbhouractivity,
      apartPerFloors: apartPerFloors,
      cagesPerFloors: cagesPerFloors,
      nbcolumns: nbcolumns
    };
  }

});
