# Lrdcom External Docs
*For adding docs to our [external site](http://ryanschuhler.github.io/lrdcom-recipes/)*

## Table of Contents
1. [Setting Up](#setting-up)
2. [Updating Existing Docs](#updating-existing-docs)
3. [Creating New Docs](#creating-new-docs)
4. [Seeing Changes Locally](#seeing-changes-locally)

## Setting Up
1. Run `npm install` on the root to install all dependencies. 
2. Run `gulp`. 

*It's now watching for changes.*

## Updating Existing Docs
1. Make sure gulp is running. See [Setting Up](#setting-up).
2. Make changes in `/documentation`
3. Add and push changes to git.

*See them live at the [external site](http://ryanschuhler.github.io/lrdcom-recipes/)*

## Creating New Docs
1. Make sure gulp is running. See [Setting Up](#setting-up).
2. Make new `.md` file in `/documentation`.
3. Add it to `navigation.html` in `/src/templates/` (follow pattern)
4. Add and push changes to git

*Soon to be deprecated in favor of automatically generated nav*

## Seeing Changes Locally
If you want to see changes locally before pushing to live, run `python -m SimpleHTTPServer` on the root and head to `localhost:8000`