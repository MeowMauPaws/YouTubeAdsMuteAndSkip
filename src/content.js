// 以下のコードを content.js ファイルに保存します。
let wasElementPresent = false;  // 変数を追加して、前回のチェック時に特定の要素が表示されていたかどうかを記録します。

function checkForSpecificElement(selector) {
    return document.querySelector(selector) !== null;
}

function muteVideo() {
    const muteButton = document.querySelector('.ytp-mute-button.ytp-button');
    if (muteButton) {
        const isMuted = muteButton.getAttribute('aria-label') === 'ミュート（消音） キーボード ショートカット m';
        if (!isMuted) {
            muteButton.click();
        }
    }
}

function unmuteVideo() {
    const muteButton = document.querySelector('.ytp-mute-button.ytp-button');
    if (muteButton) {
        const isMuted = muteButton.getAttribute('aria-label') === 'ミュート（消音） キーボード ショートカット m';
        if (isMuted) {
            muteButton.click();
        }
    }
}

function skipAdButton() {
    const skipAdButton = document.querySelector(".ytp-ad-skip-button.ytp-button");
    if (skipAdButton) {
        skipAdButton.click();
    }
}

const triggerSelector = ".ytp-ad-player-overlay";
const adSkipTriggerSelector = ".ytp-ad-skip-button.ytp-button";

setInterval(() => {
    const isElementPresent = checkForSpecificElement(triggerSelector);  // 現在のチェック時に特定の要素が表示されているかどうかを確認します。
    if (isElementPresent) {
        muteVideo();
    } else if (wasElementPresent) {  // 前回のチェック時に特定の要素が表示されていた場合、かつ現在表示されていない場合、ミュートを解除します。
        unmuteVideo();
    }
    wasElementPresent = isElementPresent;  // 前回のチェックの状態を更新します。

    if (checkForSpecificElement(adSkipTriggerSelector)) {
        skipAdButton();
    }
}, 100);
