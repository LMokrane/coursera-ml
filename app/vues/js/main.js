function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

window.onload = function() {
  var chiffre = getRandomInt(0, 9);
  var digit = mnist[chiffre].get();
  var recherche = {
    chiffre: chiffre,
    matrice: digit
  };
  console.log(recherche);
  var context = document.getElementById('myCanvas').getContext('2d');
  mnist.draw(digit, context);
};
