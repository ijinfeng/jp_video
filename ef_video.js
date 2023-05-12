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
        console.log(`- ${ot}`);
        return ot === '音视频教材';
    }

    function findCurrentPlayObj() {
        let currentItem = null;
        let nextItem = null;
        let targetIndex = 0;
        let items = document.getElementsByClassName('activity ng-scope')
        let videoItems = []
        for (const item of items) {
            if (isVideo(item) == false) {
                continue;
            }
            videoItems.push(item)
        }
        let findedLock = false;
        for (let index = 0; index < videoItems.length; index++) {
            const item = videoItems[index];
            currentItem = nextItem;
            nextItem = item;
            let distitle = readTitleFromItem(item);
            console.log(`+ ${distitle}`);
            if (distitle) {
                // find lock
                let lock = item.querySelector('.is-locked');
                if (lock) {
                    findedLock = true;
                    targetIndex = index - 1;
                    console.log('Successfully find the video that you want to play!');
                    break
                }
            }
        }
        if (!findedLock) {
            targetIndex = videoItems.length - 1;
            currentItem = videoItems[targetIndex];
            nextItem = null;
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
        if (!item) {
            console.log('Target item is empty!');
            return;
        }
        let title = readTitleFromItem(item);
        console.log(`Start playing video named: ${title}`);
        let clickEvent = new Event('click');
        clickItem = true;
        item.dispatchEvent(clickEvent);
    }

    let t;
    function startPlayVideo(playObj) {
        isElementLoaded('.mvp-toggle-play').then((selector) => {
            let playBtn = document.querySelector(".mvp-toggle-play");
            let clickEvent = new Event('click');
            playBtn.dispatchEvent(clickEvent);
            let video = document.querySelector('video');
            video.currentTime = 0;
            video.playbackRate = 16.0;
            video.addEventListener('ended', () => {
                console.log(`play end - [${playObj.index}, ${playObj.items.length}]`);
                if (isLastOne(playObj)) {
                    console.log('There are no more videos in playlist.');
                    alert('There are no more videos in playlist.');
                    return;
                }
                // hover
                let nextItem = getNextPlayItem(playObj);
                console.log(`Ready to find next video named: ${readTitleFromItem(nextItem)}`)
                // 移动到锁上才会解锁
                // TODO: 查找hover之后就解锁的方式
                tryRemoveLock(nextItem);
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

    function isLastOne(playObj) {
        return playObj.index >= playObj.items.length - 1;
    }

    function getNextPlayItem(playObj) {
        if (!playObj) return null;
        if (isLastOne(playObj)) return null;
        return playObj.items[playObj.index + 1]
    }

    function tryRemoveLock(item) {
        let locks = item.querySelectorAll('.right');
        for (const lock of locks) {
            if (lock) {
                let ng_lock = angular.element(lock);
                let ng_lock_scope = ng_lock.scope();
                ng_lock_scope.resetPrerequisitesTipsPosition = (e) => {
                    console.log(e);
                }

                let target = lock.querySelector('.font-thin-lock');
                let isDefaultPrevented = function Ae() { return !1; }
                let originalEvent = new MouseEvent('mouseover', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    fromElement: item,
                    relatedTarget: item,
                    srcElement: target,
                    target: target,
                    toElement: target
                });

                ng_lock_scope.$apply(function () {
                    let event = jQuery.Event('mouseenter', {
                        'relatedTarget': item,
                        'target': target,
                        'currentTarget': lock,
                        'originalEvent': originalEvent,
                        'isDefaultPrevented': isDefaultPrevented
                    });
                    ng_lock.triggerHandler(event);
                    console.log(`Try remove lock: [lock]`);
                });

                let prerequisites = lock.querySelectorAll('.activity-prerequisites');
                prerequisites.forEach(function (p) {
                    let ng_p = angular.element(p);
                    let ng_p_scope = ng_p.scope();
                    ng_p_scope.resetPrerequisitesTipsPosition = (e) => {
                        console.log(e);
                    }

                    ng_p_scope.$apply(function () {
                        let event = jQuery.Event('mouseenter', {
                            'relatedTarget': item,
                            'target': target,
                            'currentTarget': p,
                            'originalEvent': originalEvent,
                            'isDefaultPrevented': isDefaultPrevented
                        });
                        ng_p.triggerHandler(event);
                        console.log(`Try remove lock: [prerequisites]`);
                    });
                });
            }
        }

        // t = setTimeout(() => {
                        // setTimeout(() => {
                        //     console.log('Start find next video...')
                        //     // 播放结束，寻找下一个视频播放
                        //     // 先找到当前播放视频的编号
                        //     if (isLastOne(playObj) == false) {
                        //         playObj.index++;
                        //         const next = playObj.items[playObj.index];
                        //         playObj.currentItem = next;
                        //         clickTargetItem(playObj.currentItem);
                        //         startPlayVideo(playObj)
                        //     }
                        // }, 3);
                        // });
    }


    const playObj = findCurrentPlayObj();

    if (playObj.current) {
        clickTargetItem(playObj.current);
        startPlayVideo(playObj);
    }



    // TODO: 测试
    // if (isLastOne(playObj) == false) {
    //     let nextItem = playObj.items[playObj.index + 1];
    //     tryRemoveLock(nextItem);
    // }

})();