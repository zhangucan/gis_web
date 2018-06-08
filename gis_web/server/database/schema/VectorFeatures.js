const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema')
console.log(GeoJSON)
const VectorFeaturesSchema = new mongoose.Schema({
  type: String,
  featureType: String,
  displayTime: String,
  map: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
  point: mongoose.Schema.Types.Point,
  multipoint: mongoose.Schema.Types.MultiPoint,
  linestring: mongoose.Schema.Types.LineString,
  multilinestring: mongoose.Schema.Types.MultiLineString,
  polygon: mongoose.Schema.Types.Polygon,
  multipolygon: mongoose.Schema.Types.MultiPolygon,
  geometry: mongoose.Schema.Types.Geometry,
  geometrycollection: mongoose.Schema.Types.GeometryCollection,
  feature: mongoose.Schema.Types.Feature,
  featurecollection: mongoose.Schema.Types.FeatureCollection
})
mongoose.model('VectorFeatures', VectorFeaturesSchema)
