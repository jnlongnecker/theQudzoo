# Site Information

---

This page is for those of you who are curious as to how I built the site and the technologies I used.

## Stack

The site primarily makes use of Salesforce's Open Source [Lightning Web Component](https://lwc.dev/) framework since I'm actually a Salesforce trainer and this was the front end framework I am most familiar with. In order to launch the server, the framework makes use of [Node.js](https://nodejs.org/en/) so the server-side code is all written in JavaScript. There is a [MongoDB](https://www.mongodb.com/) database hosted on [MongoDB Atlas](https://www.mongodb.com/atlas/database) to maintain session storage and data the site uses.

The server is hosted by [Heroku](https://www.heroku.com/home), which again as a Salesforce trainer was the platform I am most familiar with since it is also a Salesforce product. It's convenient to upload changes to and maintains the SSL certificate for me so I'm sticking with it.

## Components

All the components are custom-written; I don't use any of the standard components available from Salesforce or any components that were written by anyone else. This site was primarily created for the fun of it as well as to have my advice document hosted in a place that wasn't completely awful. Right now, the components here aren't particularly interesting, but future sections of the website will eventually have some interesting stuff on there.

## Styling

I don't use any third-party CSS libraries like Bootstrap either. All the styling is done totally custom by me, of course with inspiration from various places like the [MDN Web Docs](https://developer.mozilla.org/en-US/) and the official Caves of Qud [wiki](https://wiki.cavesofqud.com/wiki/Caves_of_Qud_Wiki).

## Advice Articles

The advice articles are largely untouched from the text written in the Google Doc. The large changes are from formatting the text into [Markdown](https://commonmark.org/help/) since it's far easier to use and maintain than just plain HTML, and the LWR (Lightning Web Runtime) of the LWC framework has [Nunjucks](https://mozilla.github.io/nunjucks/) templating built into it and automatically converts these Markdown documents into the HTML pages that are rendered on the site. The table of contents component to the right then reads the markdown rendered on the page and creates those navigation landmarks based on the headings.

## Build Maker

This part was a pretty massive undertaking and I had to learn a lot of stuff I'd never touched before. Since I primarily develop on Salesforce; I've been _really_ spoiled when it comes to server side configuration. For this project, I had to learn about all this stuff:

-   Session handling
-   MongoDB
-   Creating REST APIs in Node.js
-   Request caching
-   Environment variables

The builds and user info are stored on a database hosted on MongoDB Atlas, which also houses the session storage. There are two databases on it; one for testing and one for production. In addition to figuring out how all the above works, I also had to dive into the game files and understand how the game creates a build code and handles an input build code. That means I also had to learn how to do that (thanks to the modding page on the wiki).

### Making Codes

I had no experience with compression or working with it before this project, so you perhaps you can sympathize when I dove into the code of the game and it's throwing around encoding and compression methods. My first fear was that I would have to somehow figure out how these methods were compressing and encoding the data to reverse-engineer it, but luckily someone else has already done that work. Node.js provides a library for using GZip, which is the same compression utility that the game uses. The decompressed data then needs to be converted out of base64 and viola, we have a valid JSON file. In order to make build codes the game expects, I simply reverse this process and I get a valid build code (assuming I pass in JSON in the proper format).

The second part of this equation is using JSON in the proper format; and this is quite tricky. There is significantly more data in these JSON files that the game is expecting back than is really feasible to work with as it is since there's a lot of overhead to explain what embark module a particular object is meant to represent. Additionally, the placement of modules differ depending on whether the build is for a True-Kin or a Mutant.

What I did is store template versions of each genotype that would get populated with the users customizations when they made them in the build maker. Once that was filled out, I ship it to the server to compress it into a build code and get back a build code ready to be used in the game. There was a lot of reading JSON to figure out the format the game expected the data to be returned in.
