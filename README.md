### This is a repository for the application hosting a few of my class/book notes.

I hope to continue to port over notes from my other repository to this one in order to allow them to be available in a more readable format.

The application is currently available at: https://notes-for-great-good.netlify.com/

Website currently deployed is a rollback version of the website as I’ve discovered a weird bug that I haven’t yet pinpointed the origin of. Whenever I open DevTools on a page, it crashes the Chrome browser I’m using. Hopefully this is an easy fix, but it’s going to have to be a fix for another day.

Path to present:
Noticed that when I clicked from one page to another and back multiple times, the heap grew in size, which was unpredicted.  Discovered this accidentally when trying to dev tool to fix styling and found that my own website was consistently crashing my browser.

At first I thought it might have something to do with gatsby-offline and service workers, but I've employed the remove-serviceworkers plugin and the problem persists.

Thought it might have something to do with the way that react-emotion was importing/exporting CSS styling, so removed that in its entirety in favor for CSS files.  But the problem persists.

Thought it might have something to do with gatsby-image as the majority of the detatched HTML I saw in DevTools originated in a gatsby-image-wrapper.  But I've removed gatsby-image in favor of regular <img> tags and the problem persists.

Think I'm going to have to take a break from this for a few days for my own sanity and because I'm really tired of whatever browser I'm running crashing on me consistently.

This application was made using https://github.com/justinformentin/gatsby-v2-tutorial-starter
