---
title: Ideal Bookmark approach
layout: blog.njk
date: 2021-08-02
posttype: blog
tags:
  - blog
  - post
description: Overview of ideal approach to bookmark websites on the internet.
---
The best approach in my opinion would be have local copy saved of the bookmark, and reference created to that bookmarked website with source and copy. This way you can read website offline if you build your own website with that in mind. You have source, you minimize tracking, and make it accessible to any of you devices. Ideally, you can choose between private and public bookmarks, and have categories / tags for them too.


## How I would design it

There is great open-source tool called [SingleFile](https://github.com/gildas-lormeau/SingleFile) which can be extended to be triggered on action in your browser and extended to be more convenient. The SingleFile tool creates HTML single file which contains everything needed to render website as you would see it in original website. Many folks use archive to persist links on the web, but I think it is better to have control over the links/bookmarks yourself and not rely on 3Th party, no matter how good it is.

Therefore, I would suggest to create SingleFile extension to bookmark websites which automatically create bookmark post on your own website with help of micropub endpoint.

