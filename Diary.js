var data = null;
$(document).ready(function() {
    load_data();
});

function load_data(){
    $.ajax( {
        type: "GET",
        url: "diary.php",
        success: function( response ) {
            $('#diary-tab').html(response);
        }
    });

    $.ajax( {
        type: "GET",
        url: "overview.php",
        success: function( response ) {
            $('#overview-tab').html(response);
        }
    });
}