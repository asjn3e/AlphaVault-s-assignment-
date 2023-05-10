import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "../dashborad.css";
function Dashboard() {
  const currentUser = useSelector((state) => state.user);
  //   const products = useSelector(selectProducts);
  //   const dispatch = useDispatch();
  const history = useHistory();

  if (!currentUser.token) {
    history.push("/login");
  }

  const [products, setProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortUsersBy, setSortUserssBy] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchdata() {
      const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };

      //   console.log(currentUser);

      try {
        const response = await axios.get(
          "http://localhost:5000/products",
          config
        );
        const responseUsers = await axios.get(
          "http://localhost:5000/users",
          config
        );
        console.log(responseUsers.data);
        // console.log(response.data);
        setProducts(response.data);
        setAllUsers(responseUsers.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, []);

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };
  const handleUsersSort = (sortBy) => {
    setSortUserssBy(sortBy);
  };

  const handleDelete = async (Id, Type) => {
    console.log(Id, Type);
    const config = {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    };
    if (Type == "user") {
      await axios.delete(`http://localhost:5000/users/${Id}`, config);
      setAllUsers(
        allUsers.filter((user) => {
          return user._id != Id;
        })
      );
    } else {
      await axios.delete(`http://localhost:5000/products/${Id}`, config);
      setProducts(
        products.filter((product) => {
          return product._id != Id;
        })
      );
    }
  };
  const usersPerPage = 5;
  const userStartIndex = (page - 1) * usersPerPage;
  const userEndIndex = userStartIndex + usersPerPage;
  const sortedUsers = allUsers.sort((a, b) => {
    console.log("hi");
    if (sortUsersBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortUsersBy === "email") {
      return a.email.localeCompare(b.email);
    } else if (sortUsersBy === "isAdmin") {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });

  const productsPerPage = 5;
  const productStartIndex = (page - 1) * productsPerPage;
  const productEndIndex = productStartIndex + productsPerPage;
  const sortedProducts = products.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return a.price - b.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="dashboard-container">
      <div className="welcome-message">
        <h1>Welcome, {currentUser.userInfo.name || ""}!</h1>
      </div>
      <div className="products-table">
        <h2>Products</h2>
        <h2>
          <Link to={"/add-product"}>add product</Link>
        </h2>
        <table>
          <thead>
            <tr>
              <th>
                <button onClick={() => handleSort("name")}>Name</button>
              </th>
              <th>
                <button onClick={() => handleSort("price")}>Price</button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts
              .slice(productStartIndex, productEndIndex)
              .map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id, "product")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from(
            Array(Math.ceil(products.length / productsPerPage)),
            (_, i) => (
              <button key={i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
      <div className="products-table">
        <h2>Users</h2>

        <table>
          <thead>
            <tr>
              <th>
                <button onClick={() => handleUsersSort("name")}>Name</button>
              </th>
              <th>
                <button onClick={() => handleUsersSort("email")}>email</button>
              </th>
              <th>
                <button onClick={() => handleUsersSort("isAdmin")}>
                  isAdmin
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.slice(userStartIndex, userEndIndex).map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "True" : "False"}</td>
                <td>
                  <button onClick={() => handleDelete(user._id, "user")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from(
            Array(Math.ceil(products.length / productsPerPage)),
            (_, i) => (
              <button key={i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
