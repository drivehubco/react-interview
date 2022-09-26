import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PreviewImage from "./PreviewImage";

import { numberWithCommas } from "../utils/baseFn";

const Cart = (props) => {
  const { carts, setCart } = props;
  const [imgUrl, setImgUrl] = useState("");
  const [openAlertPreview, setOpenAlertPreview] = useState(false);
  const [totalPrice, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const btnAction = (url) => (setImgUrl(url), setOpenAlertPreview(true));

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const addOrRemove = (i, type) => {
    let array = carts;
    array[i].amount =
      type === "add" ? array[i].amount + 1 : array[i].amount - 1;
    let result = array.filter((el) => el.amount !== 0);
    setCart(result);
  };

  const sumPrice = () => {
    let arrayPrice = [];
    let totalAmount = 0;
    carts.map((el) => {
      totalAmount = totalAmount + el.amount;
      arrayPrice.push(el.fields.price);
    });

    setTotal(totalAmount * arrayPrice.reduce((a, b) => a + b, 0));
  };

  useEffect(() => {
    sumPrice();
  }, [carts]);

  useEffect(() => {
    if (parseInt(discount) !== 0) {
      localStorage.setItem("discount", parseInt(discount));
    }
    let result = totalPrice - parseInt(discount);
    if (result < 0 && totalPrice !== 0) {
      alert("Please fill Discount less than Total.");
      setDiscount(0);
    } else {
      setGrandTotal(totalPrice - parseInt(discount));
    }
  }, [totalPrice, discount]);

  useEffect(() => {
    if (parseInt(localStorage.getItem("discount")) > 0) {
      setDiscount(parseInt(localStorage.getItem("discount")));
    }
  }, []);

  return (
    <Box sx={{ width: "420px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              border: 1,
              boxShadow: 3,
              borderBottom: 0,
              py: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>CAR LIST</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              border: 1,
              boxShadow: 2,
              borderBottom: 0,
              py: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <List sx={{ width: "100%" }}>
              {carts.length > 0 ? (
                carts.map((el, i) => (
                  <>
                    <ListItem
                      secondaryAction={
                        <>
                          <Box
                            key={i}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              edge="end"
                              aria-label="Remove"
                              sx={{ mr: 1 }}
                              onClick={() => addOrRemove(i, "remove")}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{el.amount}</Typography>
                            <IconButton
                              edge="end"
                              aria-label="Add"
                              sx={{ ml: 1 }}
                              onClick={() => addOrRemove(i, "add")}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <div onClick={() => btnAction(el.fields.photo)}>
                          <Avatar
                            alt={el.fields.title}
                            src={el.fields.photo}
                            sx={{ cursor: "pointer" }}
                          />
                        </div>
                      </ListItemAvatar>
                      <ListItemText
                        primary={el.fields.title}
                        secondary={`${numberWithCommas(
                          el.fields.price
                        )} THB/day`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))
              ) : (
                <Typography sx={{ m: 2 }}>No item</Typography>
              )}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              border: 1,
              boxShadow: 2,
              borderBottom: 0,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Total</Typography>
            <Typography>{numberWithCommas(totalPrice)} THB</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              border: 1,
              boxShadow: 2,
              borderBottom: 0,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>Discount</Typography>
              <TextField
                type="number"
                label="Discount"
                defaultValue="0"
                size="small"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
              ></TextField>
            </Box>
            <Typography>{discount === "" ? "0" : discount} THB</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              border: 1,
              boxShadow: 2,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mr: 1 }}>Grand Total</Typography>
            <Typography>{grandTotal} THB</Typography>
          </Box>
        </Grid>
      </Grid>

      <PreviewImage
        imgUrl={imgUrl}
        openAlertPreview={openAlertPreview}
        setOpenAlertPreview={setOpenAlertPreview}
      />
    </Box>
  );
};

export default Cart;
