const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const { MongoClient, Db } = require("mongodb");
const url =
  "mongodb+srv://maniya:Mani1123@cluster0.38cqcfx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const fetchShelves = async () => {
  try {


    const response = await axios.get(
      "https://www.amazon.in/s?k=electronics&crid=BIYFU9I8AQMM&sprefix=electronics%2Caps%2C1429&ref=nb_sb_ss_ts-doa-p_2_11"
    );

    const html = response.data;

    const $ = cheerio.load(html);

    const shelves = [];

    app.post("/element" , async(req,res) => {
      try {
        const connection = await MongoClient.connect(url)
        const db = connection.db(scraper)
         await db.collection("products").insertMany(shelves)
         await connection.close()


                // req.body.id = shelves.length + 1;
        // shelves.push(req.body)
        res.json({message:"pushed"})
      } catch (error) {
        
      }

      })
      app.get("/Products" , (req,res) => {
        res.json(shelves)
    })


    $(
      "div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20"
    ).each((_idx, el) => {
      const shelf = $(el);
      const title = shelf
        .find("span.a-size-base-plus.a-color-base.a-text-normal")
        .text();
      const image = shelf.find("img.s-image").attr("src");

      const link = shelf.find("a.a-link-normal.a-text-normal").attr("href");

      const reviews = shelf
        .find(
          "div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small"
        )
        .children("span")
        .last()
        .attr("aria-label");

      const stars = shelf
        .find("div.a-section.a-spacing-none.a-spacing-top-micro > div > span")
        .attr("aria-label");

      const price = shelf.find("span.a-price > span.a-offscreen").text();

      let element = {
        title,
        image,
        link: `https://amazon.com${link}`,
        price,
      };

      if (reviews) {
        element.reviews = reviews;
      }

      if (stars) {
        element.stars = stars;
      }
      shelves.push(element);

    });
    return shelves;

  } catch (error) {
    throw error;
  }
};

fetchShelves().then((shelves) => console.log(shelves));


const app = express();

app.use(
  cors({
    origin: "*",

  })
);


app.use(express.json());









  



app.listen(3002);

