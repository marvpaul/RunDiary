var timeOut = null;

$(document).ready(function() {
    load_data();
    hideMess();
});

function load_data(){
    $.ajax( {
        type: "GET",
        url: "diary.php",
        success: function( response ) {
            $('#diary').html(response);
        }
    });

    $.ajax( {
        type: "GET",
        url: "overview.php",
        success: function( response ) {
            $('#overview').html(response);
        }
    });
}

$("#submit-entry").click( function() {
    let date = $('#input-date').val();
    let isDate = validate_date(date);
    let dateIsNotInFutre = true;

    let distance = $('#input-distance').val();
    let isValidDistance = !isNaN(distance) && distance != "";
    let isNotNullAndPositive = true;

    if(isDate){
        dateIsNotInFutre = dateNotInFuture(date);
    }

    if(isValidDistance){
        isNotNullAndPositive = distanceIsNotNullAndPositive(distance);
    }



    if(isDate && dateIsNotInFutre && isValidDistance && isNotNullAndPositive){
        $.ajax( {
            type: "POST",
            url: "save.php",
            data: $("form").serialize(),
            success: function( response ) {
                load_data();
                showMess("Entry was submitted sucessfully.", false);
            }
        });
        return false;
    } else{
        let errMess = "";
        if(!isDate){
            errMess += "Date is not valid <br>";
        }
        if(!dateIsNotInFutre){
            errMess += "Date is in future <br>";
        }
        if(!isValidDistance){
            errMess += "Distance is not a valid number <br>";
        }
        if(!isNotNullAndPositive){
            errMess += "Distance is null or negative <br>";
        }
        showMess(errMess, true);
    }

} );

function showMess(mess, err){
    $('#form-submit-mess').css("display", "inherit");
    if(err){
        $('#form-submit-mess').removeClass( "alert-success" );
        $('#form-submit-mess').addClass("alert-danger");
    } else{
        $('#form-submit-mess').addClass( "alert-success" );
        $('#form-submit-mess').removeClass("alert-danger");
    }
    $('#form-submit-mess').html(mess);
    clearTimeout(timeOut);
    timeOut = setTimeout(hideMess, 5000);
}

function hideMess(){
    $('#form-submit-mess').css("display", "none");
}

function validate_date(date){
    let reg = /^\d{4}-\d{2}-\d{2}$/;
    if(date.match(reg)){
        var d = new Date(date);
        if(d.getTime()){
            return true;
        }
    }
    return false;

}

function dateNotInFuture(date){
    if(Date.parse(date)-Date.parse(new Date())>0){
        return false;
    }
    return true;

}

function distanceIsNotNullAndPositive(distance){
    if(distance > 0){
        return true;
    }
    return false;
}