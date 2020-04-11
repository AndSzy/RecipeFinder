
//  Recipes from local JSON file
let recipes = JSON.parse(recipesJSON);

// Select dropdown menus (choosing products that are in the kitchen)
const productOne = document.getElementById('product-one');
const productTwo = document.getElementById('product-two');
const productThree = document.getElementById('product-three');
const productFour = document.getElementById('product-four');

// START HERE (filter() is called at the end of file)//

// Takes: Recipes array + (productOne-ProductFour)values --> iterate (temporary(filtered recipes array))
function filter () {
  let productOne_value = productOne.value;
  let productTwo_value = productTwo.value;
  let productThree_value = productThree.value;
  let productFour_value = productFour.value;

  let temporary = recipes;

  if (productOne_value == undefined || productOne_value == "-") {

  } else {
    temporary = temporary.filter(function(element) {
      return element.ingredients.includes(productOne_value);
    })
  }

  if (productTwo_value == undefined || productTwo_value == "-") {

  } else {
    temporary = temporary.filter(function(element) {
      return element.ingredients.includes(productTwo_value);
    })
  }

  if (productThree_value == undefined || productThree_value == "-") {

  } else {
    temporary = temporary.filter(function(element) {
      return element.ingredients.includes(productThree_value);
    })
  }

  if (productFour_value == undefined || productFour_value == "-") {

  } else {
    temporary = temporary.filter(function(element) {
      return element.ingredients.includes(productFour_value);
    })
  }

  iterate(temporary);
}

// Takes: filtered recipes array --> apply (array single element)
function iterate (array) {
  let recipesList = document.querySelector('#recipesList');
  recipesList.innerHTML = "";
  for (let i=0; i<array.length; i++) {
    apply(array[i])
  }
}


// Takes: single element of filtered array --> __change the DOM
function apply(array) {
  let recipesList = document.querySelector('#recipesList');
  let recipeItem = document.querySelector('.recipeItem');
  let newNode = recipeItem.cloneNode(true);

  recipesList.appendChild(newNode);

  newNode.classList.remove('d-none');

  let itemsToModify = newNode.querySelectorAll('.modify');

  itemsToModify[0].src = array.photo;
  itemsToModify[1].textContent = array.name;
  itemsToModify[2].textContent = array.ingredients;
  itemsToModify[3].href = array.link;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Buttons that show the modal
let printBtns = document.querySelectorAll('.btn-print');

// Called when the page is loaded and after the change (new data from dropdown menus)
// Takes: list of items from parentNode --> openModal(array of items)
function showShoppingList () {
  printBtns = document.querySelectorAll('.btn-print');
  printBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      let list = this.parentNode.querySelector('.list-print').innerHTML;
      openModal(list.split(','));
    })
  })
}

// Takes: array of items to print --> __change the DOM of modal + show the modal
function openModal(list) {
  let modalList = document.querySelector('#modalList');
  modalList.innerHTML = "";

  for(let i=0; i< list.length; i++) {
    let listItem = document.createElement('li');
    listItem.innerHTML = list[i];
    modalList.appendChild(listItem);
  }
  // opens the modal
  $('#printModal').modal('toggle')
}


// Takes: call from html #printModalButton --> prints the modal (with custom CSS)
function printModal () {
  window.print()
}

/////  EVENT LISTENERS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// When page is loaded --> showShoppingList()
window.addEventListener('load', function() {
  showShoppingList();
})

// Document after change --> showShoppingList() + activate Bootstrap tooltips ("Click to print shopping list.")
document.addEventListener('change', function() {
  showShoppingList();
  // Tooltips initializations
  $('[data-toggle="tooltip"]').tooltip();
})


// products that are used to filtering (dropdown menu of products in the kitchen)
let products = document.querySelectorAll('.product');

// Change in (productOne-productFour).value --> filter()
products.forEach(function(product) {
  product.addEventListener('change', function() {
    filter();
  });
});

// First Call
filter();
