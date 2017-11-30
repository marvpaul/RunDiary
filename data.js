var data = null;
$(document).ready(function() {
    get_data();
});

function get_data(){
    $.ajax( {
        type: "GET",
        url: "data.php",
        data: $("form").serialize(),
        success: function( response ) {
            if(response != "") {
                data = JSON.parse(response);

            }
        }
    });
}