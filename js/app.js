'use strict';

function Horns(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
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
    })
}

$(() => Horns.readJSON());
