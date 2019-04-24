### This is a repository for the application hosting a few of my class/book notes.

I hope to continue to port over notes from my other repository to this one in order to allow them to be available in a more readable format.

The application is currently available at: https://notes-for-great-good.netlify.com/

Website currently deployed is a rollback version of the website as I’ve discovered a weird bug that I haven’t yet pinpointed the origin of. Whenever I open DevTools on a page, it crashes the Chrome browser I’m using. Hopefully this is an easy fix, but it’s going to have to be a fix for another day.

Current theory:  Turned out to not be related to service workers, or I can't seem to figure out how it would.  I've removed the service worker and the problem persists.  Current theory is it might have something to do with one of the -sharp plugins as a heap profile showed space allocated for webp images with no call to free.

This application was made using https://github.com/justinformentin/gatsby-v2-tutorial-starter
