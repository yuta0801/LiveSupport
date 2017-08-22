const exec = require('child_process').exec;
const dialog = require('electron').dialog;

class Util {
	/**
	 * メッセージボックスの設定
	 * @typedef {Object} MsgBoxParas
	 * @property {string} type メッセージボックスの種類
	 * @property {Array} btns メッセージボックスに表示するボタン
	 */

	/**
	 * メッセージボックスを表示する
	 * @param  {MsgBoxParas}   params   メッセージボックスの設定
	 * @param  {Function} callback メッセージボックスが閉じられたときに実行する関数
	 */
	static msgbox(params, callback) {
		dialog.showMessageBox({
			type: params.type,
			buttons: params.btns,
			defaultId: 0,
			title: 'LiveSupport',
			message: params.msg,
			detail: params.detail || '',
			cancelId: -1,
			noLink: true
		}, (res) => {
			callback(res);
		});
	}

	/**
	 * エラーボックスを表示する
	 * @param  {string} [err] エラーメッセージ
	 */
	static showError(err) {
		if (err) dialog.showErrorBox('LiveSupport', err);
	}

	static read(msg, name) {
		exec(`${config.reading.path} /t "${((config.reading.name)?name+' さん '+text:text).replace('"','\'').replace('\n',' ')}"`);
	/**
	 * 棒読みちゃんに読ませる
	 * @param  {string} text  読ませる内容
	 */
	static read(text) {
	}
}

module.exports = Util;
