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
		      .attr("width", 600)
		      .attr("height",h)
		      .attr("id", "svgVisualizacion");

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


    var datosParticipacion = [
	[
	    "Ndiputados", +objetoComunidadActiva["NDiputados"]
	],
	[
	    
	    "Vcontabili", +objetoComunidadActiva["Vcontabili"]
	],
	[
	    "VAbstencio", +objetoComunidadActiva["VAbstencio"]
	],
	[
	    "VNulos", +objetoComunidadActiva["VNulos"]
	],
	[
	    "VBlanco", +objetoComunidadActiva["VBlanco"]
	]
    ];

    var votosPartidos = [
	[
	    "AJU", +objetoComunidadActiva["AJU"]
	],
	[
	    "AVANT", +objetoComunidadActiva["AVANT"]
	],
	[
	    "Coalición Canaria", +objetoComunidadActiva["CCaPNC"]
	],
	[
	    "CCD", +objetoComunidadActiva["CCD"]
	],
	[
	    "CENTROMODE", +objetoComunidadActiva["CENTROMODE"]
	],
	[
	    "CILUS", +objetoComunidadActiva["CILUS"]
	],
	[
	    "CRA", +objetoComunidadActiva["CRA"]
	],
	[
	    "Cs", +objetoComunidadActiva["Cs"]
	],
	[
	    "DL", +objetoComunidadActiva["DL"]
	],
	[
	    "DN", +objetoComunidadActiva["DN"]
	],
	[
	    "EB", +objetoComunidadActiva["EB"]
	],
	[
	    "EHBildu", +objetoComunidadActiva["EHBildu"]
	],
	[
	    "ELPI", +objetoComunidadActiva["ELPI"]
	],
	[
	    "ENPOSITIU", +objetoComunidadActiva["ENPOSITIU"]
	],
	[
	    "ERCCATSI", +objetoComunidadActiva["ERCCATSI"]
	],
	[
	    "EUEX", +objetoComunidadActiva["EUEX"]
	],
	[
	    "EZKERRA", +objetoComunidadActiva["EZKERRA"]
	],
	[
	    "FDEE", +objetoComunidadActiva["FDEE"]
	],
	[
	    "FEdelasJON", +objetoComunidadActiva["FEdelasJON"]
	],
	[
	    "GBAI", +objetoComunidadActiva["GBAI"]
	],
	[
	    "IFem", +objetoComunidadActiva["IFem"]
	],
	[
	    "Independie", +objetoComunidadActiva["Independie"]
	],
	[
	    "LIBERTATEN", +objetoComunidadActiva["LIBERTATEN"]
	],
	[
	    "Ln", +objetoComunidadActiva["Ln"]
	],
	[
	    "MAS", +objetoComunidadActiva["MAS"]
	],
	[
	    "MES", +objetoComunidadActiva["MES"]
	],
	[
	    "mlgXSI", +objetoComunidadActiva["mlgXSI"]
	],
	[
	    "NOS", +objetoComunidadActiva["NOS"]
	],
	[
	    "OE", +objetoComunidadActiva["OE"]
	],
	[
	    "PACMA", +objetoComunidadActiva["PACMA"]
	],
	[
	    "PAISVALENC", +objetoComunidadActiva["PAISVALENC"]
	],
	[
	    "PARTICIPAC", +objetoComunidadActiva["PARTICIPAC"]
	],
	[
	    "PCOE", +objetoComunidadActiva["PCOE"]
	],
	[
	    "PCPE", +objetoComunidadActiva["PCPE"]
	],
	[
	    "PFyV", +objetoComunidadActiva["PFyV"]
	],
	[
	    "PH", +objetoComunidadActiva["PH"]
	],
	[
	    "PLD", +objetoComunidadActiva["PLD"]
	],
	[
	    "PLIB", +objetoComunidadActiva["PLIB"]
	],
	[
	    "PNV", +objetoComunidadActiva["PNV"]
	],
	[
	    "PODEMOS", +objetoComunidadActiva["PODEMOS"]
	],
	[
	    "PP", +objetoComunidadActiva["PP"]
	],
	[
	    "PREPAL", +objetoComunidadActiva["PREPAL"]
	],
	[
	    "PSOE", +objetoComunidadActiva["PSOE"]
	],
	[
	    "PT", +objetoComunidadActiva["PT"]
	],
	[
	    "PUMMJ", +objetoComunidadActiva["PUMMJ"]
	],
	[
	    "RECORTESCE", +objetoComunidadActiva["RECORTESCE"]
	],
	[
	    "SAIn", +objetoComunidadActiva["SAIn"]
	],
	[
	    "SOLUCIONA", +objetoComunidadActiva["SOLUCIONA"]
	],
	[
	    "SOMVAL", +objetoComunidadActiva["SOMVAL"]
	],
	[
	    "UDPYAR", +objetoComunidadActiva["UDPYAR"]
	],
	[
	    "UPeC", +objetoComunidadActiva["UPeC"]
	],
	[
	    "uniocat", +objetoComunidadActiva["uniocat"]
	],
	[
	    "UPYD", +objetoComunidadActiva["UPYD"]
	],
	[
	    "VOX", +objetoComunidadActiva["VOX"]
	],
	[
	    "XLAIZQLV", +objetoComunidadActiva["XLAIZQLV"]
	]
    ];

    // Solo queremos los partidos con votos en la región
    var votosOrdenados  = votosPartidos
	.sort(function(a, b) {
	    return b[1] - a[1];
	})
	.filter(function(el) {
	    return el[1] != 0;
	}
	);
    console.log(votosOrdenados);

    // Los ordenamos 
    var votosTotales = 0;
    for(var i = 0; i < votosOrdenados.length; i++) {
	votosTotales = votosTotales + votosOrdenados[i][1];
    }
    console.log("Votos totales: " + votosTotales);

    // Solo tendrán escaño los partidos con más de un 3% de votos
    var umbral3pc = votosTotales * 0.03;
    console.log("Umbral: " + umbral3pc);

    // Borramos todo
    d3.select("#encabezado").remove();
    d3.select("#graficoBarras").remove();

    // La visualización y el encabezado son <g>rupos de elementos
    var encabezado = visualizacion
	.append("g")
	.attr("id", "encabezado")


    // Pintamos cosméticamente en un gris muy pálido los bordes
    // para la composición
    encabezado.append("rect")
	.attr("width", w * 2/3 - 50 )
    	.attr("height", 75)
    	.attr("x", 25)
    	.attr("y", 25)
	.style("fill", "white");

    // Creamos los separadores
    encabezado.append("svg:line")
    	.attr("x1", (w * 2/3) - 225)
    	.attr("y1", 25)
    	.attr("x2", (w * 2/3) - 225)
    	.attr("y2", 100)
	.style("stroke", "black")
	.style("stroke-width", "2px");

    encabezado.append("svg:line")
    	.attr("x1", (w * 2/3) - 125)
    	.attr("y1", 25)
    	.attr("x2", (w * 2/3) - 125)
    	.attr("y2", 100)
	.style("stroke", "black")
	.style("stroke-width", "2px");

    encabezado.append("svg:line")
    	.attr("x1", (w * 2/3) - 25)
    	.attr("y1", 25)
    	.attr("x2", (w * 2/3) - 25)
    	.attr("y2", 100)
	.style("stroke", "black")
	.style("stroke-width", "2px");


    // Cargamos el nombre de la region
    encabezado.append("text")
	.text(regionActiva)
    	.attr("x", 25)
    	.attr("y", 50)
	.attr("font-weight", "bold")
	.attr("font-family", "sans-serif")
        .attr("font-size", "25px");


    console.log(datosParticipacion);

    // Votos en blanco
    encabezado.append("text")
	.text(datosParticipacion[3][1])
	.attr("text-anchor", "middle")
    	.attr("x", (w * 2/3) - 75)
    	.attr("y", 75)
	.attr("font-weight", "bold")
	.attr("font-family", "sans-serif")
        .attr("font-size", "18px");

   // Votos en blanco
    encabezado.append("text")
	.text("EN BLANCO")
	.attr("text-anchor", "middle")
    	.attr("x", (w * 2/3) - 75)
    	.attr("y", 50)
	.attr("font-weight", "bold")
	.attr("font-family", "sans-serif")
        .attr("font-size", "10px");
 
    
    var graficoBarras = visualizacion
	.append("g")
	.attr("id", "graficoBarras")

    graficoBarras.append("rect")
	.attr("width", w * 2/3 - 50 )
    	.attr("height", h - 150)
    	.attr("x", 25)
    	.attr("y", 125)
    	.style("fill", "white");

    graficoBarras.selectAll("rect")
	.data(votosPartidos)
	.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("x", 0)
    	.attr("y", 0)
    	.attr("width", 20)
    	.attr("height", 20)

}

pintaDivVisualizacion()
