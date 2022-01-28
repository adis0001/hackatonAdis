// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminContext } from "../contexts/AdminProvider";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminTable() {
  const { getProducts, products, deleteProduct } =
    React.useContext(AdminContext);
  React.useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <h2>Loading...</h2>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>adis</strong>
            </TableCell>
            <TableCell>
              <strong>#</strong>
            </TableCell>
            <TableCell>
              <strong>name</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Image</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Brand</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Price</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Color</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Description</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Button
                  onClick={() => deleteProduct(item.id)}
                  color="error"
                  variant="contained"
                >
                  DEL
                </Button>
              </TableCell>
              <TableCell>
                <Link to={`/admin-panel/edit/${item.id}`}>
                  <Button color="warning" variant="contained">
                    EDIT
                  </Button>
                </Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                <img width={80} src={item.image} alt="product-img" />
              </TableCell>
              <TableCell align="right">{item.brand}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.color}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
