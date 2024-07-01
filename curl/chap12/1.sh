curl -v -X POST https://api.line.me/v2/bot/message/push \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer mxfofj6kpELLL6gKbByKiNiCAE6Mgy2Q+r7xT3R78Yy/M3NSevHTt3F68d9ftlRES7IesEpIrlnJXZCjSDuxUYnahYDyxV+O6gwMyVXuB6YF4gDto2dx2CtYWCSWFHjJ2dt4tYsGjyo4/14/IaxHmAdB04t89/1O/w1cDnyilFU=' \
-d '{
    "to": "Ub35c27e2cca2cb81174354704fef25e4",
    "messages":[
        {
            "type":"text",
            "text":"Hello, world"
        }
    ]
}'
