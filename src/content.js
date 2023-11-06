const hostName = location.hostname;
const subDomain = hostName.split('.')[0];

const newStyle = document.createElement('style');
newStyle.innerText = '.ytp-ad-overlay-container{display:none!important;}';
document.getElementsByTagName('head').item(0).appendChild(newStyle);

const returnPlayerId = (v) => {
    switch (v) {
        case 'music':
            return 'player';
            break;
        case 'www':
        default:
            return 'ytd-player';
            break;
    }
};

const clickSkipButton = () => {
    const $skipButton = document.getElementsByClassName("ytp-ad-skip-button-container")[0];
    if ($skipButton) $skipButton.click();
};
const clickMuteButton = () => {
    const muteButton = document.querySelector(".ytp-mute-button.ytp-button");
    if (muteButton) muteButton.click();
};

const isMute = () => {
    const muteButton = document.querySelector(".ytp-mute-button.ytp-button");
    if (muteButton) {
        const titleText = muteButton.getAttribute('title');
        const ariaLabel = muteButton.getAttribute('aria-label');
        const labelText = titleText || ariaLabel;  // マウスホバーの状態によってtitleText/ariaLabelどちらが存在するか変わる。存在する方を使う
        if (labelText) {
            return labelText.includes('解除') || labelText.includes('Unmute');
        } else {
            console.error('Both title and aria-label attributes are not present');
        }
    } else {
        console.error('muteButton element is not found');
    }
};

const obConfig = {
    childList: true,
    subtree: true
};
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length && mutation.addedNodes[0].className === 'ytp-ad-player-overlay') {
            clickSkipButton()
            if (!isMute()) {
                clickMuteButton();
            }
        };
        // 特定のノードが削除された場合の処理
        if (mutation.removedNodes.length && mutation.removedNodes[0].className === 'ytp-ad-player-overlay') {
            if (isMute()) {
                clickMuteButton();
            }
        }
    });
});

const playerId = returnPlayerId(subDomain);
const initInterval = setInterval(() => {
    if (document.getElementById(playerId) != null) {
        const obTarget = document.getElementById(playerId);
        observer.observe(obTarget, obConfig);
        clearInterval(initInterval);
    }
    clickSkipButton();
}, 1000);
