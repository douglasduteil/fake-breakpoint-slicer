<img alt="an egg slicer" src="http://i.imgur.com/GmQNEMG.jpg" align="right">

Breakpoint Slicer
=================

**Fork of [Breakpoint Slicer][4] with a humanized approach.**


Along with Respond To, Breakpoint Slicer is an alternative syntax for [Breakpoint][1]. It offers a powerful yet very simple way to slice your media queries.

Just list your breakpoints and Breakpoint Slicer will magically turn them into slices. You can address the with their sequence numbers:

    $slicer-breakpoints: (
        xsmall : 0,       // Extra small screen size
        small  : 400px,   // Small screen size
        medium : 600px,   // Medium screen size
        large  : 800px,   // Large screen size
        xlarge : 1050px,  // Extra large screen size
    ) !default;
    //                   0        400px      600px     800px     1050px       ;
    // Slice numbers:    |    1     |    2    |     3    |    4    |    5     →
    // Slice names:      |  xsmall  |  small  |  medium  |  large  |  xlarge  →

    // Set a media query
    @include at(medium) {
      // Styles inside here will be applied when
      // browser window width is somewhere between 600px and 800px
    }

Concept
-------

Imagine the breakpoints of your site on a scale:

     Breakpoint:   0                 400px     600px     800px       1050px
                   ├───────────────────┼─────────┼─────────┼───────────┼─────────>

See those spans between breakpoints? Let's name them "slices".

Breakpoint Slicer numbers the slices sequentially:

     Breakpoint:   0                 400px     600px     800px       1050px
                   ├───────────────────┼─────────┼─────────┼───────────┼─────────>
     Slice #:                1              2         3          4          5

And allow you to name it the way you want

     Breakpoint:   0                 400px     600px     800px       1050px
                   ├───────────────────┼─────────┼─────────┼───────────┼─────────>
     Slice #:             xsmall          small    medium      large       xlarge
        or
     Slice #:          smartphones      portrait   landscape   desktop    big-desktop

The goal of Breakpoint Slicer is to let you quickly set breakpoints using real names instead of px/em values or numbers.


### Enter the mixins

Breakpoint Slicer offers four handy mixins that let you set breakpoint ranges easily: `at`, `from`, `to` and `between`:

Styles under `at(m)`           are applied when browser window width is inside the _"medium screen"_ slice.

Styles under `from(m)`         are applied when browser window width is inside the _"medium screen"_ or larger.

Styles under `to(m)`           are applied when browser window width is inside the _"medium screen"_ or smaller.

Styles under `between(s,l)`    are applied when browser window width is inside the _"small screen"_, _"large screen"_ slice or any slice between the two (if any).

     Breakpoint:   0                 400px     600px     800px       1050px
                   ├───────────────────┼─────────┼─────────┼───────────┼─────────>
     Slice #:                xs        ·    s    .    m    .     l     ·    xl
                   ·                   ·         ·         ·           ·
                   ·                   ·         ·  at(m)  ·           ·
                   ·                   ·         ├─────────┤           ·
                   ·                   ·         ·         ·           ·
                   ·                   ·         · from(m) ·           ·
                   ·                   ·         ├───────────────────────────────>
                   ·                   ·                   ·           ·
                   ·                   ·            to(m)  ·           ·
                   ├───────────────────────────────────────┤           ·
                                       ·                               ·
                                       ·         between(s, l)         ·
                                       ├───────────────────────────────┤

Note that the max-width of your site's container should be somewhere in the fifth slice.

### Comparison between Breakpoint Slicer and vanilla Breakpoint

Slicer usage       | Breakpoint equivalent         | The resulting media query
------------------ | ----------------------------- | ------------------------------------------
at(m)              | breakpoint(601px 800px)      | (min-width: 601px) and (max-width: 800px)
from(m)            | breakpoint(601px)             | (min-width: 601px)
to(m)              | breakpoint(max-width 800px)   | (max-width: 800px)
between(s, l)      | breakpoint(401px 1050px)      | (min-width: 401px) and (max-width: 1050px)


