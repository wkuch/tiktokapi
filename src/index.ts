import axios from "axios";

import { Browser, Page } from "puppeteer";
import * as TikTok from "./types"


const puppeteer = require('puppeteer');
const puppeteerPrompt = require('prompt');
const readline = require("readline");



export class tiktokPrototype {

  public run() {

    // const browser:Browser = await puppeteer.launch({
    //   headless: false
    // });

    // const page: Page = await browser.newPage();

    // await page.goto('https://www.tiktok.com');
    //   console.log('Page loaded');

    //   await Promise.all([
    //     await page.click( 'button[class="login-button"]')
    //   ]);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let username: string
    let hashtag: string

    rl.question("Tiktok username? ", function (name) {
      rl.question("filter for a specific hashtag? ", function (ht) {
        username = name
        hashtag = ht
        rl.close()
      })

    });

    const listposts = this.listUserPosts;

    rl.on("close", function () {
      listposts(username, hashtag);
    })
  }

  public async listUserPosts(userName: string, hashtag: string) {
    const userReqParams: TikTok.getUserInfoParams = {
      validUniqueId: userName
    }
    let userId = ""
    await axios.get(`/node/share/user/@${userName}`, {
      baseURL: "https://www.tiktok.com",
      headers: {
        "user-agent": "deleter"
      },
      params: userReqParams
    })
      .then(resp => {
        userId = resp.data.userInfo.user.id
      }).catch(error => {
        console.log(error)
      });

    const listparams: TikTok.listPostsParams = {
      count: "30", //default  
      id: userId,
      maxCursor: "0",
      minCursor: "0",
      sourceType: "8"
    }

    axios.get("/api/item_list/", {
      baseURL: "https://www.tiktok.com",
      headers: {
        "user-agent": "deleter"
      },
      params: listparams
    })
      .then(resp => {
        console.log(resp.data.items.filter(post => {
          const re = new RegExp("#" + hashtag, 'gm')
          return post.desc.match(re)
        }))
      }).catch(error => {
        console.log(error)
      });
  }

}

const test: tiktokPrototype = new tiktokPrototype()

test.run();


