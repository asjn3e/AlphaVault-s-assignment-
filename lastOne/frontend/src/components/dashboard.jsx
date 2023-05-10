// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { user} from "../store/userSlice";
// import "./Dashboard.css";

// function Dashboard() {
// //   const currentUser = useSelector(selectCurrentUser);
// //   const products = useSelector(selectProducts);
//   const dispatch = useDispatch();

//   const [sortBy, setSortBy] = useState("");
//   const [page, setPage] = useState(1);

//   const handleSort = (sortBy) => {
//     setSortBy(sortBy);
//   };

//   const handleDelete = (productId) => {
//     // dispatch(deleteProduct(productId));
//   };

//   const productsPerPage = 10;
//   const productStartIndex = (page - 1) * productsPerPage;
//   const productEndIndex = productStartIndex + productsPerPage;
//   const sortedProducts = products.sort((a, b) => {
//     if (sortBy === "name") {
//       return a.name.localeCompare(b.name);
//     } else if (sortBy === "price") {
//       return a.price - b.price;
//     } else {
//       return 0;
//     }
//   });

//   return (
//     <div className="dashboard-container">
//       <div className="welcome-message">
//         <h1>Welcome, {currentUser.name}!</h1>
//       </div>
//       <div className="products-table">
//         <h2>Products</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 <button onClick={() => handleSort("name")}>Name</button>
//               </th>
//               <th>
//                 <button onClick={() => handleSort("price")}>Price</button>
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedProducts
//               .slice(productStartIndex, productEndIndex)
//               .map((product) => (
//                 <tr key={product.id}>
//                   <td>{product.name}</td>
//                   <td>{product.price}</td>
//                   <td>
//                     <button onClick={() => handleDelete(product.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//         <div className="pagination">
//           {Array.from(
//             Array(Math.ceil(products.length / productsPerPage)),
//             (_, i) => (
//               <button key={i + 1} onClick={() => setPage(i + 1)}>
//                 {i + 1}
//               </button>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

function Dashboard() {
  return <div>hello</div>;
}

export default Dashboard;
