require(["esri/Map", "esri/views/MapView"],
function(Map, MapView){
    let map1 = new Map({basemap:"satellite"}); //słowo klucz new + nazwa modułu
    let map2 = new Map({basemap:"topo"});
    let map3 = new Map({basemap:"osm"});
    let mapContainer = new MapView({
        container: "mapa",  // miejsce gdzie chcemy osadzić mapę (bierzemy klasę z pliku html //
        map: map1,  //czyli nasza zmienna z mapą bazową zdefiniowana wcześniej //
        
    
    });
    document.getElementById("satellite").addEventListener('click',
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
    })
}); 