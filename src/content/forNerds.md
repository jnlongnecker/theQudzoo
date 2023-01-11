# Site Information

---

This page is for those of you who are curious as to how I built the site and the technologies I used.

## Stack

The site primarily makes use of Salesforce's Open Source [Lightning Web Component](https://lwc.dev/) framework since I'm actually a Salesforce trainer and this was the front end framework I am most familiar with. In order to launch the server, the framework makes use of [Node.js](https://nodejs.org/en/) so the server-side code is all written in JavaScript. There is very minimal custom-written server-side code that essentially just amounts to retrieving information about the articles written here at run-time so I don't have to hard-code that information in the components.

The server is hosted by [Heroku](https://www.heroku.com/home), which again as a Salesforce trainer was the platform I am most familiar with since it is also a Salesforce product. It's convenient to upload changes to and maintains the SSL certificate for me so I'm sticking with it.

## Components

All the components are custom-written; I don't use any of the standard components available from Salesforce or any components that were written by anyone else. This site was primarily created for the fun of it as well as to have my advice document hosted in a place that wasn't completely awful. Right now, the components here aren't particularly interesting, but future sections of the website will eventually have some interesting stuff on there.

## Styling

I don't use any third-party CSS libraries like Bootstrap either. All the styling is done totally custom by me, of course with inspiration from various places like the [MDN Web Docs](https://developer.mozilla.org/en-US/) and the official Caves of Qud [wiki](https://wiki.cavesofqud.com/wiki/Caves_of_Qud_Wiki).

## Advice Articles

The advice articles are largely untouched from the text written in the Google Doc. The large changes are from formatting the text into [Markdown](https://commonmark.org/help/) since it's far easier to use and maintain than just plain HTML, and the LWR (Lightning Web Runtime) of the LWC framework has [Nunjucks](https://mozilla.github.io/nunjucks/) templating built into it and automatically converts these Markdown documents into the HTML pages that are rendered on the site. The table of contents component to the right then reads the markdown rendered on the page and creates those navigation landmarks based on the headings.
