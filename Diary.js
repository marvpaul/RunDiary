var timeOut = null;

$(document).ready(function() {
    load_data();
    hideMess();
});

/**
 * Method to load the data via Ajax request
 * This method should be executed each time a new entry is submitted and at the beginning
 */
function load_data(){
    $.ajax( {
        type: "GET",
        url: "diary.php",
        success: function( response ) {
            $('#diary').html(response);
            $('.delete-button').click(function () {
                deleteEntry(this.id);
            });
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

function deleteEntry(date){
    $.ajax( {
        type: "POST",
        url: "delete.php",
        data: {
            'date' : date
        },
        success: function( response ) {
            if(response == "true"){
                showMess("Sucessfully deleted", false, $('#diaryMess'));

            } else{
                showMess("Sth went wrong. Network connection established?", true, $('#diaryMess'));
            }
            load_data();
        }
    });
}


/**
 * Click handler for submit a new entry
 */
$("#submit-entry").click( function() {
    let date = $('#input-date').val();
    let isDate = validate_date(date);
    let dateIsNotInFutre = true;

    let distance = $('#input-distance').val();
    let isValidDistance = !isNaN(distance) && distance != "";
    let isNotNullAndPositive = true;

    let time = $('#input-time').val();
    let validTimeFormat = isValidTimeFormat(time);
    let timeIsNullOrNegative = false;

    if(validTimeFormat){
        timeIsNullOrNegative = timeNullOrNegative(time);
    }

    if(isDate){
        dateIsNotInFutre = dateNotInFuture(date);
    }

    if(isValidDistance){
        isNotNullAndPositive = distanceIsNotNullAndPositive(distance);
    }

    let entryIsOkay = isDate && dateIsNotInFutre && isValidDistance && isNotNullAndPositive && validTimeFormat && !timeIsNullOrNegative;

    if(entryIsOkay){
        $.ajax( {
            type: "POST",
            url: "save.php",
            data: $("form").serialize(),
            success: function( response ) {
                load_data();
                showMess("Entry was submitted sucessfully.", false, $('#form-submit-mess'));
            }
        });
        return false;
    } else{
        handleSubmitErr(isDate, dateIsNotInFutre, isValidDistance, isNotNullAndPositive, validTimeFormat, timeIsNullOrNegative);
    }
} );

function timeNullOrNegative(time){
    splitted_time_vals = time.split(":");
    for(i = 0; i < splitted_time_vals.length; i++){
        if(splitted_time_vals[i] <= 0){
            return true;
        }
    }
    return false;
}

/**
 * In case there are any errors while submitting an entry, create a certain error mess
 * @param isDate true in case the entered date was valid
 * @param dateIsNotInFutre true in case the entered date is in future --> not allowed
 * @param isValidDistance true in case the entered distance is valid
 * @param isNotNullAndPositive true in case the distance is not null and positive
 * @param validTimeFormat true in case the entered time format is valid
 * @param timeIsNullOrNegative true in case the time is null or negative
 */
function handleSubmitErr(isDate, dateIsNotInFutre, isValidDistance, isNotNullAndPositive, validTimeFormat, timeIsNullOrNegative){
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
    if(!validTimeFormat){
        errMess += "The given time format is not valid <br>";
    }
    if(timeIsNullOrNegative){
        errMess += "The given time is null or negative <br>";
    }
    showMess(errMess, true, $('#form-submit-mess'));
}

/**
 * Show a certain message on the site
 * @param mess the message
 * @param err true in case the mess is an error --> The message will be red
 */
function showMess(mess, err, formMess){
    formMess.css("display", "inherit");
    if(err){
        formMess.removeClass( "alert-success" );
        formMess.addClass("alert-danger");
    } else{
        formMess.removeClass("alert-danger");
        formMess.addClass( "alert-success" );
    }
    formMess.html(mess);
    clearTimeout(timeOut);
    timeOut = setTimeout(function(){
        hideMess(formMess)
    } , 5000);
}

/**
 * Simply hides the last shown message
 */
function hideMess(mess){
    mess.css("display", "none");
}


/**
 * Simply checks if a give time has a certain format
 * @param time the entered time
 * @returns {boolean} true in case the entered date has format: format number:number:number
 */
function isValidTimeFormat(time){
    let reg = /^[-]?[0-9]*:[-]?[0-9]*:[-]?[0-9]*$/;
    if(time.match(reg)){
        splitted_time_vals = time.split(":");
        for(i = 0; i < splitted_time_vals.length; i++){
            if(isNaN(splitted_time_vals[i])){
                return false;
            }
        }
        return true;
    }
    return false;
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