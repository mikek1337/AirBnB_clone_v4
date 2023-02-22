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
});
