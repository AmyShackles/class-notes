# Project Temporarily Suspended

### Been working on trying to come up with the cause of the leak for days now.  Going to attach screenshots taken of the Dominators view by Call Stack in Firefox DevTools.

#### New plan of attack will be to temporarily abandon this project in favor of starting a new Gatsby project from scratch to see if the problem exists in the Gatsby source files themselves or if it's coming from one of the plugins.

Update: Problem present in site created with Gatsby new.

Current theory is the reason this site is so broken is that there’s a circular reference somewhere exacerbating the underlying memory leak problem, which I’ve been informed is a common issue in front-end development (though I really hope that’s not the case as it’s a bit horrifying to think about).

My computer’s actually acting up a bit (mayhap related), so don’t know how much forward progress can be made on this front in the near future. 
