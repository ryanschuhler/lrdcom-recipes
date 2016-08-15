# Lrdcom External Docs
*For adding docs to our [external site](http://ryanschuhler.github.io/lrdcom-recipes/)*

## Table of Contents
1. [Setting Up](#setting-up)
2. [Creating/Updating Docs](#creating-updating-docs)
3. [Seeing Changes Locally](#seeing-changes-locally)

## Setting Up
1. Run `gem install sass` to install [SASS](http://sass-lang.com/install) on computer 
2. Run `npm install` on the root to install all dependencies. 
3. Run `gulp`. 

*It's now watching for changes.*

## Creating/Updating Docs
1. Make sure gulp is running. See [Setting Up](#setting-up).
2. Make changes in `/documentation`
3. Add and push changes to git.

*See them live at the [external site](http://ryanschuhler.github.io/lrdcom-recipes/)*

##Seeing Changes Locally
If you want to see changes locally before pushing to live, run `python -m SimpleHTTPServer` on the root and head to `localhost:8000`