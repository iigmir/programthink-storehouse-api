# programthink-storehouse-api

This is an interface repository project that stores posts from [编程随想的博客](https://program-think.blogspot.com). You can use interfaces of the project to other projects.

## What is the blog

Familiarise yourself with this dude:

* [enwiki](https://en.wikipedia.org/wiki/Ruan_Xiaohuan)
* [zhwiki](https://zh.wikipedia.org/wiki/%E7%B7%A8%E7%A8%8B%E9%9A%A8%E6%83%B3)

## How to use

There format of API files is: `/{TIMESTAMP}-{BLOG_ID}/{FORMAT}.json`.

* `TIMESTAMP` is an [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) that contents were retrived.
* `BLOG_ID` currently will always be `5235590154125226279`, but you may want to use the project to the other blogs, anyway...
* `FORMAT` can be `info`, `pages`, or `posts`.

## How to contribute

1. Get an Blogger API key and paste it in a created `.env` file at `BLOGGER_API_TOKEN=`.
2. `npm install`
3. `npm start`
4. The posts should be in the `api`  directory.
