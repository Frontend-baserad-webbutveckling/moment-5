document.addEventListener('DOMContentLoaded', function() {
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
        var marker = new google.maps.Marker({
            position: {lat: -34.397, lng: 150.644},
            map: map
        });

        let geocoder = new google.maps.Geocoder();

        document.getElementById('plats').addEventListener('input', function(e) {
            const location = e.target.value;
            if (location.length > 2) {
                geocoder.geocode({'address': location}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        let lat = results[0].geometry.location.lat();
                        let lng = results[0].geometry.location.lng();
                        map.setCenter(new google.maps.LatLng(lat, lng));
                        marker.setPosition(new google.maps.LatLng(lat, lng));
                    } else {
                        console.error('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        });
    }

    window.onload = function() {
        initMap();
    }
});