const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  priceRange: String,
  unit: String,
  landingCost: String,
  bestPriceNote: String,
  minOrder: String,
  supplierName: String,
  location: String,
  duration: String,
  rating: Number,
  reviewer:Number,
  image: String,
  flag: String,
  verified: Boolean,
  tradeAssurance: Boolean,
  exportCountries: [String],
  certifications: [String],
  managementCertifications: [String],
  averageResponse: Number
});

productSchema.index({ location: 1 });
productSchema.index({ rating: 1 });
productSchema.index({ exportCountries: 1 });
productSchema.index({ certifications: 1 });
productSchema.index({ managementCertifications: 1 });
productSchema.index({ averageResponse: 1 });

module.exports = mongoose.model('Product', productSchema);