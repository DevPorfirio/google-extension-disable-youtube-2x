// Disable YouTube 2x Speed Extension

console.log("Disable YouTube 2x Speed: Content script active.");

// 1. Disable Spacebar Hold (2x Speed)

let isSpaceHeld = false;
let lastNormalRate = 1;

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        if (!isSpaceHeld) {
            isSpaceHeld = true;
            const video = document.querySelector('video');
            if (video) {
                lastNormalRate = video.playbackRate;
            }
        }
        if (e.repeat) {
            e.stopImmediatePropagation();
        }
    }
}, true);

document.addEventListener('keyup', function (e) {
    if (e.code === 'Space') {
        isSpaceHeld = false;
    }
}, true);

document.addEventListener('ratechange', function (e) {
    const video = e.target;
    if (!video || video.tagName !== 'VIDEO') return;

    if (isSpaceHeld) {
        if (video.playbackRate !== lastNormalRate) {
            video.playbackRate = lastNormalRate;
        }
    } else {
        lastNormalRate = video.playbackRate;
    }
}, true);

// 2. Disable Click and Hold (2x Speed)
document.addEventListener('mousedown', function (e) {
    if (e.target.closest('.ytp-chrome-bottom') || e.target.closest('.ytp-ce-element')) {
        return;
    }

    if (e.target.tagName === 'VIDEO' ||
        e.target.classList.contains('html5-video-player') ||
        e.target.classList.contains('ytp-contenter')) {

        // We do NOT preventDefault() because we want the 'click' event to eventually fire (for play/pause).
        e.stopImmediatePropagation();
    }
}, true);
