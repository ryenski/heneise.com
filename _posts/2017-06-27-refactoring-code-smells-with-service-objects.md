---
title: Refactoring code smells with service objects
subtitle: Service objects are a powerful tool for cleaning up code duplication, fat models, and bloated controllers.
date: 2017-06-27 00:00 CST
tags: Ruby on Rails
image: /assets/images/2017-06-27-refactoring-code-smells-with-service-objects/hero.jpg
layout: post
published: false
---

<em>This article accompanied a talk that I gave at Austin on Rails June 27, 2017. </em>

Rails developer are known to be keenly aware of our code quality. We follow Rails' conventions, we implement best practices, we monitor security, and we test our code. We take pride not only in the finished product, but in the quality of the code that we shipped.

Almost every app has room for improvement. Even apps that we've worked on ourselves can sometimes succumb to time or budget constraints and end up with code that... shall we say, isn't the best quality. This shortcoming usually manifests itself as a <a href="https://blog.codinghorror.com/code-smells/">code smell</a>.

Code smell refers to issues in working code that may be indicative of a deeper problem. It's not that the code doesn't work, but something about it just doesn't feel right. Maybe your ActiveRecord model is starting to get really long, or your controller has non-REST routes, or you find yourself tracking session variables through your model code.

There are many techniques for refactoring code smells, but one of my favorite is <strong>service objects</strong>.

A service object is simply a PORO (plain old Ruby object) that does something and then returns a result. As a Rails developer it’s easy to forget that we’re Ruby developers first. It’s easy to get stuck thinking that the Rails MVC framework is immutable and forget that we really are working with Ruby. Since we’re working with Rails, if we’ve got code it has to go in one of Rails’ 4 places - model, view, controller, or helper, right?

No so - in fact doing this is a surefire way to end up with a bloated app full of spaghetti controllers and bloated models. Ruby, being an Object Oriented language, lets us create any kind of object we want. We’re not stuck with Rails’ default objects.

This isn’t really a talk about refactoring, but as you’re working on your project it’s a good idea to always see if you can simplify any part of your project that you happen to be working on.

### What is a Service Object?

A service object is an object that encapsulates some discrete piece of business logic in your app, does something to it, and then returns a result. Service objects usually follow a few conventions:

* Initializes a new object with some value.
* Contains a single public <code>call</code> method that does something.
* Does not store state.
* Returns a result object (not a boolean or a class).


### Types of Service objects

In general, I've seen three types of service objects, though there might be more:

1. Creators: creates and saves objects to the database when the process is more complicated than simply persisting a model record. Example would be creating a new customer, setting up an account, saving sample data to their account, and sending notifications.
2. Updaters: update a record and also do some other work. For example, updating a record and then communicating with third-party APIs.
3. Workers: a task that gets triggered when something happens in the background. The trigger might be handled by ActiveJob, but the actual processing might be handed off to a service object.


### vs. Concerns

ActiveSupport already has a wonderful built-in tool called Concerns. Shouldn't we use that instead?

Depends. The chief difference between <code>ActiveSupport::Concerns</code> and service objects is that concerns are modules that are intended to be mixed into other classes, while service objects are classes that can be instantiated. Concerns are used when there is shared functionality among several classes. By contrast, service objects are discrete objects that do not live within another class.

### How do you know when you need one?

If you start to notice code smells, you probably need to think about refactoring. A few code smells that you're looking for include:

* Performing business logic inside ActiveRecord Models.
* Extra methods inside a controller.
* Non-restful routes.
* Using global variables inside models (<code>User.current_user</code>).

Specifically, the biggest candidate for service objects are when you find “god objects”. God objects are objects that know too much or does too much. A great example of overuse of god objects is <a href="https://github.com/discourse/discourse">Discourse</a>. Discourse. Not knocking Discourse at all - it’s a great product. But it’s a pretty extreme example of how god objects can rear their ugly heads when Single Responsibility Principle is not observed. Take a look at the <code>app/models</code> directory - there are 165 models, which isn’t necessarily a bad thing in itself. But there are over 18k lines of code there, and the largest, <a href="https://github.com/discourse/discourse/blob/master/app/models/user.rb">user.rb</a> and <a href="https://github.com/discourse/discourse/blob/master/app/models/topic.rb">topic.rb</a> have 1140 and 1288 lines of code each. That’s a big model by any standard. You can bet that those models do a lot more than just talk to the database.

