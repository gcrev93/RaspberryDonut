// Initial values to be overwritten by incoming Azure data
var dial1scalar = 30;
var dial2scalar = 1;
var tempdial = 75;
var lightscalar = 1;

var canvasheight = 500;
var canvaswidth = 500;
var torus_r = 20;
var torus_g = 150;
var torus_b = 210;
var ypos = canvasheight / 2;
var socket = io();

// Setup canvas (p5.js)
function setup() {
    createCanvas(canvaswidth, canvasheight, WEBGL);
    img = loadImage("https://raw.githubusercontent.com/hxlnt/Resources/master/donut2.jpg");
}

// Draw donut
function draw() {
    ambientLight(lightscalar - lightscalar / 4);
    directionalLight(220, 220, 220, 0.5, 0.25, 0.5);
    texture(img);
    rotateY(dial1scalar * ypos / 200);
    ypos = ypos - 1 * (dial1scalar);
    translate(0, ypos);
    scale(dial2scalar);
    torus(95, 65, 90, 90);
    if (ypos <= -700 * dial2scalar) {
        ypos = canvasheight - 100;
    }
}

$(function () {

    canvasheight = $('body').height();
    canvaswidth = $('html').width();

    $("html").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        // Randomized values for testing purposes. Eventually meant to tie into Pi data.
        lightscalar = Math.floor(Math.random() * 255 + .1);
        dial2scalar = Math.floor(Math.random() * 4 + .1);
        dial1scalar = Math.floor(Math.random() * 18);
    });
});

// Some values are modulated with hard-coded numbers for testing purposes--not ideal but hey.
socket.on('RGB', function (response) { lightscalar = response + 150; });
socket.on('Temperature', function (response) { dial2scalar = response / 100; });
socket.on('Potentiometer', function (response) { dial1scalar = response; });