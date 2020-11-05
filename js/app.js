'use strict';
console.log('test');

var pageSelect = 'page-1.json';
var keywordArray = [];
var convertedObjectHoldingArray = [];

function Horns(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  keywordArray.push(this.keyword);
  convertedObjectHoldingArray.push(this);
}

// function Horns(animal) {
//   for (let key in animal) {
//     this[key] = animal[key];
//   }
// }

// Horns.prototype.toHTML = function () {
//   let template = $('#photo-template').html();
//   let html = Mustache.render(template, this);
//   return html;
// }

Horns.prototype.render = function () {
  let $animalClone = $(`<section class="${this.keyword}"></section>`);
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
  console.log('test');
  const ajaxSettings = { method: 'get', dataType: 'json' }
  $.ajax(`${pageSelect}`, ajaxSettings)
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
// We need a dynamically updating dropdown menu (jQuery function)
function dropdownKeywordPopulation(array) {
  console.log(array);
  let dropdownArray = [];
  array.forEach((value, i) => {
    if (i === array.indexOf(value)) {
      dropdownArray.push(value);
    }
  })
  dropdownArray.forEach((value) => {
    $('select').append(`<option value=${value}>${value}</option>`);
  })
}

$('select').on('change', function () {
  let keywordSelect = $(this).find(':selected').attr('value');
  $('section').hide();
  $(`.${keywordSelect}`).show();
})


$('#pageList').click(function (event) {
  $('section').hide();
  pageSelect = event.target.id;
  Horns.readJSON()
    .then(() => {
      $('section').show();
    });
})

console.log('test');
