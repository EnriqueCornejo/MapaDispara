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
	    console.log("Región Activa: " + regionActiva);
	    console.log("Datos: ");
	    console.log(feature.properties)
	    pintaDivVisualizacion();
	});
})

// d3.json("recursos/provinciasDatos.js", function(error, provincias) {
//     if (error) return console.error(error);
//     // Y le añadimos las features
//     mapa.selectAll("path")
// 	.data(provincias.features)
// 	.enter()
// 	.append("svg:path")
// 	.attr("class", "provincia")
// 	.attr("id", function(feature) {return feature.properties.nombre.replace(/\s/g,'');})
// 	.attr("d", path)
// 	.style("fill", "white")
//     // Sin fill no deja seleccionar
// 	.on("click", function(feature) {
// 	    regionActiva = feature.properties.nombre;
// 	    console.log("Región Activa: " + regionActiva);
// 	});
// })



// Click en comunidades


// Y un borde
var borderPath = mapa.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h)
    .attr("width", w)
    .style("stroke", "#000")
    .style("fill", "000")
    .style("opacity", 0.0)
    .style("stroke-width", "1px")
    .on("click", function() {
	regionActiva = "España";
	pintaDivVisualizacion();
    });



pintaDivVisualizacion = function() {
    d3.select("#visualizacion")
	.html("")
	.append("div")
	.attr("id", "vis")
	.html(
	    "<div id='region'>" + regionActiva + "</div>" +
	    	"<div id='id'>" + regionActiva.replace(/\s/g,'') + "</div>" +
		"<div id='datos'><table>" +
			"</table>"
	);
    
    // Redibujamos las regiones de blanco, pintamos la seleccionada de rojo
    mapa.selectAll("path").style("fill", "white");
    d3.select("#" + regionActiva.replace(/\s/g,''))
	.style("fill", "red")
}

pintaDivVisualizacion()
