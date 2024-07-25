export class DynamoDBContext {
  // DynamoDB DocumentClientのインスタンスを受け取って初期化
  constructor(dynamoDocument) {
    this.dynamoDocument = dynamoDocument;
  }

  // DynamoDBへデータを保存
  put(param) {
    return this.dynamoDocument.put(
      param,
    );
  }

  // DynamoDBからデータを取得
  query(param) {
    return this.dynamoDocument.query(
      param,
    );
  }

  // DynamoDBのデータを更新
  update(param) {
    return this.dynamoDocument.update(
      param,
    );
  }

  // DynamoDBのデータを削除
  delete(param) {
    return this.dynamoDocument.delete(
      param,
    );
  }
}
