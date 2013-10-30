jQuery Smart Vimeo Embed
==================

Add Vimeo videos to your website using only their ID. Automatically retrieves
the video thumbnail, and only loads videos when they are clicked, maximizing
page performance.

## Usage

Include script after the jQuery library:

```html
<script src="/path/to/jquery-smartvimeoembed.min.js"></script>
```

Include supplied CSS for play icon, either with a link tag or by copying into your site's
CSS. You can use a custom play icon by updating the CSS.

```html
<link rel="stylesheet" href="css/jquery-smartvimeoembed.css" type="text/css" />
```

Create a placeholder image with a **data-vimeo-id** attribute containing the Vimeo ID.

```html
<img src="http://placehold.it/640x360" class="vimeo-thumb" data-vimeo-id="1084537" />
```

Call script, supplying your images to the plugin.

```javascript
$('.video-thumb').smartVimeoEmbed();
```

This plugin will replace your placeholder images with thumbnail images from
Vimeo, add a play icon overlay, and set up a click handler which will load the
Vimeo video when activated.

### Options

* **width**: (optional) Set width in pixels of video player and thumbnail. Height will scale proportionally. (default: 640)
* **autoplay**: (optional) Determine whether video should play automatically when
activated (default: true)
* **onComplete**: (optional) Callback function to fire after AJAX request
completes. Fires once for each video.
* **onError**: (optional) Function to run if AJAX request fails.


### Browser Support

This plugin has been tested and works in IE8/9, modern versions of Chrome, Firefox, and
Safari.