In <a href="http://refactoringrails.io">one of his talks Ben Orenstein</a> had a simple test to find code smells - just do a line count of your models (<code>wc -l app/models | sort</code>), and see what the largest models are.

Ideally an ActiveRecord model just does one thing - provides an interface to the database. There are lots of things you can put into an <code>ActiveRecord</code> model to express intent, like scopes, relationships, etc. But there’s a fine line somewhere, and you know when you've crossed it because the code starts to smell.

The smell that you're looking for is multiple responsibilities. Single Responsibility Principle states that each object or class "should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class" (<a href="https://en.wikipedia.org/wiki/Single_responsibility_principle">Wikipedia: Single responsibility principle</a>). In one example that we'll look at below, we'll create a new tenant in our database, along with a user, we'll talk to Stripe, send data to our analytics dashboard, and send notifications.Each of those is a separate responsibility, and so we'll extract each out into it own service object.

### Is refactoring really worth it?

We've all worked on apps where all that functionality lives in a controller, or is spread throughout the controller and one or more ActiveRecord models. Those are a nightmare to work on. A few hours of refactoring can yield an improvement both in terms of maintainability—the next time a developer opens up the app it'll be easier to understand what's going on, and testability—you'll be confident that the code you're delivering works as expected and any exceptions will be handled correctly.


## Nuts &amp; Bolts

### Setting Up

It's very easy to set up service objects. You can place your files in <code>RAILS_ROOT/app/services</code>, and Rails will automatically load any `*.rb` files in that directory.

### Initializing

Since a service object is just a PORO (plain old Ruby object) we can set it up and initialize it just like any other object.

<script src="https://gist.github.com/crispinheneise/d2cc7a4db95a1daa792d51a2cab003b0.js"></script>

### Calling

Though there's no hard and fast rule, a common convention is to expose a single public method called <code>call</code> to do the work inside your object. You can name this method whatever you want (I've see it named <code>process!</code>). I like to use <code>call</code> because it is more generic. Except in rare cases I use the same method name in all my service objects. That way I don't have to go digging through my files trying to remember what the method is called.

To call your object, you'd first instantiate it and then call it, like this: <code>UserCreator.new(params).call</code>.

If you like, you can also define a <code>call</code> class method. This would allow you to call the object directly: <code>UserCreator.call(params)</code>.

<script src="https://gist.github.com/crispinheneise/72cad7bebc04c48908ed226398515188.js"></script>

### Processing

I like to keep my public <code>call</code> method as clean as possible. To that end, I'll extract any functionality from <code>call</code> into other methods, or if it makes sense, into other service objects.

<script src="https://gist.github.com/4696ceb81461e9e4557259c3de2d5fc8.js"></script>

In our <code>MessageCreator#call</code> we're using the <code>process!</code> method to do the actual work. If the message is saved successfully, it calls <code>deliver_messages</code>. Otherwise, it adds errors to the <code>errors</code> array and returns. If our <code>call</code> method becomes more than a few lines long it's a cue that our service object itself may need to be refactored.

### Returning

It's tempting to return a boolean value, or the class that you're working on. For example if you're creating an object, a boolean would allow you to see if your process succeeded or failed. But it wouldn't tell you much more than that - why did it fail? Were there any errors? Was there an exception?

Likewise, returning the object that you were working on can be problematic. What if you need to return multiple objects? Doing this will lead to an inconsistent API and have you sorting through spaghetti code for the rest of your life.

That's why I like to return a consistent <code>result</code> object. This object contains a <code>success?</code> boolean, an array of errors (empty by default), and any objects that were operated on. This keeps the API consistent among various service objects, gives me confidence that I can operate on the results of a service object, and makes it easier to test.

<script src="https://gist.github.com/42c2c40751dc73910f5de925ee338eda.js"></script>

In the <code>WidgetCreator</code> example we're returning a <code>result</code> object. We can then tell if the operation was successful or not through <code>success?</code>, we can access any errors through <code>errors</code>, and we can get the actual widget object.

### Calling other service objects

Once you start calling other service objects, you'll start to appreciate that consistent API. Take a look at this example, which is trimmed-down from an actual production app.

<script src="https://gist.github.com/c43250e8e05a79ccb3c8869088798c9f.js"></script>

First of all, TenantCreator calls <code>persist!</code>. Then it makes a new instance of <code>Billing::SubscriptionCreator</code> (another service object).

