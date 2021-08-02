export default async function handler(req, res) {
  try {
    const response = await fetch("https://restcountries.eu");
    const data = await response.json();
    return res.status(200).json({
      coutries: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
}
