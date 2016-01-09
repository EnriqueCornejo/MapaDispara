// MAPA


// Tamaño del svg
var w = 800;
var h = 600;

// Creamos el mapa, un elemento svg
var mapa = d3.select("#mapa").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

// Puede haber una comunidad activa o ser "total"
var regionActiva = "España";

// Proyección, posiciónn y rango
var projection = d3.geo.mercator()
    .scale(2600)
    .translate([w/2 - 315, h/2 +1775]);

// Creamos el path
var path = d3.geo.path().projection(projection);

// Cargamos la capa de comunidades

var objetoComunidadActiva = {};
d3.json("recursos/comunidadesDatos.js", function(error, comunidades) {
    if (error) return console.error(error);
    // Y le añadimos las features
    mapa.selectAll("path")
	.data(comunidades.features)
	.enter()
	.append("svg:path")
	.attr("class", "comunidad")
	.attr("id", function(feature) {return feature.properties.nombre.replace(/\s/g,'');})
	.attr("d", path)
	.style("fill", "white") // Sin fill no deja seleccionar
	.on("click", function(feature) {
	    regionActiva = feature.properties.nombre;
	    objetoComunidadActiva = feature.properties;
	    console.log("Datos activos: "); 
	    console.log(objetoComunidadActiva)
	    pintaDivVisualizacion();
	});
})



// FONDO MAPA
var fondo = mapa.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .attr("width", w)
    .style("stroke", "#000")
    .style("fill", "000")
    .style("opacity", 0.05)
    .style("stroke-width", "3px")
    .on("click", function() {
	regionActiva = "España";
	pintaDivVisualizacion();
    });
// FONDO


var visualizacion = d3.select("#visualizacion")
    .append("svg")
    .attr("width", w * 2/3)
    .attr("height",h);

var fondo2 = visualizacion
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .attr("width", w * 2/3)
    .style("fill", "000")
    .style("opacity", 0.05)
    .style("stroke-width", "3px");

visGeneral = function() {
    console.log("VISUALIZACION PARA TODA ESPAÑA");
}



pintaDivVisualizacion = function() {
    // Redibujamos las regiones de blanco, pintamos la seleccionada de rojo
    mapa.selectAll("path").style("fill", "white");
    d3.select("#" + regionActiva.replace(/\s/g,''))
	.style("fill", "red");

    if (regionActiva == "España"){
	visGeneral();
	return;
    }


    var votosPartidos = [
	[
	    "AJU", objetoComunidadActiva["AJU"]
	],[
	    "AVANT", objetoComunidadActiva["AVANT"]
	],[
	    "CCD", objetoComunidadActiva["CCD"]
	]
    ];

    console.log(votosPartidos);
}

pintaDivVisualizacion()
