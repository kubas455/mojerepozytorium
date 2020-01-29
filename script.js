   
    /*document.getElementById("satellite").addEventListener('click',
    function (){
        mapContainer.map=map1;
    })
    document.getElementById("topo").addEventListener('click',
    function (){
        mapContainer.map=map2;
    })
    document.getElementById("osm").addEventListener('click',
    function (){
        mapContainer.map=map3;
    });*/
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapToggle",
         "esri/widgets/BasemapGallery",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch",
        "esri/layers/FeatureLayer"
      ], function(Map, MapView,BasemapToggle, BasemapGallery, GraphicsLayer,Sketch,FeatureLayer) {
     
         let map1 = new Map({basemap:"satellite"}); //słowo klucz new + nazwa modułu
    let map2 = new Map({basemap:"topo"});
    let map3 = new Map({basemap:"osm"});
         var map = new Map({
             basemap: "topo-vector"
           });
        let mapContainer = new MapView({
        container: "mapa",  // miejsce gdzie chcemy osadzić mapę (bierzemy klasę z pliku html //
        map: map1,  //czyli nasza zmienna z mapą bazową zdefiniowana wcześniej //
        
    
    });
           var view = new MapView({
             container: "mapa",
             map: map,
             center: [21.80543,51.02700],
             zoom: 8
           });
        
            var basemapToggle = new BasemapToggle({
                view: view,
                nextBasemap: "satellite"
            });
        
           view.ui.add(basemapToggle, "bottom-right");
            var basemapGallery = new BasemapGallery({
                view: view,
                source: {
                portal: {
                    url: "https://www.arcgis.com",
                    useVectorBasemaps: true  // Load vector tile basemaps
                }
             }
         });
          view.ui.add(basemapGallery, "top-right");
         var basemapGallery = new BasemapGallery({
             view: view,
             source: {
               portal: {
                 url: "https://www.arcgis.com",
                 //*** ADD ***//*/
                 useVectorBasemaps: false  // Load raster tile basemaps
               }
             }
         });
        
         var graphicsLayer = new GraphicsLayer();
     
         var sketch = new Sketch({
             view: view,
             layer: graphicsLayer
         });
     
         view.ui.add(sketch, "top-right");
             var stroke = {
                 color: [255,0,0],
                 width: 1
                 }
         var fillColor = [255,255,255,.5];
         
         var pointSymbol = sketch.viewModel.pointSymbol;
         pointSymbol.color = fillColor;
         pointSymbol.outline = stroke;
         pointSymbol.size = 8;
         
         var polylineSymbol = sketch.viewModel.polylineSymbol;
         polylineSymbol.color = stroke.color;
         polylineSymbol.width = stroke.width;
         
         var polygonSymbol = sketch.viewModel.polygonSymbol;
         polygonSymbol.color = fillColor;
         polygonSymbol.outline = stroke;
         sketch.on("create", function(event) {
             if (event.state === "complete") {
                 var attributes = {
                     name: "My Graphic",
                     type: event.graphic.geometry.type
                 }
                 event.graphic.attributes = attributes;
     
                 var popupTemplate = {
                     title: "{name}",
                     content: "I am a {type}."
                 }
                 event.graphic.popupTemplate = popupTemplate;
             }
         });
     
        var trailheadsLayer = new FeatureLayer({
             url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
         });
     
         map.add(trailheadsLayer);
           
           // Trails feature layer (lines)
         var trailsLayer = new FeatureLayer({
             url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
         });
     
         map.add(trailsLayer, 0);
     
           // Parks and open spaces (polygons)
         var parksLayer = new FeatureLayer({
             url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/USA%20States/FeatureServer/0"
         });
     
         map.add(parksLayer, 0);
        }); 