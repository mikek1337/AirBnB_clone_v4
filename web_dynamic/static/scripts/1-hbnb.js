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
});
