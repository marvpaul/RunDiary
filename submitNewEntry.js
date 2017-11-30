$("#submit-entry").click( function() {
    $.ajax( {
        type: "POST",
        url: "save.php",
        data: $("form").serialize(),
        success: function( response ) {
            load_data();
        }
    });
    return false;
} );