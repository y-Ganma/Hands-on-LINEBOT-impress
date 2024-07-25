import { contextManage } from './context-manage.js';
import { hasKey } from '../../haskey.js';
import { messageMap } from './text-map.js';

// テキストメッセージの処理をする関数
export const textEvent = async (event, appContext) => {
  // contextが存在した場合は対応するメッセージが返ってきて、存在しない場合はundefinedが帰ってくる


  // ユーザーから送られてきたメッセージ
  const receivedMessage = event.message.text;

  // 送られてきたメッセージに応じて返信するメッセージを取得してreturn
  if (hasKey(messageMap, receivedMessage)) {
    return messageMap[receivedMessage](event, appContext);
  }

  // 返信するメッセージが存在しない場合
  return {
    type: 'text',
    text: `受け取ったメッセージ: ${receivedMessage}\nそのメッセージの返信には対応してません...\n『ヘルプ』または"Help"で一覧を確認してください。`,
  };
};
