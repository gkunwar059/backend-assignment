const connection = require("../config/database");

//register new users
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    connection.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          throw err;
        }

        getUserInfo(result.insertId, function (err, insertedRow) {
          if (err) {
            console.log(err);
            throw err;
          }

          res.status(201).json({
            message: "User registered successfully",
            user: insertedRow,
          });
        });
      }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};
const getUsers = async (req, res) => {
  try {
    connection.query("SELECT * FROM users", function (err, result, fields) {
      if (err) {
        throw err;
      }
      res
        .status(201)
        .json({ message: "Users fetched successfully", users: result });
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Failed to get user info" });
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    getUserInfo(id, function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      }

      if (result == undefined) {
        res.status(201).json({
          message: "Couldn't find user",
        });
      } else {
        res.status(201).json({
          message: "User fetched successfully",
          user: result,
        });
      }
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Failed to get user info" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.params.id;

    connection.query(
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
      [username, email, password, id],
      function (err, result, fields) {
        if (err) {
          throw err;
        }

        getUserInfo(id, function (err, result) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log(result);

          res.status(201).json({
            message: "User fetched successfully",
            user: result,
          });
        });
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    connection.query(
      "DELETE FROM users WHERE id = ?",
      [id],
      function (err, result, fields) {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "User deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    connection.query(
      "SELECT id, username, email FROM users where email = ? AND password = ?",
      [email, password],
      function (err, result, fields) {
        if (err) {
          throw err;
        }
        if (result == undefined) {
          res.status(201).json({
            message: "Invalid your credentials",
          });
        } else {
          res.status(201).json({
            message: "Logged in successfully",
            user: result,
          });
        }
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

function getUserInfo(userId, callback) {
  connection.query(
    "SELECT * FROM users WHERE id = ?",
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
  registerUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
};
