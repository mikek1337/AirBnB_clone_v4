$(document).ready(() => {
  const amenitiesId = [];
  const amenitiesName = [];
  $('.amenities li input').on('change', function () {
    if (this.checked) {
      amenitiesId.push($(this).parent().attr('data-id'));
      amenitiesName.push($(this).parent().attr('data-name'));
    } else {
      amenitiesId.splice(amenitiesId.indexOf($(this).parent().attr('data-id')));
      amenitiesName.splice(amenitiesName.indexOf($(this).parent().attr('data-name')));
    }
    const amenitiesList = amenitiesName.join(',');
    $('.amenities h4').text(amenitiesList);
  });
  const res = $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status',
    method: 'GET',
    dataType: 'json',
    async: false
  }).responseJSON;
  if (res.status === 'OK') { $('#api_status').addClass('available'); } else { $('#api_status').removeClass('available'); }

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: JSON.stringify({}),
    dataType: 'json',
    async: false,
    success: (places) => {
      for (const place of places) {
        const articles = [
          '<article>',
          '<div class="title_box">',
        `<h2>${place.name}</h2>`,
        `<div class="price_by_night">$${place.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${place.description}`,
        '</div>',
        '</article>'
        ];
        $('places').append(articles.join(''));
      }
    }

  });

  function searchPlace () {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      data: JSON.stringify({ amenities: amenitiesId }),
      dataType: 'json',
      async: false,
      success: (places) => {
        for (const place of places) {
          const articles = [
            '<article>',
            '<div class="title_box">',
        `<h2>${place.name}</h2>`,
        `<div class="price_by_night">$${place.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${place.description}`,
        '</div>',
        '</article>'
          ];
          $('places').append(articles.join(''));
        }
      }

    });
  }
});
