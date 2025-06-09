const Product = require('../models/Product');


exports.getFilteredProducts = async (req, res) => {
  try {
    const filters = req.query;  // or req.body depending on your request

    const filter = {};

     if (filters.location) filter.location = { $in: filters.location.split(',') };

if(Array. isArray(filters.location)) {
  const locations = filters.location.map (loc => 
    new RegExp(`^${loc.trim()}$`, 'i')
  )
   filter.location = { $in: locations };
}

    if (filters.tradeAssurance === 'true') filter.tradeAssurance = true;
    if (filters.verifiedSupplier === 'true') filter.verified = true;
    if (filters.certifications) filter.certifications = { $in: filters.certifications.split(',') };
    if (filters.exportCountries) filter.exportCountries = { $in: filters.exportCountries.split(',') };
    if (filters.managementCerts) filter.managementCertifications = { $in: filters.managementCerts.split(',') };
    if (filters.responseTime) filter.AverageResponse = { $lte: parseFloat(filters.responseTime) };

    // First get products with all filters except rating
    let products = await Product.find(filter).limit(100);


    if (filters.rating) {
  const minRating = parseFloat(filters.rating.replace('+', ''));
  console.log("rating is " + minRating);
   

  products = products.filter(product => {


  let numericRating;

  if (typeof product.rating === 'string') {
    const match = product.rating.match(/^([\d.]+)/);
    if (match && match[1]) {
      numericRating = parseFloat(match[1]);
    }
  } else if (typeof product.rating === 'number') {
    numericRating = product.rating;
  }

  if (numericRating !== undefined) {
    console.log(`Checking ${numericRating} >= ${minRating}`);
    return numericRating >= minRating;
  }

  return false;
});
}

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};