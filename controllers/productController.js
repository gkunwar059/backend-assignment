// // const User = require("../models/userModel");

// const connection = require("../config/database");

// //register new users
// const getProduct = async (req, res) => {
//   try {
//     const { name, price, description } = req.body;

//     connection.query(
//       "INSERT INTO users (name,price, description) VALUES (?, ?, ?)",
//       [name, price, description],
//       function (err, result, fields) {
//         if (err) {
//           console.log(err);
//           throw err;
//         }

//         getProductInfo(result.insertId, function (err, insertedRow) {
//           if (err) {
//             console.log(err);
//             throw err;
//           }

//           res.status(201).json({
//             message: "User registered successfully",
//             product: insertedRow,
//           });
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Failed to register user" });
//   }
// };

// //get product
// const getProductInfo = async (req, res) => {
//   try {
//     connection.query("SELECT * FROM users", function (err, result, fields) {
//       if (err) {
//         throw err;
//       }
//       res
//         .status(201)
//         .json({ message: "Users fetched successfully", users: result });
//     });
//   } catch (error) {
//     console.error("Error getting user:", error);
//     res.status(500).json({ message: "Failed to get user info" });
//   }
// };
// const getUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     getUserInfo(id, function (err, result) {
//       if (err) {
//         console.log(err);
//         throw err;
//       }

//       if (result == undefined) {
//         res.status(201).json({
//           message: "Couldn't find user",
//         });
//       } else {
//         res.status(201).json({
//           message: "User fetched successfully",
//           user: result,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error getting user:", error);
//     res.status(500).json({ message: "Failed to get user info" });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const id = req.params.id;

//     connection.query(
//       "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
//       [username, email, password, id],
//       function (err, result, fields) {
//         if (err) {
//           throw err;
//         }

//         getUserInfo(id, function (err, result) {
//           if (err) {
//             console.log(err);
//             throw err;
//           }
//           console.log(result);

//           res.status(201).json({
//             message: "User fetched successfully",
//             user: result,
//           });
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ message: "Failed to update user" });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     connection.query(
//       "DELETE FROM users WHERE id = ?",
//       [id],
//       function (err, result, fields) {
//         if (err) {
//           throw err;
//         }
//         res.status(200).json({ message: "User deleted successfully" });
//       }
//     );
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Failed to delete user" });
//   }
// };

// function getProductInfo(userId, callback) {
//   connection.query(
//     "SELECT * FROM users WHERE id = ?",
//     [userId],
//     function (err, result, fields) {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, result[0]);
//       }
//     }
//   );
// }
// module.exports = {
//   registerUser,
//   getUsers,
//   getUser,
//   updateUser,
//   deleteUser,
//   loginUser,
// };

const User = require("../models/userModel");

const connection = require("../config/database");

//register new users
const addProduct = async (req, res) => {
  try {
    const { name, price, description, user_id } = req.body;

    connection.query(
      "INSERT INTO products (name, price, description, user_id) VALUES (?, ?, ?, ?)",
      [name, price, description, user_id],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          throw err;
        }

        const insertedProductId = result.insertId;

        getProductInfo(insertedProductId, function (err, insertedRow) {
          if (err) {
            console.log(err);
            throw err;
          }

          res.status(201).json({
            message: "Product added successfully",
            product: insertedRow,
          });
        });
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const getProducts = async (req, res) => {
  try {
    connection.query("SELECT * FROM products", function (err, result, fields) {
      if (err) {
        throw err;
      }
      res
        .status(201)
        .json({ message: "Products Fetch sucessFully", products: result });
    });
  } catch (error) {
    console.error("Error getting Product:", error);
    res.status(500).json({ message: "Failed to get  product info" });
  }
};
const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    getProductInfo(id, function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      }

      if (result == undefined) {
        res.status(201).json({
          message: "Couldn't find product",
        });
      } else {
        res.status(201).json({
          message: "Product fetched successfully",
          product: result,
        });
      }
    });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Failed to get product info" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const id = req.params.id;

    connection.query(
      "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
      [name, price, description, id],
      function (err, result, fields) {
        if (err) {
          throw err;
        }

        getProductInfo(id, function (err, result) {
          if (err) {
            console.log(err);
            throw err;
          }
          // console.log(result);

          res.status(201).json({
            message: "Product fetched successfully",
            product: result,
          });
        });
      }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    connection.query(
      "DELETE FROM products WHERE id = ?",
      [id],
      function (err, result, fields) {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "Product deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

function getProductInfo(userId, callback) {
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [userId],
    function (err, result, fields) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result[0]);
      }
    }
  );
}
module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
