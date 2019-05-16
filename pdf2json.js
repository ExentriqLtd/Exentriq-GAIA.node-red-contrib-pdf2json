module.exports = function(RED) {

    function pdf2json(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        try {
            this.on("input", function(msg) {
                var pdfBuffer = msg.payload;
                PDFParser = require("pdf2json");
                let pdfParser = new PDFParser();

                pdfParser.on("pdfParser_dataError", errData => node.error(errData.parserError, msg) );
                pdfParser.on("pdfParser_dataReady", pdfData => {
                  msg.payload = pdfData;
                  node.send(msg);
                });
                pdfParser.parseBuffer(pdfBuffer);
            });
        }
        catch(e) {
            node.error(e, msg); 
        }
    }

    RED.nodes.registerType("pdf2json",pdf2json);
};
