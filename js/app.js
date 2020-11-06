'use strict';

var pageSelect = 'page-1.json';

function Horns(animal) {
  for (let key in animal) {
    this[key] = animal[key];
  }
}

Horns.prototype.toHTML = function () {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}

Horns.readJSON = () => {
  Horns.all = [];
  const ajaxSettings = { method: 'get', dataType: 'json' }
  $.ajax(`${pageSelect}`, ajaxSettings)
    .then(hornsDB => {
      hornsDB.forEach(item => {
        Horns.all.push(new Horns(item));
      })
      dropdownKeywordPopulation(Horns.all);
      Horns.all.forEach(object => {
        $('.container').append(object.toHTML());
      })
    })
}

// find each gallery parent
// search gallery for Name text
// galleryParent.sort((a,b) => {
// where a and b are h2 child elements with name text
// resort gallery parents alphabetically based on h2 children
// some kind of jquery thing to reorganize the gallery parents

function alphabeticalSort() {
  // let titleList = $('h2').text();
  // Array.from(titleList);
  // console.log(titleList);
  // titleList.sort((a, b) => {
  //   if (a[0] < b[0]) {
  //     return -1
  //   } else {
  //     return 1
  //   }
  // })
  // return titleList;
  console.log('ALPHABETICAL SORT');
}

function hornNumberSort() {
  console.log('HORN NUMBER SORT');
}

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

function selectSort(event) {
  event.preventDefault();
  let sortOptions = [alphabeticalSort(), hornNumberSort()]
  sortOptions[event.target.select.value];
  // console.log('test check: ' + $(`${event.target.select}`));
  console.log('test check: ' + $(event.target.select));
}

$(() => Horns.readJSON());
$('.sortSelector').click(selectSort);


// if (!event.target.select)

// $(document).ready(function () {
//   $('input[type=radio]').change(function () {
//     alert($(this).val()); // or this.value
//   });
// });