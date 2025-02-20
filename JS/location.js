
    function getLocation() {
      const locationButton = document.getElementById("get-location");
      const locationDetails = document.getElementById("location-details");

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchLocationDetails(latitude, longitude, locationButton);
          },
          (error) => {
            console.error("Error getting location:", error.message);
            locationDetails.textContent = "Error getting location";
          }
        );
      } else {
        locationDetails.textContent = "Geolocation is not supported";
      }
    }

    function fetchLocationDetails(latitude, longitude, locationButton) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
          const state = data.address.state || data.address.county;
          if (city && state) {
            locationButton.textContent = ` ${city} ${state}`;
          } else {
            locationButton.textContent = "City or State information not available";
          }
        })
        .catch(error => {
          console.error("Error fetching location details:", error);
          locationButton.textContent = "Error fetching location details";
        });
    }
