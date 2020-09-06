const xml2js = require("xml2js");
const jsonpath = require("jsonpath");

module.exports = {
  getManifest,
  writeManifest,
  addPreviewImage,
  addCssFile,
  addResxFile
};

function getManifest(generator, controlName) {
  var manifestJson;
  var xmlParser = new xml2js.Parser();
  xmlParser.parseString(
    generator.fs.read(`${controlName}/ControlManifest.Input.xml`),
    function(err, result) {
      manifestJson = result;
    }
  );

  return manifestJson;
}

function writeManifest(generator, controlName, manifestJson) {
  const builder = new xml2js.Builder();
  var parsedData = builder.buildObject(manifestJson);
  generator.fs.write(`${controlName}/ControlManifest.Input.xml`, parsedData);
}

function addPreviewImage(generator, controlName, imagePath) {
  var manifestJson = getManifest(generator, controlName);
  manifestJson.manifest.control[0].$["preview-image"] = imagePath;
  writeManifest(generator, controlName, manifestJson);
}

function addCssFile(generator, controlName, filename) {
  var manifestJson = getManifest(generator, controlName);

  var cssSearchResult = jsonpath.query(
    manifestJson,
    `$..css.*[?(@.path=='css/${filename}')]`
  );

  if (cssSearchResult.length > 0) {
    return;
  }

  var cssNode = manifestJson.manifest.control[0].resources[0].css;

  var cssObject = {
    $: {
      path: `css/${filename}`,
      order: "1"
    }
  };

  if (cssNode == undefined) {
    manifestJson.manifest.control[0].resources[0].css = cssObject;
  } else {
    cssObject.$.order = (cssNode.length + 1).toString();
    manifestJson.manifest.control[0].resources[0].css.push(cssObject);
  }

  writeManifest(generator, controlName, manifestJson);
}

function addResxFile(generator, controlName, lcid) {
  var manifestJson = getManifest(generator, controlName);

  var resxSearchResult = jsonpath.query(
    manifestJson,
    `$..resx.*[?(@.path=='strings/${controlName}.${lcid}.resx')]`
  );

  if (resxSearchResult.length > 0) {
    return;
  }

  var resxNode = manifestJson.manifest.control[0].resources[0].resx;

  var resxObject = {
    $: {
      path: `strings/${controlName}.${lcid}.resx`,
      version: "1.0.0"
    }
  };

  if (resxNode == undefined) {
    manifestJson.manifest.control[0].resources[0].resx = resxObject;
  } else {
    manifestJson.manifest.control[0].resources[0].resx.push(resxObject);
  }

  writeManifest(generator, controlName, manifestJson);
}
