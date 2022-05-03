# ArilyQuery

一套osu查询的**文字形式**输出框架，备用于不支持发送图片的平台

## 安装

```bash
npm i ArilyChan/ArilyQuery
```

## 声明

```javascript
const ArilyQuery = require("ArilyQuery");
let aq = new ArilyQuery();
// 可以自定义Api网址
let aq = new ArilyQuery("https://your.own.website/api");
```

## stat

```javascript
let user = await aq.stat({
    user: "candy",
    mode: "osu",
    server: "bancho"
});
console.log(user);
```

## best

```javascript
let best = await aq.best({
    user: "exmisser",
    mode: "mania",
    server: "sb",
    find: {
        date: {
            from: { year: 2020, month: 4, day: 3 },
            to: { year: 2022, month: 4, day: 3 },
        }
    }
}, "min", 15);
console.log(best);
```

## beststat

```javascript
let best = await aq.beststat({
    user: "whitecat",
    mode: "osu",
});
console.log(best);
```

## recent

```javascript
let recent = await aq.recent({
    user: "exmisser",
    mode: "mania",
    server: "sb"
});
console.log(recent);
```

## score

```javascript
let score = await aq.score({
    id: "3539986417",
    mode: "osu",
});
console.log(score);
```

