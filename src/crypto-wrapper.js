const { Crypto } = require("@peculiar/webcrypto");
const crypto = new Crypto();

(async function () {
    const { default: ripemd160 } = await import("ripemd160-js/ripemd160.mjs");
  })();

function computeDigest(algo, data) {
    if (data instanceof ArrayBuffer) {
        data = Uint8Array.from(data);
    }
    if (!(data instanceof Uint8Array)) {
        throw new TypeError("data must be an ArrayBuffer");
    }
    if (algo === "ripemd160") {
        return ripemd160(data);
    }
}
