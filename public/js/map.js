
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
({key: mapAPI, v: "beta"});

// index.js
// This example adds a map using web components.
async function initMap() {
const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

console.log("Maps JavaScript API loaded.");

const advancedMarkers = document.querySelectorAll(
"#marker-click-event-example gmp-advanced-marker",
);

for (const advancedMarker of advancedMarkers) {
customElements.whenDefined(advancedMarker.localName).then(async () => {
advancedMarker.addEventListener("gmp-click", async () => {
const infoWindow = new google.maps.InfoWindow({
  //@ts-ignore
  content: advancedMarker.title,
});

infoWindow.open({
  //@ts-ignore
  anchor: advancedMarker,
});
});
});
}
}

initMap();

