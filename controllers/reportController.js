const connection = require("../config/database");

// Sales Report: Total sales by day, week, or month
const salesReport = async (req, res) => {
  try {
    // Sample response
    const report = {};

    connection.query(
      "SELECT product_id FROM order_item",
      function (err, result, fields) {
        const popularProduct = getMostFrequentProduct(result);
        report.topSelling = popularProduct;
      }
    );

    connection.query(
      "SELECT COUNT(*) AS rowCount FROM `order` WHERE created_date = '2023-07-06 13:12:02'",
      function (err, result, fields) {
        report.salesOfDay = result[0].rowCount;
      }
    );

    // Get the sales for the week
    connection.query(
      "SELECT COUNT(*) AS total FROM `order` WHERE created_date BETWEEN '2023-07-01' AND '2023-07-07'",
      function (err, result, fields) {
        report.salesOfWeek = result[0].total;
      }
    );

    // Get the sales for the month
    connection.query(
      "SELECT COUNT(*) AS total FROM `order` WHERE created_date BETWEEN '2023-06-30' AND '2023-07-06'",
      function (err, result, fields) {
        report.salesOfMonth = result[0].total;
      }
    );

    res.status(200).json({ message: "Sales report generated", report: report });
  } catch (error) {
    console.error("Error generating sales report:", error);
    res.status(500).json({ message: "Failed to generate sales report" });
  }
};

function getMostFrequentProduct(array) {
  // Create an object to store the frequency of each element
  const frequencyMap = {};

  // Iterate over the array and count the frequency of each element
  array.forEach((element) => {
    frequencyMap[element.product_id] =
      (frequencyMap[element.product_id] || 0) + 1;
  });

  // Find the element with the maximum frequency
  let mostFrequentElement;
  let maxFrequency = 0;

  for (const element in frequencyMap) {
    if (frequencyMap[element] > maxFrequency) {
      mostFrequentElement = element;
      maxFrequency = frequencyMap[element];
    }
  }

  return mostFrequentElement;
}

module.exports = { salesReport };
