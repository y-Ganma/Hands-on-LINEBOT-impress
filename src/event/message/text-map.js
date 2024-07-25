import { get } from '../../request.js';
import { error } from '../../log.js';
//自分が考えたのを入れておくこと

// ユーザーのプロフィールを取得する関数
const getUserProfile = (event, client) => client.getProfile(event.source.userId);

// 受け取ったメッセージと返信するメッセージ(を返す関数)をマッピング
export const messageMap = {
  こんにちは: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  おはよう: () => ({
    type: 'text',
    text: 'Good Morning!',
  }),
  複数メッセージ: () => ([
    {
      type: 'text',
      text: 'こんにちは世界',
    },
    {
      type: 'text',
      text: 'May I help you?',
    },
  ]),
  クイックリプライ: () => ({
    type: 'text',
    text: 'クイックリプライ（以下のアクションはクイックリプライ専用で、他のメッセージタイプでは使用できません）',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'camera',
            label: 'カメラを開く',
          },
        },
        {
          type: 'action',
          action: {
            type: 'cameraRoll',
            label: 'カメラロールを開く',
          },
        },
        {
          type: 'action',
          action: {
            type: 'location',
            label: '位置情報画面を開く',
          },
        },
      ],
    },
  }),
  予定: () => ({
    type: 'text',
    text: '知りたい曜日を選択してください',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            text: '月曜日の予定',
            label: 'Monday',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '火曜日の予定',
            label: 'Tuesday',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '水曜日の予定',
            label: 'Wednesday',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '木曜日の予定',
            label: 'Thursday',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '金曜日の予定',
            label: 'Friday',
          },
        },
      ],
    },
  }),
  月曜日の予定: () => ({
    type: 'text',
    text: '1.力学\n2.力学\n3.力学演習\n4.力学演習\n5.微積分\n6.微積分\n7.体育実技\n8.体育実技',
  }),
  火曜日の予定: () => ({
    type: 'text',
    text: '3.Prog0\n4.Prog0\n5.Prog0ex\n6.Prog0ex\n7.IE2\n8.IE2\n9.経営戦略\n10.経営戦略',
  }),
  水曜日の予定: () => ({
    type: 'text',
    text: '3.微積分\n4.微積分',
  }),
  木曜日の予定: () => ({
    type: 'text',
    text: '1.力学\n2.力学\n3.力学演習\n4.力学演習\n5.微積分\n6.微積分\n9.SCCP\n10.SCCP',
  }),
  金曜日の予定: () => ({
    type: 'text',
    text: '3.Prog0\n4.Prog0\n5.Prog0ex\n6.Prog0ex\n7.IE2\n8.IE2\n9.経営戦略\n10.経営戦略',
  }),
  天気予報: async () => {
    // axiosを使ってAPIにGETリクエストを送り、レスポンスのdataを変数resに格納
    const weatherApiRes = (await get('https://www.jma.go.jp/bosai/forecast/data/forecast/070000.json')).data;
    return {
      type: 'text',
      text: `【天気予報】
    
    ${weatherApiRes[0].timeSeries[0].timeDefines[0]}: ${weatherApiRes[0].timeSeries[0].areas[2].weathers[0]}
    ${weatherApiRes[0].timeSeries[0].timeDefines[1]}: ${weatherApiRes[0].timeSeries[0].areas[2].weathers[1]}
    ${weatherApiRes[0].timeSeries[0].timeDefines[2]}: ${weatherApiRes[0].timeSeries[0].areas[2].weathers[2]} 
    `,
    };
  },
  スタンプメッセージ: () => ({
    type: 'sticker',
    packageId: '446',
    stickerId: '1988',
  }),
  画像メッセージ: () => ({
    type: 'image',
    originalContentUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
    previewImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
  }),
  音声メッセージ: () => ({
    type: 'audio',
    originalContentUrl:
      'https://github.com/shinbunbun/Hands-on-LINEBOT/blob/master/media/demo.m4a?raw=true',
    duration: 6000,
  }),
  動画メッセージ: () => ({
    type: 'video',
    originalContentUrl: 'https://github.com/shinbunbun/Hands-on-LINEBOT/blob/master/media/demo.mp4?raw=true',
    previewImageUrl: 'https://raw.githubusercontent.com/shinbunbun/Hands-on-LINEBOT/master/media/thumbnail.jpg?raw=true',
  }),
  位置情報メッセージ: () => ({
    type: 'location',
    title: 'my location',
    address: '〒160-0004 東京都新宿区四谷一丁目6番1号',
    latitude: 35.687574,
    longitude: 139.72922,
  }),
  イメージマップメッセージ: () => ([
    {
      type: 'imagemap',
      baseUrl:
        'https://github.com/shinbunbun/Hands-on-LINEBOT/blob/master/media/imagemap.png?raw=true',
      altText: 'This is an imagemap',
      baseSize: {
        width: 1686,
        height: 948,
      },
      actions: [
        {
          type: 'uri',
          area: {
            x: 590,
            y: 179,
            width: 511,
            height: 585,
          },
          linkUri: 'https://shinbunbun.info/about/',
        },
        {
          type: 'message',
          area: {
            x: 0,
            y: 0,
            width: 458,
            height: 948,
          },
          text: 'しんぶんぶん！！！',
        },
        {
          type: 'message',
          area: {
            x: 1230,
            y: 0,
            width: 456,
            height: 948,
          },
          text: 'しんぶんぶん！！！',
        },
      ],
    },
    {
      type: 'text',
      text: '画像の色々なところをタップしてみよう！',
    },
  ]),
  ボタンテンプレート: () => ({
    type: 'template',
    altText: 'ボタンテンプレート',
    template: {
      type: 'buttons',
      thumbnailImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
      imageBackgroundColor: '#FFFFFF',
      title: 'ボタンテンプレート',
      text: 'ボタンだお',
      defaultAction: {
        type: 'uri',
        label: 'View detail',
        uri: 'https://shinbunbun.info/images/photos/',
      },
      actions: [
        {
          type: 'postback',
          label: 'ポストバックアクション',
          data: 'button-postback',
        },
        {
          type: 'message',
          label: 'メッセージアクション',
          text: 'button-message',
        },
        {
          type: 'uri',
          label: 'URIアクション',
          uri: 'https://shinbunbun.info/',
        },
        {
          type: 'datetimepicker',
          label: '日時選択アクション',
          data: 'button-date',
          mode: 'datetime',
          initial: '2021-06-01t00:00',
          max: '2022-12-31t23:59',
          min: '2021-06-01t00:00',
        },
      ],
    },
  }),
  確認テンプレート: () => ({
    type: 'template',
    altText: '確認テンプレート',
    template: {
      type: 'confirm',
      text: '確認テンプレート',
      actions: [
        {
          type: 'message',
          label: 'はい',
          text: 'yes',
        },
        {
          type: 'message',
          label: 'いいえ',
          text: 'no',
        },
      ],
    },
  }),
  カルーセルテンプレート: () => ({
    type: 'template',
    altText: 'カルーセルテンプレート',
    template: {
      type: 'carousel',
      columns: [
        {
          thumbnailImageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
          imageBackgroundColor: '#FFFFFF',
          title: 'タイトル1',
          text: '説明1',
          defaultAction: {
            type: 'uri',
            label: 'View detail',
            uri: 'https://shinbunbun.info/',
          },
          actions: [
            {
              type: 'postback',
              label: 'ポストバック',
              data: 'postback-carousel-1',
            },
            {
              type: 'uri',
              label: 'URIアクション',
              uri: 'https://shinbunbun.info/',
            },
          ],
        },
        {
          thumbnailImageUrl:
            'https://shinbunbun.info/images/photos/10.jpeg',
          imageBackgroundColor: '#FFFFFF',
          title: 'タイトル2',
          text: '説明2',
          defaultAction: {
            type: 'uri',
            label: 'View detail',
            uri: 'https://shinbunbun.info/',
          },
          actions: [
            {
              type: 'postback',
              label: 'ポストバック',
              data: 'postback-carousel-2',
            },
            {
              type: 'uri',
              label: 'URIアクション',
              uri: 'https://shinbunbun.info/',
            },
          ],
        },
      ],
      imageAspectRatio: 'rectangle',
      imageSize: 'cover',
    },
  }),
  画像カルーセルテンプレート: () => ({
    type: 'template',
    altText: '画像カルーセルテンプレート',
    template: {
      type: 'image_carousel',
      columns: [
        {
          imageUrl: 'https://shinbunbun.info/images/photos/4.jpeg',
          action: {
            type: 'postback',
            label: 'ポストバック',
            data: 'image-carousel-1',
          },
        },
        {
          imageUrl: 'https://shinbunbun.info/images/photos/5.jpeg',
          action: {
            type: 'message',
            label: 'メッセージ',
            text: 'いえい',
          },
        },
        {
          imageUrl: 'https://shinbunbun.info/images/photos/7.jpeg',
          action: {
            type: 'uri',
            label: 'URIアクション',
            uri: 'https://shinbunbun.info/',
          },
        },
      ],
    },
  }),
  'Flex Message': () => ({
    type: 'flex',
    altText: 'Flex Message',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'My profile',
            color: '#FFFFFF',
            weight: 'bold',
          },
        ],
      },
      hero: {
        type: 'image',
        url: 'https://www.san-x.co.jp/sumikko/img/profile/h1.png',
        size: '3xl',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '小高　幸也',
            size: 'xl',
            style: 'normal',
            weight: 'bold',
            align: 'center',
          },
          {
            type: 'text',
            text: '会津大学　一年',
            align: 'center',
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: 'My webpage',
                  uri: 'https://web-int.u-aizu.ac.jp/~s1320075/index.html',
                },
                style: 'link',

              },
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: 'UoA website',
                  uri: 'https://u-aizu.ac.jp/',
                },
                style: 'link',
              },
            ],
            paddingTop: '10px',
          },
        ],
      },
      styles: {
        header: {
          backgroundColor: '#2B91E9',
        },
      },
    },
  }),
  プロフィール: async (event, appContext) => {
    // ユーザーのプロフィール情報を取得
    const profile = await getUserProfile(event, appContext.lineClient);
    // 返信するメッセージを作成
    return {
      type: 'text',
      text: `あなたの名前: ${profile.displayName}\nユーザーID: ${profile.userId}\nプロフィール画像のURL: ${profile.pictureUrl}\nステータスメッセージ: ${profile.statusMessage}`,
    };
  },
  ここはどこ: (event) => ({
    type: 'text',
    text: `ここは${event.source.type}だよ！`,
  }),

  ニュース: async () => {
    // ニュースAPIのレスポンスを格納する変数を宣言
    let newsApiRes;
    // エラーハンドリング
    try {
      // APIのレスポンスをnewsApiResに格納
      newsApiRes = (await get(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`)).data;
    } catch (e) {
      error(`news API error: ${e}`);
      return {
        type: 'text',
        text: 'ニュースAPIのリクエストでエラーが発生しました',
      };
    }
    // 返信するメッセージを作成
    const message = {
      type: 'flex',
      altText: 'ニュース一覧',
      contents: {
        type: 'carousel',
        // contentsはいったん空にしておく
        contents: [],
      },
    };

    // newsApiRes.articlesを取り出す(分割代入という記法)
    const { articles } = newsApiRes;
    // articles(配列)の長さ分ループを回す
    // 配列の要素がarticleに格納される
    articles.forEach((article) => {
      // Carouselのcontentを作成
      const content = {
        type: 'bubble',
        size: 'kilo',
        hero: {
          type: 'image',
          // nullだったときはダミーのデータを挿入する(三項演算子という記法)
          url: article.urlToImage === null ? 'https://raw.githubusercontent.com/shinbunbun/aizuhack-bot/master/media/imagemap.png' : article.urlToImage,
          size: 'full',
          aspectMode: 'cover',
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              weight: 'bold',
              size: 'sm',
              wrap: true,
              // nullだったときはダミーのデータを挿入する
              text: article.title === null ? 'No title' : article.title,
            },
            {
              type: 'text',
              // nullだったときはダミーのデータを挿入する
              text: article.publishedAt === null ? 'No publishedAt' : article.publishedAt,
              size: 'xs',
              color: '#a9a9a9',
            },
            {
              type: 'text',
              // nullだったときはダミーのデータを挿入する
              text: article.description === null ? 'No description' : article.description.substring(0, 100),
              size: 'sm',
              wrap: true,
            },
          ],
          spacing: 'md',
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'button',
              action: {
                type: 'uri',
                // nullだったときはダミーのデータを挿入する
                uri: article.url === null ? 'https://example.com' : article.url,
                // nullだったときはダミーのデータを挿入する
                label: article.source.name === null ? 'No article source name' : article.source.name,
              },
              style: 'primary',
            },
          ],
        },
      };
      // contents(配列)にcontentを追加
      message.contents.contents.push(content);
    });
    return message;
  },

  //この先追加部分　（ヘルプなどもつけてみるといいかも）
  攻略: () => ({
    type: 'flex',
    altText: 'Abyss',
    contents: {
      type: "bubble",
      size: "mega",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "グランドアビス完全攻略",
            color: "#FFFFE0",
            weight: "bold",
            style: "normal",
            size: "lg"
          },
        ],
        backgroundColor: "#FF00FF"
      },
      hero: {
        type: "image",
        url: "https://fukugyou-kakkiblog.com/wp-content/uploads/2024/06/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2024-06-13-220905.jpg",
        size: "full",
        margin: "none",
        gravity: "top",
        position: "relative",
        offsetEnd: "none",
        offsetStart: "none",
        offsetTop: "none",
        offsetBottom: "none"
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "にゃんこ大戦争のイベント",
            size: "md"
          },
          {
            type: "text",
            text: "「グランドアビス」の備忘録"
          },
          {
            type: "text",
            text: "（再度見る時はボタンを押してね）"
          }
        ],
        margin: "none",
        spacing: "none"
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "message",
              label: "概要",
              text: "概要"
            },
            style: "secondary",
            color: "#32CD32",
            margin: "none"
          },
          {
            type: "button",
            action: {
              type: "message",
              text: "注意点",
              label: "注意ポイント"
            },
            style: "secondary",
            margin: "md",
            color: "#808000"
          },
          {
            type: "button",
            action: {
              type: "message",
              label: "多少のコツ",
              text: "テクニック"
            },
            margin: "md",
            style: "secondary",
            color: "#E6E6FA"
          },
          {
            type: "button",
            action: {
              type: "message",
              label: "階層別アドバイス",
              text: "階層"
            },
            color: "#FFD700",
            margin: "md",
            style: "secondary"
          },
          {
            type: "button",
            action: {
              type: "uri",
              label: "参考サイト（ここ見た方が早い）",
              uri: "https://seesaawiki.jp/battlecatswiki/d/%C3%CF%C4%EC%CC%C2%B5%DC"
            },
          },
        ],
      },
      styles: {
        hero: {
          separator: true,
          separatorColor: "#000000",
          backgroundColor: "#BDB76B"
        },
        body: {
          separator: true,
          separatorColor: "#1F1E33"
        },
        footer: {
          separator: true,
          separatorColor: "#000000"
        }
      }
    },
  }),

  ヘルプ: () => ([
    {
      type: 'text',
      text: '以下の要素があります\n挨拶：挨拶を返す\n〇〇メッセージ：そのタイプに応じたメッセージを返す\n（例：スタンプ、動画、音声、画像など）\n〇〇テンプレート：ボタン、確認、カルーセルなど\nクイックリプライ：特殊メッセージを返す\n予定：2学期の予定を返す\n天気予報：直近3日分の天気予報\nFlex Message：制作者の名刺表示\nプロフィール：ユーザーの情報を返す',
    },
    {
      type: 'text',
      text: 'データベース：Create,Read,Update,Deleteで管理できます\nメモモード：「メモ開始」と入力、\nその後テキストを入力し、「メモ」と入力でメモを確認できます\nニュース：最近のニュースを確認できます\n蔵書検索：ISBNで本を検索できます\n攻略：作者なりの備忘録を見ることができます\n（データベースを使う機能は現在使えません。ご了承）',
    },
  ]),

  Help: () => ([
    {
      type: 'text',
      text: '以下の要素があります\n挨拶：挨拶を返す\n〇〇メッセージ：そのタイプに応じたメッセージを返す\n（例：スタンプ、動画、音声、画像など）\n〇〇テンプレート：ボタン、確認、カルーセルなど\nクイックリプライ：特殊メッセージを返す\n予定：2学期の予定を返す\n天気予報：直近3日分の天気予報\nFlex Message：制作者の名刺表示\nプロフィール：ユーザーの情報を返す',
    },
    {
      type: 'text',
      text: 'データベース：Create,Read,Update,Deleteで管理できます\nメモモード：「メモ開始」と入力、\nその後テキストを入力し、「メモ」と入力でメモを確認できます\nニュース：最近のニュースを確認できます\n蔵書検索：ISBNで本を検索できます\n攻略：作者なりの備忘録を見ることができます\n（データベースを使う機能は現在使えません。ご了承）',
    },
  ]),

  概要: () => ({
    type: 'text',
    text: 'この備忘録は、にゃんこ大戦争のランキングイベント、地底迷宮グランドアビスの攻略となっています。\n全100ステージの構成となっており、正直面倒…なものです。\nもしかしたら、何かの役にたつかも？',
  }),

  注意点: () => ({
    type: 'text',
    text: '以下から選択してください',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            text: '敵について',
            label: '敵',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '編成について',
            label: '編成',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '罠について',
            label: '罠',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: 'その他留意点',
            label: 'その他',
          },
        },
      ],
    },
  }),

  テクニック: () => ({
    type: 'text',
    text: 'キャラクターの使用優先順位は、超激レアキャラから使うのがベスト。\n理由は、キャラ数が一番多く、あまり使い所のないキャラが多いからである。',
  }),

  階層: () => ({
    type: 'text',
    text: '見たい階層を押してください',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            text: '10階まで',
            label: '10階まで',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '11～30階',
            label: '11～30階',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '31～50階',
            label: '31～50階',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '51～70階',
            label: '51～70階',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '71～90階',
            label: '71～90階',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '91～最深部',
            label: '91～最深部',
          },
        },
      ],
    },
  }),
  //quickreply points
  敵について: () => ({
    type: 'text',
    text: '敵の属性を見るのも大事です。\n特に、ゾンビ、悪魔属性の敵がいるときは強めのキャラを入れることを推奨します。',
  }),

  編成について: () => ({
    type: 'text',
    text: '編成について、ここではキャラを10体編成しないと挑戦ができないため、\n最初のうちは弱めのキャラを多めに、深部になるほど増やしていくのがいいでしょう。\n詳しくは階層別の方でご覧ください。',
  }),

  罠について: () => ({
    type: 'text',
    text: 'ステージクリア時、敗北、撤退時にランダムでキャラが罠にかかります。\nかかる人数も進むごとに増えていきます。たまに救出できることがありますが、\n次のステージの敵に強いキャラか、壁役のキャラを優先しましょう。',
  }),

  その他留意点: () => ({
    type: 'text',
    text: '念の為、クリアに必要なキャラ数の目安を書いておきます。\n大体480～500体ぐらいは必要です。\nこれはかなり長くやっている人か、課金量が物凄い人が持つキャラ数と同じです。\nちなみに製作者は6年やって、560体くらい持っています。',
  }),
  // quickreply floors
  '10階まで': () => ({
    type: 'text',
    text: '最初の階層なため、まだ余裕はあります。\nそのため、このあたりで弱めの超激レアキャラを使ってしまいましょう。',
  }),

  '11～30階': () => ({
    type: 'text',
    text: 'まだ敵はそこまで強くないため、コラボ限定のキャラも使ったほうがいいです。\nコラボは、超激レア以外はあまり使わないためです。',
  }),

  '31～50階': () => ({
    type: 'text',
    text: 'このあたりから、適当に編成を組めなくなってきます。\nまた、メタル属性の敵のために、クリティカルを持つキャラは温存しましょう。',
  }),

  '51～70階': () => ({
    type: 'text',
    text: '50階以降から、罠も敵も強くなり、編成も難しくなります。\nまた、61階から古代属性も出始めるため、対応キャラはここまで温存しておきましょう。',
  }),

  '71～90階': () => ({
    type: 'text',
    text: 'ここから、罠にかかるキャラが増え、キャラ数が問われます。\nまた、悪魔、ゾンビ属性の出現が多くなります。\nこのために、強いキャラは温存すべきでしょう。',
  }),

  '91～最深部': () => ({
    type: 'text',
    text: '最深部まであと少しです。\n敵の強さも最大になり、壁役のキャラがいないと押される可能性が高いです。そのため、できるだけ壁キャラはここまで温存しましょう。\nあとはステージ構成もありますが、それは運です。\n厄介な敵が出ないように、祈っておきましょう。',
  }),

};