<code>subscription_creator</code> delegates to a new instance of <code>SubscriptionCreator</code>. If either <code>tenant.save</code> or <code>subscription_creator.call</code> fails (maybe their credit card was expired), it will return a result object where <code>success?</code> is <code>false</code>. It'll then add the subscription errors to this object's errors array, halt execution, and return the failure.

Otherwise, it'll proceed. It sends messages through the SignupMailer (just a regular Rails mailer), talks to the AnalyticsTracker, and seeds the data.

This keeps our SignupController nice and lean:

<script src="https://gist.github.com/84739200f4f3941df1bb5ae9a15553c1.js"></script>

### Testing

Service objects are quite easy to test. In fact, it's probably a lot easier to test a service object than it is to test all the different possible permutations and outcomes in a spaghetti controller.

<script src="https://gist.github.com/a6336c43afc503034d75fab0d0733092.js"></script>

Most of the time it's only necessary to test the single public method of your service object. You're testing various inputs and checking that the output is what you expect.

Should you find yourself needing to test your object's private methods, consider whether that itself is a code smell. Is the service object managing more than one responsibility? Consider splitting it into other objects.
<h1>Best practices</h1>
Service objects are pretty free-form, so there's a lot you can do with them. However that freedom can also lead to trouble unless you follow a few conventions.

### Only one public method

* Consistent API among all your service objects.
* Allows easy testing—only test the public method.

### Returning consistently

* Return a result object, rather than raising exceptions.
* Respond to `success?`.
* Include any errors in the return object.

### Handling errors & exceptions

* It's better to return a value rather than raise an exception.
* Exceptions interrupt the flow of execution.
* Exceptions can cascade, making debugging harder.
* If you need to raise an exception, mix in a concern instead of an object.

### Naming conventions

* Name service objects for the job that they do.
* Use verbs instead of nouns:
  * It sounds awkward to have a `CreateUser`.
  * It's much more natural to have an instance of `UserCreator`.

## More on Service Objects 

Service Objects are just one of many different kinds of object-oriented programming techniques that can help you make your projects more maintainable, more testable, and safer. We could also talk about Presenters, Decorators, Listeners, Form objects, Query objects, and more. I highly recommend Ben Orenstein's talk on [Refactoring from Good to Great](http://refactoringrails.io). Also check out these delicious links, many of which provided background for this article:

* [Wikipedia: God object](https://en.wikipedia.org/wiki/God_object)
* [Wikipedia: Single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
* [Coding Horror: Code Smells](https://blog.codinghorror.com/code-smells/)
* [The 3 Tenets of Service Objects in Ruby on Rails](https://hackernoon.com/the-3-tenets-of-service-objects-c936b891b3c2)
* [MultiThreaded: Anatomy of a Rails Service Object](http://multithreaded.stitchfix.com/blog/2015/06/02/anatomy-of-service-objects-in-rails/)
* [EngineYard Blog: Using Services to Keep Your Rails Controllers Clean and DRY](https://blog.engineyard.com/2014/keeping-your-rails-controllers-dry-with-services)
* [HackerNoon: Service Objects in Ruby on Rails…and you](https://hackernoon.com/service-objects-in-ruby-on-rails-and-you-79ca8a1c946e)
* [HackerNoon: Going further with Service Objects in Ruby on Rails](https://hackernoon.com/going-further-with-service-objects-in-ruby-on-rails-b8aac13a7271)
* [HackerNoon: The 3 Tenets of Service Objects in Ruby on Rails](https://hackernoon.com/the-3-tenets-of-service-objects-c936b891b3c2)
* [NetGuru: Service objects in Rails will help you design clean and maintainable code. Here's how.](https://www.netguru.co/blog/service-objects-in-rails-will-help)

### ActiveSupport::Concerns

* [RichOnRails: Code Concerns in Rails 4 Models](https://richonrails.com/articles/rails-4-code-concerns-in-active-record-models)
* [Signal v. Noise: Put chubby models on a diet with concerns](https://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns)

### Query Objects

* [Crafting Ruby: Delegating to Query Objects through ActiveRecord scopes](http://craftingruby.com/posts/2015/06/29/query-objects-through-scopes.html)

### Presenters

* [Jay Fields' Thoughts: Rails: Presenter Pattern](http://blog.jayfields.com/2007/03/rails-presenter-pattern.html)
* [Nithin Bekal: Presenters in Rails](http://nithinbekal.com/posts/rails-presenters/)
* [Nick Sutterer: On Rails 5, Presenters And Form Objects.](https://apotonick.wordpress.com/2015/05/21/on-rails5-presenters-and-form-objects/)
