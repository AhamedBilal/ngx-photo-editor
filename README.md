<p align="center">
  <img  style="text-align: center;" src="https://github.com/Centroida/ngx-image-editor/raw/master/assets/editor.png">
  <h1 align="center">ngx-photo-editor</h1>
</p>

## Getting started

#### Step 1: Install ng-bootstrap

- [ng-bootstrap](https://ng-bootstrap.github.io/#/getting-started)
```bash
   ng add @ng-bootstrap/ng-bootstrap
```

#### Step 2: Install ngx-photo-editor
    
```bash
    npm install ngx-photo-editor --save
```
#### Step 3: Add `bootstrap` file paths in your `.angular.json`
      
```json
}
       "styles": [
         "node_modules/bootstrap/dist/css/bootstrap.min.css"
       ]
}
```

## Example usage:
Add the NgxPhotoEditorModule to the imports of the module.
```js
      import {NgxImageEditorModule} from "ngx-image-editor";

      @NgModule({
        imports: [
          NgxPhotoEditorModule
        ]
      })
```

Add the element to your HTML:
```html

<div><input type="file" (change)="fileChangeEvent($event)"/></div>

<ngx-photo-editor
  [imageChanedEvent]="imageChangedEvent"
  (imageCropped)="imageCropped($event)"
  [aspectRatio]="4/3"
  [viewMode]="3"
  [resizeToWidth]="500"></ngx-photo-editor>

<img [src]="base64" alt="">

```

And add this to your ts file:
```js

import {CroppedEvent} from 'ngx-photo-editor';

export class AppComponent {
  imageChangedEvent: any;
  base64: any;
  
  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: CroppedEvent) {
    this.base64 = event.base64;
  }
}

```

When you choose a file from the file input, it will trigger `fileChangeEvent`.
That event is then passed to the ngxPhotoEditor through `imageChangedEvent` which will load the image into the cropper.
Everytime you release the mouse, the `imageCropped` event will be triggerd with the cropped image as a Base64, Blob in its payload.

## API
All inputs are optional. Either the `imageChangedEvent`, `imageBase64` or `imageFile` or `imageUrl` should be set to load an image into the cropper.

## Inputs

### imageChangedEvent

- Type: `FileEvent`
- Default: `null`

The change event from your file input.

### imageFile

- Type: `File`
- Default: `null`

The file you want to change.

### imageBase64

- Type: `string`
- Default: `null`

If you don't want to use a file input, you can set a base64 image directly and it will be loaded into the cropper.

### imageURL

- Type: `string`
- Default: `null`

If you don't want to use a file input or a base64 you can set an URL to get the image from. If requesting an image from a different domain make sure Cross-Origin Resource Sharing (CORS) is allowed or the image will fail to load. 

### imageFormat

- Type: `string`
- Default: `png`

Output format (png, jpeg, webp, bmp, ico) (not all browsers support all types, png is always supported, others are optional).

### aspectRatio

- Type: `number`
- Default: `1`

Define the fixed aspect ratio of the crop box.

### resizeToWidth

- Type: `number`
- Default: `NaN`

Cropped image will be resized to this width (in px)

### resizeToHeight

- Type: `number`
- Default: `NaN`

Cropped image will be resized to this height (in px) (will be ignored if resizeToWidth is set)

### roundCropper

- Type: `boolean`
- Default: `false`

Set this to true for a round cropper. Resulting image will still be square, use `border-radius: 100%` on resulting image to show it as round.


### imageQuality

- Type: `number`
- Default: `92`

This only applies when using jpeg or webp as output format. Entering a number between 0 and 100 will determine the quality of the output image.

### autoCrop

- Type: `Boolean`
- Default: `true`

Enable to crop the image automatically when initialized.

### `viewMode`

- Type: `Number`
- Default: `0`
- Options:
  - `0`: no restrictions
  - `1`: restrict the crop box to not exceed the size of the canvas.
  - `2`: restrict the minimum canvas size to fit within the container. If the proportions of the canvas and the container differ, the minimum canvas will be surrounded by extra space in one of the dimensions.
  - `3`: restrict the minimum canvas size to fill fit the container. If the proportions of the canvas and the container are different, the container will not be able to fit the whole canvas in one of the dimensions.

Define the view mode of the cropper. If you set `viewMode` to `0`, the crop box can extend outside the canvas, while a value of `1`, `2` or `3` will restrict the crop box to the size of the canvas. A `viewMode` of `2` or `3` will additionally restrict the canvas to the container. Note that if the proportions of the canvas and the container are the same, there is no difference between `2` and `3`.
