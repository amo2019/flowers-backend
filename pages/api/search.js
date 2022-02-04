import flowers from "../../flowers.json"; 

function search (req, res) {
  if (req.query.q === "undefined") req.query.q = /.*/;
  const filter = req.query.q ? new RegExp(req.query.q, "i") : /.*/;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
/*   dispatch(fetchSuccess(flowers
    .filter(({ title }) => title.match(filter))
    .slice(0, 33))) */
  res.end(
    JSON.stringify(
      flowers
        .filter(({ title }) => title.match(filter))
        .slice(0, 33)
    )
  );
};

export default search;