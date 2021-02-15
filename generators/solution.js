const xml2js = require("xml2js");

module.exports = {
  updatePublisherDisplayName
};

function getSolutionXml(generator, controlName) {
  var solutionJson;
  var xmlParser = new xml2js.Parser();
  xmlParser.parseString(
    generator.fs.read(`Solution/${controlName}/src/Other/Solution.xml`),
    function(err, result) {
      if (err) {
        generator.log("Error while trying to parse manifest.");
      }

      solutionJson = result;
    }
  );

  return solutionJson;
}

function writeSolutionXml(generator, controlName, solutionJson) {
  const builder = new xml2js.Builder();
  var parsedData = builder.buildObject(solutionJson);
  generator.fs.write(
    `Solution/${controlName}/src/Other/Solution.xml`,
    parsedData
  );
}

function updatePublisherDisplayName(generator, controlName, publisherName) {
  var solutionJson = getSolutionXml(generator, controlName);

  solutionJson.ImportExportXml.SolutionManifest[0].Publisher[0].LocalizedNames[0].LocalizedName[0].$.description = publisherName;
  solutionJson.ImportExportXml.SolutionManifest[0].Publisher[0].Descriptions[0].Description[0].$.description = publisherName;

  writeSolutionXml(generator, controlName, solutionJson);
}
