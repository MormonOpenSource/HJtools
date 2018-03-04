# HJtools
The main purpose of this app is to organize the general meetings, goals, thoughts and so on, of the young men organization

## Technologies
* Angular 4
* Ionic 3
* Firebase

## Current features
* List of agendas (Sunday school)
* Create/delete/update agendas
* list of attendance (Sunday school, Mutual, Quorum)
* Create attendance
* Search filter for agendas and attendance list

## TODO

* Delete/update attendance
* Authentication for Young men and leaders
* Role permissions to edit and delete depending on user
* Assign user to a ward and stake

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

## Firebase setup
Get the credentials from firebase console, then create a config-secret.json file inside src/config folder with the same attributes of config-secret.ts interface (from the same folder).

## Contact
* If you want to contribute to this project, new features are accepted through pull request, and please contact me fabtics@gmail.com