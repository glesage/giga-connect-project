/**
 * This file is responsible for fetching the browser geolocation
 */
function locationSuccess(location) {
    var latitude = location.coords.latitude.toFixed(7);
    var longitude = location.coords.longitude.toFixed(7);
    var accuracy = location.coords.accuracy;

    showLocationResults({ latitude: latitude, longitude: longitude, accuracy: accuracy })
}

function locationError(err) {
    var errorMessage = "<h3>Sorry, geolocation could not be found: " + err.message + "</h3>";
    if (err.code === 1) {
        errorMessage = "<h3>In order for us to know where the school is located, you must allow location tracking on your browser</h3>";
    }

    showLocationResults({ error: errorMessage });
}

function showLocationResults(data) {
    var message = data.error;

    if (!data.error || data.error.length < 1) {
        message = "<h3>Latitude: " + data.latitude + "</h3>";
        message += "<h3>Longitude: " + data.longitude + "</h3>";
        message += "<h3>Accuracy: " + data.accuracy + " meters</h3>";
    }

    $('#locationresults').fadeOut('fast', function() {
        $('#locationresults').html(message);
        $('#locationresults').fadeIn('fast', function() {
            $('#recordlocation').text('Record location again');
            $('#recordlocation').removeAttr('enabled', 'enabled');
        });
    });
}

$('#recordlocation').on('click', function() {
    $('#recordlocation').html('<i class="fa fa-spinner fa-spin"></i> geolocating...');
    $('#recordlocation').attr('disabled', 'disabled');

    if ("geolocation" in navigator) {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, options);
    } else alert('Sorry, geolocation is not available on this device');
});