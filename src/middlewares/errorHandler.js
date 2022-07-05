export default function errorHandler(err, _req, res, _next) {

  if (err.name === "Unauthorized") 
    return res.status(401).send({ error: err.message });


  console.log(err);
  res.status(500).send("Internal Server Error");
}