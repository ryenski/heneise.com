---
layout: post
title: Pronounceable password generator
date: 2023-05-01 16:40 -0500
---


A much-needed, cleaner update to ye olde [Pronounceable Password Generator]({% link _posts/2010-08-10-pronounceable-password-generator.md %})

{% highlight ruby %}
# app/models/pronounceable_password.rb
class PronounceablePassword
  WORDS = IO.readlines(File.join(Rails.root, 'lib', 'words.txt')).each { |w| w.chop! }

  def self.generate
    WORDS.sample(4).join('-')
  end
end
{% endhighlight %}

Drop your words list in `lib/words.txt`: 

```txt
airy
ally
bold
boss
calm
care
cool
core
cure
cute
...
```

Create a unique but memorable password simply with: 

{% highlight ruby %}
PronounceablePassword.generate
=> "dazzling-nourished-whacko-cute"
{% endhighlight %}
