# aznoqmous/masonry

_Masonry for the lazy people_

## How to

### With javascript
Create a new instance of Masonry via `javascript`

```js
import Masonry from "masonry"

const container = document.getElementById("#myContainer")
new Masonry(container)

```

### Without javascript
Simply add `masonry` class name to your container !
```html
<div class="masonry">
    <div>some content</div>
    <div>with variable height</div>
    <div>and not ordered by columns or whatelse</div>
    <div>really just a list</div>
    <div>of elements !</div>
</div>
```

## CSS will take it from here !
```css
#myContainer {
    columns: 3; /* Number of columns of your masonry grid*/ 
    gap: 1rem; /* The gap between columns / elements */
}

/* Media query support */
@media (max-width: 740px){
    #myContainer {
        columns: 2;
        gap: 0.5rem;
    }
}
```

## Add elements to the container via javascript
You can also add element to your container afterward (eg: for dynamically fetched elements) using `masonry.append` method :

```js
const masonry = new Masonry(document.getElementById('#myContainer'))
masonry.append(newElement)
```

But you can also simply append to your container and `Masonry` will handle : 

```js
const container = document.getElementById('#myContainer')
const masonry = new Masonry(container)
container.appendChild(newElement)
```