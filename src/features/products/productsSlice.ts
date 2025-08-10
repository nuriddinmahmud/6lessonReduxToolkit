import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./types";

import paperImg from "../../assets/paper.jpg";
import shampooImg from "../../assets/shampoo.jpg";
import panImg from "../../assets/pan.jpg";
import kazanImg from "../../assets/kazan.jpg";
import riceCerealImg from "../../assets/nestle.jpg";
import colgateImg from "../../assets/colgate.jpg";
import fairyImg from "../../assets/fairy.jpg";
import fairyLemonImg from "../../assets/fairy_lemon.jpg";
import manicureM560Img from "../../assets/manicure_m560.jpg";
import teymurovaPasteImg from "../../assets/teymurova_paste.jpg";

type ProductsState = { status: "idle" | "loading" | "error"; list: Product[] };

const initialState: ProductsState = {
  status: "idle",
  list: [
    {
      id: "p1",
      title: 'Бумага листовая, для офисной техники Sylvamo Svetocopy, A4',
      price: 38940,
      oldPrice: 40990,
      perMonth: 2903,
      image: paperImg,
      rating: 4.9,
      reviewsCount: 34502,
      badges: ["guarantee", "super"],
    },
    {
      id: "p2",
      title: "Шампунь для волос Garnier Fructis SOS, восстановление, 400 мл",
      price: 23391,
      oldPrice: 25900,
      perMonth: 1840,
      image: shampooImg,
      rating: 4.9,
      reviewsCount: 8421,
      badges: ["super", "guarantee"],
    },
    {
      id: "p3",
      title: 'Сковорода Kukmara «Мраморная», антипригарная, 20 см',
      price: 173610,
      oldPrice: 192900,
      perMonth: 13683,
      image: panImg,
      rating: 5.0,
      reviewsCount: 160,
      badges: ["guarantee", "sale"],
    },
    {
      id: "p4",
      title: "Казан для плова с антипригарным покрытием и крышкой Kukmara",
      price: 269910,
      oldPrice: 299900,
      perMonth: 21242,
      image: kazanImg,
      rating: 4.9,
      reviewsCount: 212,
      badges: ["sale"],
    },
    {
      id: "p5",
      title: 'Каша NESTLÉ "безмолочная рисовая" с 4 месяцев, 200 г',
      price: 18810,
      oldPrice: 20900,
      perMonth: 1480,
      image: riceCerealImg,
      rating: 4.9,
      reviewsCount: 1788,
      badges: ["sale"],
    },
    {
      id: "p6",
      title: "Зубная паста Colgate Triple Action, 150 мл",
      price: 17991,
      oldPrice: 19990,
      perMonth: 1415,
      image: colgateImg,
      rating: 4.7,
      reviewsCount: 25337,
      badges: ["sale"],
    },
    {
      id: "p7",
      title: "Средство для мытья посуды Fairy Яблоко, 450 мл",
      price: 12591,
      oldPrice: 13990,
      perMonth: 990,
      image: fairyImg,
      rating: 5.0,
      reviewsCount: 2152,
      badges: ["sale"],
    },
    {
      id: "p8",
      title: "Средство для мытья посуды Fairy Лимон, 450 мл",
      price: 21591,
      oldPrice: 23900,
      perMonth: 1690,
      image: fairyLemonImg,
      rating: 4.9,
      reviewsCount: 3078,
      badges: ["guarantee"],
    },
    {
      id: "p9",
      title: "Типсы Ffleur Маникюр Иглис M560 black, 9",
      price: 29700,
      oldPrice: 33000,
      perMonth: 2337,
      image: manicureM560Img,
      rating: 4.7,
      reviewsCount: 2049,
      badges: ["guarantee"],
    },
    {
      id: "p10",
      title: "Крем-паста для ног Теймурова, усиленная, 6 в 1",
      price: 23490,
      oldPrice: 52350,
      perMonth: 1770,
      image: teymurovaPasteImg, // importdan foydalanamiz
      rating: 4.9,
      reviewsCount: 6727,
      badges: ["guarantee"],
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
