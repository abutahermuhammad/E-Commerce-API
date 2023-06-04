const mongoose = require('mongoose');

// Actual Order Object
// const finalOrderSchema = new mongoose.Schema({
//   id: String, // (Reaad-only)
//   parent_id: Number,
//   number: Number, // Order number. (Read-only)
//   order_key: String,
//   created_via: String,
//   version: String, // API Schema version.
//   status: String, // pending, processing, on-hold, completed, cancelled, refunded, failed, trash.
//   currency: String, // AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB, BRL, BSD, BTC, BTN, BWP, BYR, BZD, CAD, CDF, CHF, CLP, CNY, COP, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EGP, ERN, ETB, EUR, FJD, FKP, GBP, GEL, GGP, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HRK, HTG, HUF, IDR, ILS, IMP, INR, IQD, IRR, IRT, ISK, JEP, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRO, MUR, MVR, MWK, MXN, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PRB, PYG, QAR, RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLL, SOS, SRD, SSP, STD, SYP, SZL, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, UYU, UZS, VEF, VND, VUV, WST, XAF, XCD, XOF, XPF, YER, ZAR and ZMW
//   date_created: Date,
//   date_created_gmt: Date,
//   date_modified: Date,
//   date_modified_gmt: Date,
//   discount_total: String, // Total dicrount amount for the order.
//   dicount_tax: String, // Total dicount tax amount for the order.
//   shipping_total: String, // Total shipping amount for the order.
//   shipping_tax: String, // Total shipping tax amount or the orer.
//   cart_total: String, // Sum of line item taxes only.
//   total: String, //Grand total.
//   total_tax: String,
//   prices_include_tax: Boolean, // True the prices included tax durin checkout.
//   customer_id: Number,
//   customer_ip_address: String,
//   customer_user_agent: String,
//   customer_note: String,
//   billig: {
//     first_name: String,
//     last_name: String,
//     company: String,
//     address_1: String,
//     address_2: String,
//     city: String, // ISO code or name of the state,province or district.
//     state: String,
//     postcode: String,
//     country: String,
//     email: String,
//     phone: String,
//   },
//   shipping: {
//     first_name: String,
//     last_name: String,
//     company: String,
//     address_1: String,
//     address_2: String,
//     city: String, // ISO code or name of the state,province or district.
//     state: String,
//     postcode: String,
//     country: String,
//     email: String,
//     phone: String,
//   },
//   payment_method: String,
//   payment_method_title: String,
//   transaction_id: String,
//   date_paid: Date,
//   date_paid_gmt: Date,
//   date_completed: Date,
//   date_completed_gmt: Date,
//   cart_hash: String, // MD5 hash of cart items to ensure orders are not modified.
//   meta_data: {},
//   line_items: [
//     {
//       id: String,
//       name: String,
//       product_id: String,
//       variation_id: String,
//       quantity: Number,
//       tax_class: String,
//       subtotal: Number, // Line subtotal (before discount)
//       subtotal_tax: String,
//       total: Number,
//       total_tax: Number,
//       taxes: [],
//       sku: String,
//       price: Number,
//     },
//   ],
//   tax_lines: [
//     {
//       id: String,
//       rate_code: String, // Tax rate code.
//       rate_id: String, // Tax rate ID.
//       label: String,
//       compount: Boolean, // Show if is a compound tax rate
//       tax_total: String, // Tax total (not including shipping taxes).READ-ONL
//     },
//   ],
//   shipping_lines: [
//     {
//       id: String, //	Item ID.READ-ONLY
//       method_title: String, //	Shipping method name.
//       method_id: String, //	Shipping method ID.
//       total: String, //	Line total (after discounts).
//       total_tax: String, //	Line total tax (after discounts).READ-ONLY
//     },
//   ],
//   cupon_line: [
//     {
//       id: Numer, //	Item ID.READ-ONLY
//       code: String, //	Coupon code.
//       discount: String, //	Discount total.
//       discount_tax: String, //	Discount total tax.
//     },
//   ],
//   refunds: [
//     {
//       id: Number, //	Refund ID.READ-ONLY
//       reason: String, //	Refund reason.READ-ONLY
//       total: String, //	Refund total.
//     },
//   ],
//   set_paid: Boolean,
// });

const orderSchema = new mongoose.Schema({
  payment_method: String,
  payment_method_title: String,
  set_paid: Boolean,
  billing: {
    first_name: String,
    last_name: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    postcode: String,
    country: String,
    email: String,
    phone: String,
  },
  shipping: {
    first_name: String,
    last_name: String,
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    postcode: String,
    country: String,
  },
  line_items: [
    {
      product_id: String,
      quantity: Number,
    },
  ],
  shipping_lines: [
    {
      method_id: String,
      method_title: String,
      total: Number,
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
