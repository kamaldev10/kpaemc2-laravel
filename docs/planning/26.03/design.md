# Architecture & Design — Sprint 26.03 (CMS Completion & SEO)

## 1. Overview & Modules

- **Categories**: Taxonomies across posts, events, and media galleries (`type: post|event|gallery`).
- **Galleries**: Multi-photo uploads, Cloudinary storage (`gallery-images/`), caption, taken_at, tags.
- **SiteSettings & AboutInfo**: Single-record or key-value configs for contact, social links, mottos, and org history.
- **Contacts**: Visitor messages inbox with read/archived status.
- **SEO & RSS**: Dynamic `/sitemap.xml`, `/feed.xml`, OpenGraph tags, GA4 tracker.

## 2. API & Route Layout

```
/admin/categories             -> CategoryController
/admin/galleries              -> GalleryController
/admin/settings               -> SettingController
/admin/contacts               -> ContactController
/sitemap.xml                  -> SitemapController@index
/feed.xml                     -> FeedController@index
/gallery                      -> Public\GalleryController@index
```
