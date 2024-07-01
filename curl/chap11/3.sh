curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer mxfofj6kpELLL6gKbByKiNiCAE6Mgy2Q+r7xT3R78Yy/M3NSevHTt3F68d9ftlRES7IesEpIrlnJXZCjSDuxUYnahYDyxV+O6gwMyVXuB6YF4gDto2dx2CtYWCSWFHjJ2dt4tYsGjyo4/14/IaxHmAdB04t89/1O/w1cDnyilFU=' \
-H 'Content-Type: application/json' \
-d \
'{
  "size": {
    "width": 2500,
    "height": 1686
  },
  "selected": true,
  "name": "richmenu-2",
  "chatBarText": "メニュー2",
  "areas": [
    {
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 1250,
        "height": 200
      },
      "action": {
        "type": "richmenuswitch",
        "richMenuAliasId": "richmenu-alias-1",
        "data": "richmenu-changed-to-1"
      }
    },
    {
      "bounds": {
        "x": 0,
        "y": 200,
        "width": 833,
        "height": 1486
      },
      "action": {
        "type": "message",
        "text": "richmenu-2-message"
      }
    },
    {
      "bounds": {
        "x": 833,
        "y": 200,
        "width": 833,
        "height": 1486
      },
      "action": {
        "type": "postback",
        "data": "richmenu-2-postback"
      }
    },
    {
      "bounds": {
        "x": 1666,
        "y": 200,
        "width": 833,
        "height": 1486
      },
      "action": {
        "type": "uri",
        "uri": "https://shinbunbun.info/"
      }
    }
  ]
}'
