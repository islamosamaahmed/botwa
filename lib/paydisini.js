const axios = require("axios");
const FormData = require("form-data");
const md5 = require("md5");

/**
 * Pay Disini (Payment gateway free)
 * Code base: https://github.com/bolaxd
 * Don't claim this code without License
 */

class PayDisini {
  /**
   * Paydisini is a payment gateway free to use (register with your passport)
   * @param {string} [key] This class has one parameter, namely "key"
   */
  constructor(key) {
    this.url = "https://paydisini.co.id/api/";
    this.method = "post";
    this.key = key;
  }

  async _request(request, payloads = {}) {
    const signValue = {
      profile: `Profile`,
      new: `${
        payloads["unique_code"] +
        payloads["service"] +
        payloads["amount"] +
        payloads["valid_time"]
      }NewTransaction`,
      status: `${payloads["unique_code"]}StatusTransaction`,
      cancel: `${payloads["unique_code"]}CancelTransaction`,
      payment_channel: `PaymentChannel`,
      payment_guide: `${payloads["service"]}PaymentGuide`,
    };
    const formData = new FormData();
    payloads.signature = md5(this.key + signValue[request]).toString();
    payloads.key = this.key;
    payloads.request = request;
    for (let index in payloads) {
      if (payloads[index]) await formData.append(index, payloads[index]);
    }
    const res = await axios[this.method](this.url, formData)
      .then((res) => res.data)
      .catch((e) => ({ success: false, msg: "Maaf server sedang error" }));
    return res;
  }

  profile = async () => {
    return this._request("profile");
  };

  createPayment = async ({
    unique_code,
    service,
    amount,
    note,
    valid_time,
    payment_guide,
    ewallet_phone,
    type_fee,
  }) => {
    return this._request("new", {
      unique_code,
      service,
      amount,
      note,
      valid_time,
      ewallet_phone,
      type_fee,
    });
  };
  cekStatus = async (unique_code) => {
    return this._request("status", { unique_code });
  };

  cancelPayment = async (unique_code) => {
    return this._request("cancel", { unique_code });
  };

  list = async () => {
    return this._request("payment_channel");
  };

  guide = async (service) => {
    const res = await this._request("payment_guide", { service });
    if (res.success) {
      return {
        channel_pembayaran: res.channel_pembayaran,
        data: res.data.map(({ title, content }) => ({
          title,
          content,
        })),
      };
    }
  };
}

module.exports = PayDisini;

let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});
