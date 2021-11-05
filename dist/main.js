/**
 * ファイルOpen時の処理
 */
function onOpen() {
  var menu = [];
  menu.push({ name: 'main', functionName: 'main' });
  SpreadsheetApp.getActiveSpreadsheet().addMenu("メニュー", menu);
}

function main() {
  var html = HtmlService.createHtmlOutputFromFile("index");
  SpreadsheetApp.getUi().showModalDialog(html, 'ローカルファイル読込');
}

function writeSheet(fileObj) {
  console.log('writeSheet');
  Browser.msgBox("OK");
  // フォームで指定したテキストファイルを読み込む
  var fileBlob = Utilities.newBlob(fileObj.bytes, fileObj.mimeType, fileObj.filename);

  // テキストとして取得（Windowsの場合、文字コードに Shift_JIS を指定）
  var text = fileBlob.getDataAsString("sjis");

  // 改行コードで分割し配列に格納する
  var textLines = text.split(/[\s]+/);

  // 書き込むシートを取得
  var sheet = SpreadsheetApp.getActiveSheet();

  // テキストファイルをシートに展開する
  for (var i = 0; i < textLines.length; i++) {
    sheet.getRange(i + 1, 1).setValue(textLines[i]);
  }

  // 処理終了のメッセージボックスを出力
  Browser.msgBox("ローカルファイルを読み込みました");
}