### Edge cases

Note that the last slice does not have a right edge. When it is invoked, the media query will have no max-width value.

Some mixins become synonomous when used for the last slice:

     Breakpoint:   0                 400px     600px     800px       1050px
                   ├───────────────────┼─────────┼─────────┼───────────┼─────────>
     Slice #:                xs        ·    s         m         l      ·    xl
                                       ·                               ·
                                       ·                               ·  at(xl)
                                       ·                               ├─────────>
                                       ·                               ·
                                       ·                               · from(xl)
                                       ·                               ├─────────>
                                       ·
                                       ·                  from(s)
                                       ├─────────────────────────────────────────>
                                       ·
                                       ·               between(s, xl)
                                       ├─────────────────────────────────────────>

…and some become meaningless (in these cases media query is omitted):

     Breakpoint:   0                 400px     600px     800px       1050px
                   ├───────────────────┼─────────┼─────────┼───────────┼─────────>
     Slice #:      .         xs             s         m          l          xl
                   ·
                   ·                                                      to(xl)
                   ├─────────────────────────────────────────────────────────────>
                   ·
                   ·      from(xs)
                   ├─────────────────────────────────────────────────────────────>


### Demo

Comming soon...

Installation
------------

Get it with [Bower][3].
Not official for now...

```
bower install --save-dev douglasduteil/breakpoint-slicer
```


Usage
-----

Import it with [Breakpoint][1].

```
@import
  "bower_components/breakpoint-sass/stylesheets/_breakpoint.scss",
  "bower_components/breakpoint-slicer/stylesheets/_breakpoint-slicer.scss"
```

Enlist your breakpoints in the `$slicer-breakpoints` map variable:

    $slicer-breakpoints: (
        xsmall : 0,  // Extra small
        small  : 768px,  // Small
        medium : 992px, // Medium
        large  : 1200px,  // Large
    )

If you don't do that, defaults are used (these were the defaults).
**Pay attention to the order of the points !**

### Basic usage

Then you can use Breakpoint Slicer's mixins the same way as you use the Breakpoint mixins:

    .element {
      @include at(medium) {
        // Code from this block will only be applied to .element
        // when browser window width is between 992px and 1200px.
        background-color: red;

        // This is a mixin from Singularity
        @include grid-span(2, 4); } }


### Preventing slices from overlapping

Breakpoint Slicer used to produce overlapping media queries, e. g. 400px—600px and 600px—800px overlap at 600px.

To prevent this, the `$slicer-anti-overlap-corrections` configuration variable was introduced:

  * If it's set to `1px`, the left edge of each slice will be incremented by 1px, e. g. 401px—600px and 601px—800px.
  * If it's set to `-1px`, the right edge of each slice will be decremented by 1px, e. g. 400px—599px and 600px—799px.

The value of 1 is optimal for pixels but may be inappropriate for relative units like ems: a 1em-wide gap between slices might render you site unstyled at certain screen widths.

If you want anti-overlapping for units other than px, you can add them to `$slicer-anti-overlap-corrections` like this:

    $slicer-anti-overlap-corrections: 1px, -0.1em, -0.1rem

Keep in mind that using an overlap correction for relative values will most likely result in a gap instead of an overlap. This could be resolved by taking base font size into consideration and calculating a correction that would be equal to 1px, but Breakpoint Slicer is not yet capable of that.

The default value for `$slicer-anti-overlap-corrections` is `1px`.


License
-------

Licensed under MIT/GPL.

- GPL2 license: http://www.gnu.org/licenses/gpl-2.0.html
- MIT license: http://www.opensource.org/licenses/mit-license.php


[1]: https://github.com/Team-Sass/breakpoint
[2]: http://susy.oddbird.net/
[3]: http://bower.io/
[4]: https://github.com/lolmaus/breakpoint-slicer
