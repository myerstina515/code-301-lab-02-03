'use strict';
console.log('test');

var pageSelect = 'page-1.json';
// var keywordArray = [];
// var convertedObjectHoldingArray = [];

// function Horns(animal) {
//   this.image_url = animal.image_url;
//   this.title = animal.title;
//   this.description = animal.description;
//   this.keyword = animal.keyword;
//   this.horns = animal.horns;
//   keywordArray.push(this.keyword);
//   convertedObjectHoldingArray.push(this);
// }

function Horns(animal) {
  for (let key in animal) {
    this[key] = animal[key];
  }
}

Horns.prototype.toHTML = function () {
  console.log(this);
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}

// Horns.prototype.render = function () {
//   let $animalClone = $(`<section class="${this.keyword}"></section>`);
//   $animalClone.html($('.photo-template').html());
//   $('main').append($animalClone);
//   $animalClone.find('h2').text(this.title);
//   $animalClone.find('img').attr('src', this.image_url);
//   $animalClone.find('p').text(this.description);
//   $animalClone.find('img').attr('alt', this.keyword);
//   $animalClone.find('h5').text(`Number of horns: ${this.horns}`);

//   $animalClone.removeClass('photo-template');
// }

Horns.readJSON = () => {
  // console.log('test');
  Horns.all = [];
  const ajaxSettings = { method: 'get', dataType: 'json' }
  $.ajax(`${pageSelect}`, ajaxSettings)
    .then(hornsDB => {
      hornsDB.forEach(item => {
        // let hornedAnimal = new Horns(item);
        // hornedAnimal.render();
        Horns.all.push(new Horns(item));
      })
      dropdownKeywordPopulation(Horns.all);
      Horns.all.forEach(object => {
        console.log(object);
        $('.container').append(object.toHTML());
      })
    })
  // console.log(Horns.all);
  // Horns.all.forEach(object => {
  //   console.log(object);
  //   $('.container').append(object.toHTML);
  // })
  // console.log(Horns.all);
}

$(() => Horns.readJSON());

// feature 2
// We need a dynamically updating dropdown menu (jQuery function)
function dropdownKeywordPopulation(array) {
  $('option').not(':first').remove();
  let dropdownArray = [];
  array.forEach((value) => {
    if (!dropdownArray.includes(value.keyword)) {
      dropdownArray.push(value.keyword);
    }
  })
  dropdownArray.forEach((value) => {
    $('select').append(`<option value=${value}>${value}</option>`);
  })
}

$('select').on('change', function () {
  let keywordSelect = $(this).find(':selected').attr('value');
  $('div').hide();
  $(`.${keywordSelect}`).show();
})


$('#pageList').click(function (event) {
  $('div').hide();
  pageSelect = event.target.id;
  Horns.readJSON()
    .then(() => {
      $('div').show();
    });
})

console.log('test');
