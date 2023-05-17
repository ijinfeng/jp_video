## 脚本描述
国开大学一网一平台，视频网课超高倍速播放，自动切换

[项目仓库](https://github.com/ijinfeng/jp_video)

## 使用
> 注意在使用前请先确保脚本处于启用状态，具体可以搜索油猴脚本使用教程。

打开某一课程的学习页面，选择一个专题，比如我打开了[中国近代史纲要](https://lms.ouchn.cn/course/50127/learning-activity/full-screen#/4206581)这么课的视频专题页，如果看到右下角又个**国开网课脚本**小窗口，那么说明脚本是有效的。

![window](./s_img.jpeg)

### 1、播放倍率
表示视频的播放速度，默认为16.0，也是最大播放速率。如果你发现不生效，可以改成小点的值试试

### 2、从最新项开始播放
脚本会扫描当前专题下展开的视频列表，并选择加锁前的那一个视频开始播放，播放完后自动解锁下一个视频。期间不需要额外操作，解锁下一个视频后脚本会自动选中下一个视频并播放。

### 3、从选中项开始播放
脚本会扫描当前专题下展开的视频列表，并选择当前选中的那个视频开始播放，如果当前打开的视频列中没有选中项，选最后一项播放，播放完后自动解锁下一个视频。期间不需要额外操作，解锁下一个视频后脚本会自动选中下一个视频并播放。

### 4、停止运行脚本
停止运行脚本，一些自动化操作将不再执行。

## 协议
本软件使用MIT协议

Copyright (c) 2023 ijinfeng <851406283@qq.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.