---
layout: post
title: Pronounceable password generator
date: 2010-08-10 00:00 +0000
published: true
---
Here’s a neat little snippet of Ruby code for generating pronounceable passwords.

[http://github.com/ryenski/Pronounceable-Password-Generator/](http://github.com/ryenski/Pronounceable-Password-Generator/)

Just call `PasswordGenerator.generate_password!` and you’ll get a nice password like “fantastic-60-lunch”

Of course, you should remind people to change their generated password, but this is useful for resetting passwords and simplifying a signup process.

You can also seed the generator with your own words - just dump a bunch of interesting words into the ‘lib/words.txt’ file.
