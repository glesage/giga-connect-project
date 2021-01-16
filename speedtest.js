/**
 * This file is responsible for doing a speedtest
 * It times the download of a file of known size
 */
var imageAddr = "https://s3-eu-west-1.amazonaws.com/application.impala.in/icons-aafde3dc500816692827cc866514fbbc/firefox_app_512x512.png";
var startTime, endTime;
var downloadSize = 41500; // 41.5 KB
var download = new Image();
var roundedDecimals = 2;
var bytesInAKilobyte = 1024;

// Once download is done, parse the time difference and calculate internet speed
function showInternetResults() {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(roundedDecimals);
    var displaySpeed = speed(speedBps);
    var results = "<h3>Your connection speed is: " + displaySpeed.value + " " + displaySpeed.units + "</h3>"

    $('#internettestresults').fadeOut('fast', function() {
        $('#internettestresults').html(results);
        $('#internettestresults').fadeIn('fast', function() {
            $('#internettest').text('Test internet again');
            $('#internettest').removeAttr('disabled', 'disabled');
        });
    });
}

// Format download speed depending on value (B/s, KB/s, MB/s)
function speed(bitsPerSecond) {
    var KBps = (bitsPerSecond / bytesInAKilobyte).toFixed(roundedDecimals);
    if (KBps <= 1) return { value: bitsPerSecond, units: "Bps" };
    var MBps = (KBps / bytesInAKilobyte).toFixed(roundedDecimals);
    if (MBps <= 1) return { value: KBps, units: "KBps" };
    else return { value: MBps, units: "MBps" };
}

$('#internettest').on('click', function() {
    $('#internettest').html('<i class="fa fa-spinner fa-spin"></i> testing...');
    $('#internettest').attr('disabled', 'disabled');

    download.onload = function() {
        endTime = (new Date()).getTime();
        showInternetResults();
    }
    startTime = (new Date()).getTime();
    download.src = imageAddr + "?n=" + Math.random();
});