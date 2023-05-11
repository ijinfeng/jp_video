(function () {
    function readTitleFromItem(item) {
        if (!item) return null;
        let title = item.querySelector('.activity-title')
        let span = title.querySelector('span')
        let distitle = span.getAttribute('original-title')
        return distitle;
    }

    function isVideo(item) {
        const icon = item.getElementsByClassName('full-screen-activity-icon')[0];
        const ot = icon.getAttribute('original-title');
        console.log(`---------${ot}`);
        return ot === '音视频教材';
    }

    function findCurrentPlayObj() {
        let currentItem = null;
        let nextItem = null;
        let targetIndex = 0;
        let items = document.getElementsByClassName('activity-menu-item')
        let videoItems = []
        for (const item of items) {
            if (isVideo(item) == false) {
                continue;
            }
            videoItems.push(item)
        }
        for (let index = 0; index < videoItems.length; index++) {
            const item = videoItems[index];
            currentItem = nextItem;
            nextItem = item;
            let distitle = readTitleFromItem(item);
            console.log(`++++++++${distitle}`);
            if (distitle) {
                // find lock
                let lock = item.querySelector('.is-locked');
                if (lock) {
                    targetIndex = index - 1;
                    console.log('Successfully find the video that you want to play!');
                    break
                }
            }
        }
        console.log(`Current title of video is ${readTitleFromItem(currentItem)}`);
        if (targetIndex >= videoItems.length) {
            console.log('There are no more videos to play!');
        } else {
            console.log(`The next video is ${readTitleFromItem(nextItem)}`);
        }
        return {
            current: currentItem,
            items: videoItems,
            index: targetIndex
        };
    }

    let clickItem = false
    function clickTargetItem(item) {
        let title = readTitleFromItem(item);
        console.log(`Start playing video named: ${title}`);
        let clickEvent = new Event('click');
        clickItem = true;
        item.dispatchEvent(clickEvent);
    }

    function startPlayVideo(playObj) {
        isElementLoaded('.mvp-toggle-play').then((selector) => {
            let playBtn = document.querySelector(".mvp-toggle-play");
            let clickEvent = new Event('click');
            playBtn.dispatchEvent(clickEvent);
            let video = document.querySelector('video');
            video.currentTime = 0;
            video.playbackRate = 16.0;
            video.addEventListener('ended', () => {
                console.log('play end');
                if (playObj.index >= playObj.items.length) {
                    return;
                }
                // hover
                let nextItem = getNextPlayItem(playObj);
                // 移动到锁上才会解锁
                // TODO: 查找hover之后就解锁的方式
                let locks = nextItem.querySelectorAll('.activity-prerequisites');
                for (const lock of locks) {
                    if (lock) {
                        let hover = new Event('mouseenter');
                        lock.dispatchEvent(hover)
                    }
                }
                
                // isElementLoaded('.mvp-toggle-play').then((selector) => {
                //     const playObj = findCurrentPlayItem();
                //     clickTargetItem(playObj.current);
                //     startPlayVideo(playObj);
                // });

                // setTimeout(() => {
                //     console.log('Start find next video...')
                //     // 播放结束，寻找下一个视频播放
                //     // 先找到当前播放视频的编号
                //     if (playObj.index < playObj.items.length - 1) {
                //         playObj.index++;
                //         const next = playObj.items[playObj.index];
                //         playObj.currentItem = next;
                //         clickTargetItem(playObj.currentItem);
                //         startPlayVideo(playObj)
                //     }
                // }, 1);
            });
        });
    }

    // Element loaded
    const isElementLoaded = async selector => {
        while (document.querySelector(selector) === null) {
            await new Promise(resolve => requestAnimationFrame(resolve))
        }
        return document.querySelector(selector);
    };

    function getNextPlayItem(playObj) {
        if (!playObj) return null;
        if (playObj.index >= playObj.items.length) return null;
        return playObj.items[playObj.index + 1]
    }

    const playObj = findCurrentPlayObj();
    clickTargetItem(playObj.current);
    startPlayVideo(playObj);
})();
