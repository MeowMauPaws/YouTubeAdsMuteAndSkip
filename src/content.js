// 以下のコードを content.js ファイルに保存します。

function checkForSpecificElement(selector) {
    return document.querySelector(selector) !== null;
}

function muteUnmute(mute) {
    const muteButton = document.querySelector(".ytp-mute-button.ytp-button");
    if (muteButton) {
        const isMuted =
            muteButton.getAttribute("aria-label") ===
            "ミュート（消音） キーボード ショートカット m";
        if ((mute && !isMuted) || (!mute && isMuted)) {
            muteButton.click();
        }
    }
}

function skipAdButton(on) {
    const skipAdButton = document.querySelector(".ytp-ad-skip-button.ytp-button");
    if (skipAdButton) {
        const shouldSkipAdButtonClick =
            skipAdButton.getAttribute("aria-pressed") === "true";
        if ((on && !shouldSkipAdButtonClick) || (!on && shouldSkipAdButtonClick)) {
            skipAdButton.click();
        }
    }
}

const triggerSelector = ".ytp-ad-player-overlay-instream-info";
const adSkipTriggerSelector = ".ytp-ad-skip-button.ytp-button";

setInterval(() => {
    if (checkForSpecificElement(triggerSelector)) {
        muteUnmute(true);
    }

    if (checkForSpecificElement(adSkipTriggerSelector)) {
        skipAdButton(true);
    } else {
        skipAdButton(false);
    }
}, 1000);
