goog.provide('ol.test.source.VectorTile');

goog.require('ol.VectorImageTile');
goog.require('ol.format.MVT');
goog.require('ol.proj');
goog.require('ol.source.VectorTile');
goog.require('ol.tilegrid');


describe('ol.source.VectorTile', function() {

  var format = new ol.format.MVT();
  var source = new ol.source.VectorTile({
    format: format,
    tileGrid: ol.tilegrid.createXYZ({tileSize: 512}),
    url: '{z}/{x}/{y}.pbf'
  });
  var tile;

  describe('constructor', function() {
    it('sets the format on the instance', function() {
      expect(source.format_).to.equal(format);
    });
    it('uses ol.VectorTile as default tileClass', function() {
      expect(source.tileClass).to.equal(ol.VectorTile);
    });
  });

  describe('#getTile()', function() {
    it('creates a tile with the correct tile class', function() {
      tile = source.getTile(0, 0, 0, 1, ol.proj.get('EPSG:3857'));
      expect(tile).to.be.a(ol.VectorImageTile);
    });
    it('sets the correct tileCoord on the created tile', function() {
      expect(tile.getTileCoord()).to.eql([0, 0, 0]);
    });
    it('fetches tile from cache when requested again', function() {
      expect(source.getTile(0, 0, 0, 1, ol.proj.get('EPSG:3857')))
          .to.equal(tile);
    });
  });

  describe('#getTileGridForProjection', function() {
    it('creates a tile grid with the source tile grid\'s tile size', function() {
      var tileGrid = source.getTileGridForProjection(ol.proj.get('EPSG:3857'));
      expect(tileGrid.getTileSize(0)).to.be(512);
    });
  });

});
