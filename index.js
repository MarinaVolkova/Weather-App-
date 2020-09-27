window.addEventListener('load', () => {
  let longitude; // долгота
  let latitude; //широта
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  if (navigator.geolocation) { // если есть доступ к геолокации
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`;
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.innerHTML = ((temperature - 32) * 5 / 9).toFixed();
          temperatureDescription.innerHTML = summary;
          locationTimezone.innerHTML = data.timezone;
          setIcons(icon, document.querySelector('.icon'));
        });
    });

  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});