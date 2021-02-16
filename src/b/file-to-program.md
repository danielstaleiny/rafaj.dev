---
title: File to program
layout: blog.njk
date: 2021-01-14
posttype: blog
tags:
  - blog
  - post
description: Programs which takes input from a file safe time, compare to ui based programs needing to redo a lot of work.
---


When I was younger, I used to think of people who used command line, and complicated files to produce some kind of output, that they are just kind of weird people making it harder for themselfs. I couldn&rsquo;t understand that you would use less pretty interface to write something to file instead of using pretty ui to do something.


## REST CALLING API programs

I used to use think Postman was great tool for hitting API manualy and there would not be other way to improve it. Well, yes there could be faster program, or maybe desktop application instead of web UI but that is it. Oh, I was wrong.

I switched from atom to emacs while back and I run into this [REST client](https://github.com/pashky/restclient.el.)
 What is great about this, that it supports multiline variables and you can compose your endpoint, so if you want to hid production or dev environment and the only difference is root url, you can simply edit the variable and you are good to go. The sheer speed of looking for endpoint needed with simple search find cannot be compare to any other UI. Simply working in file within your editor where you spent most of your day anyway is good bless. You prefer vim keys ? well you can use them because you are using just another file, do you want to hit endpoint simple M-x(Execute) restclient-http-send-current which returns you json. Of course you can also bind it to keypress combination.


## File to program

What I like about working in file, what ever syntax it is. I like the simplicity and reusing everything what I learned and setup in my own working environment and use that in file to generate something. Do you want make pdf thesis ? well, you can use LaTeX and generate PDF out of it. Do you need to reffer other scientific papers, keep list with Bibtex and autogenerate the rest. Don&rsquo;t like LaTeX ? There is other format called Org-mode which you can use to write your document and fallback to LaTeX when needed, and best part it is as simple as Markdown.

There are other programs which consume some kind of file with some kind of syntax, and I bet they are more pleasent to work with than any kind of fancy UI, and faster too. Speed is adictive and be able to copy and modify, or abstract to function is the best feeling when trying to do something complicated.


## List of suggested programs which are file based.

-   Org-mode (basically can create anything, even graphs, and generate any result from any programming language)
-   Restclient.el
-   Magit (text based git ui)
-   [PostgREST](https://github.com/PostgREST/postgrest) is API for your PostgreSQL database and the best part, is that you need to just write couple of SQL queries and REST API is generated for you.
-   Diagrams ? [org-diagram ](http://lgfang.github.io/computer/2015/12/11/org-diagram)
-   Need to convert some file to other file ? <https://pandoc.org/>

