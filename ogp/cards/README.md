The original version of card images in this directory is copyrighted by:

Copyright © 2011-2016 FLIPFLOPs

The above author never released any guideline on reusing card images.
However, some statements by the author could be regarded as a guideline.
[For example](https://twitter.com/HeartofCrown/status/155530545290424320):

> 低解像度のものなら画像の使用は問題ありません。アイコンなどへの使用は
> 大丈夫です。二次創作や、公式画像の使用についてはガイドラインを設ける
> 予定です。

Therefore, images in this directory are lossily compressed with the
following command:

```sh
convert scanned-image.jpg -resize 9999x240 -gravity North -extent 170x240 -resize 30% -resize 9999x260 -quality 60 lossy-version.jpg
```
