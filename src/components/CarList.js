import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";

import PreviewImage from "./PreviewImage";

import { numberWithCommas } from "../utils/baseFn";

const Carlist = (props) => {
  const { carts, setCart } = props;
  const [carList, setCarList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [openAlertPreview, setOpenAlertPreview] = useState(false);

  const btnAction = (url) => (setImgUrl(url), setOpenAlertPreview(true));

  const getCarList = () => {
    axios({
      method: "get",
      url: `https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car`,
      headers: {
        Authorization: `Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o`,
      },
    })
      .then(({ data }) => {
        setCarList(data.items);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getCarList();
  }, []);

  const addToCart = (param, index) => {
    if (carts.some((el) => el.fields.title === param.fields.title)) {
      let array = carts;
      array.map((el) => {
        if (el.fields.title === param.fields.title)
          return (el.amount = el.amount + 1);
      });
      setCart([...array]);
    } else {
      let obj = Object.assign(param, { amount: 1 });
      setCart([...carts, obj]);
    }
  };

  return (
    <Box sx={{ width: "420px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              border: 1,
              borderBottom: 0,
              boxShadow: 3,
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
              py: 2,
              boxShadow: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <List sx={{ width: "400px" }}>
              {carList.length > 0 &&
                carList.map((el, i) => (
                  <>
                    <ListItem
                      key={i.toString()}
                      secondaryAction={
                        <Button
                          variant="contained"
                          color="primary"
                          edge="end"
                          aria-label="add to cart"
                          onClick={() => addToCart(el)}
                        >
                          Add to Cart
                        </Button>
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
                ))}
            </List>
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

export default Carlist;
