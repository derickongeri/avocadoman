const wmsUrl = "http://78.141.234.158/geoserver/kenyadata/wms";

export default {
  elevation: L.tileLayer
  .wms(wmsUrl, {
    layers: "kenyadata:Altitude_Kenya",
    format: "image/png",
    transparent: "true",
    opacity: 1,
  }),
  suitabilityMap: L.tileLayer
  .wms(wmsUrl, {
    layers: "kenyadata:Altitude_Kenya",
    format: "image/png",
    transparent: "true",
    opacity: 1,
  }),
};
