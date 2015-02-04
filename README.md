Vin65 One Click Setup
=============

## App setup
Configure your auth.js authentication file, there should be a *authentication.js.example file
`cd server/casper/designerLaunch`

## Using One-Click

Install PhantomJS `http://phantomjs.org/download.html`
Install CasperJS `http://casperjs.org/`
Install Bower run: `npm install -g bower`
Install Grunt run: `npm install -g grunt-cli`

Inside of One-Click install npm dependencies:
`npm install`

Once that completes, run:
`bower install`

And run Grunt's server for live-reload on saved changes with:
`grunt serve`
