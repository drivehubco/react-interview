import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import "./App.css";
import CarList from "./components/CarList";
import Cart from "./components/Cart";

function App() {
  const [carts, setCart] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("carts"))) {
      setCart(JSON.parse(localStorage.getItem("carts")));
    }
  }, []);

  useEffect(() => {
    if (carts.length > 0) {
      localStorage.setItem("carts", JSON.stringify(carts));
    } else {
      localStorage.removeItem("cards");
    }
  }, [carts]);

  return (
    <div>
      <div className="app-header">
        <img src={logo} alt="logo"></img>
        <span>Drivehub</span>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          py: 5,
        }}
      >
        <CarList carts={carts} setCart={setCart} />
        <Cart carts={carts} setCart={setCart} />
      </Box>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}

export default App;
