var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const cheerio = require("cheerio");
const axios = require("axios");
/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
async function drive(url) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) =>
      __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
          if (!url.match(/drive\.google\.com\/file/i))
            return reject("Invalid URL!");
          const x = yield axios
            .get(url, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
              },
            })
            .then((v) => v.data);
          const $ = cheerio.load(x);
          const _ = {
            name:
              $("head").find('meta[property="og:title"]').attr("content") || "",
            link:
              ((_a = $("head")
                .find('meta[property="og:url"]')
                .attr("content")) === null || _a === void 0
                ? void 0
                : _a.split("?")[0]) || url,
            download:
              `https://drive.usercontent.google.com/u/0/uc?` +
              new URLSearchParams({
                id:
                  ((_b = url.match(/file\/d\/([\w\d-]+)/i)) === null ||
                  _b === void 0
                    ? void 0
                    : _b[1]) || "",
              }),
          };
          resolve(_);
        } catch (e) {
          reject(e);
        }
      }),
    );
  });
}

module.exports = drive;
