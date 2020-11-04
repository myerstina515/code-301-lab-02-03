'use strict';

var keywordArray = [];

function Horns(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  keywordArray.push(this.keyword);
}

Horns.prototype.render = function () {
  let $animalClone = $('<section></section>')
  $animalClone.html($('.photo-template').html());
  $('main').append($animalClone);
  $animalClone.find('h2').text(this.title);
  $animalClone.find('img').attr('src', this.image_url);
  $animalClone.find('p').text(this.description);
  $animalClone.find('img').attr('alt', this.keyword);
  $animalClone.find('h5').text(`Number of horns: ${this.horns}`);

  $animalClone.removeClass('photo-template');
}

Horns.readJSON = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' }
  $.ajax('page-1.json', ajaxSettings)
    .then(hornsDB => {
      hornsDB.forEach(item => {
        let hornedAnimal = new Horns(item);
        hornedAnimal.render();
      })
      dropdownKeywordPopulation(keywordArray);
    })
}

$(() => Horns.readJSON());

// feature 2
$('select').on('change', function(){
  let keywordSelect=$(this).find(':selected').attr('value');
})
// We need a dynamically updating dropdown menu (jQuery function)
function dropdownKeywordPopulation(array) {
  let dropdownArray = [];
  array.forEach((value, i) => {
    if(i === array.indexOf(value)){
      dropdownArray.push(value);
    }
  })
  dropdownArray.forEach((value, i) => {
    $('select').append(`<option value=${value}>${value}</option>`);
  })
}



// It needs to populate with all the different keyword values in the json file.


// When the user selects one of the keyword values, the javascript will call all objects in the database that match. Everything will be hidden, then only show selected keyword value
