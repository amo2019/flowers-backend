import products from "../../flowers.json";


function flowers (req, res) {
  if (!req.query.title) {
    res.statusCode = 400;
    res.end("Must have a title");
  } else {
    const found = products.filter(
      ({ title }) => title == req.query.title
    );
    if (found.length === 0) {
      res.statusCode = 404;
      res.end(`flowers ${req.query.title} not found`);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(found[0]));
    }
  }
};

export default flowers;