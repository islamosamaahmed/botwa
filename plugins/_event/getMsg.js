async function before(m, { isAdmin, isBotAdmin }) {
  db.data.msg = db.data.msg ? db.data.msg : {}
  if (m.isBaileys) return;
  if (!m.text) return;
  if (m.isCommand) return;
  let msgs = db.data.msg;
  let result = Object.keys(msgs).find((a) => m.text.toLowerCase().includes(a));
  if (!result) return;
  let _m = conn.serializeM(
    JSON.parse(JSON.stringify(msgs[result]), (_, v) =>
      null !== v &&
      "object" == typeof v &&
      "type" in v &&
      "Buffer" === v.type &&
      "data" in v &&
      Array.isArray(v.data)
        ? Buffer.from(v.data)
        : v,
    ),
  );
  await _m.copyNForward(m.chat);
}

module.exports = { before };
