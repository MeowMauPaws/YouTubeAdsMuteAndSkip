{

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
        console.log('should mute?')
        const muteButton = document.querySelector(".ytp-mute-button.ytp-button");
        if (muteButton) {
            const titleText = muteButton.getAttribute('title');
            const ariaLabel = muteButton.getAttribute('aria-label');
            const labelText = titleText || ariaLabel;  // titleTextが存在する場合はそれを使用し、存在しない場合はariaLabelを使用します
            if (labelText) {
                return labelText.includes('解除');
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
                console.log('should mute?')
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
            console.log("after observer")
            clearInterval(initInterval);
        }
        clickSkipButton();
    }, 1000);
    const secinitInterval = setInterval(() => {
        console.log("on working... v2");
        // const muteButton = document.querySelector(".ytp-mute-button.ytp-button");
        // if (muteButton) {
        //     const titleText = muteButton.getAttribute('title');
        //     const ariaLabel = muteButton.getAttribute('aria-label');
        //     const labelText = titleText || ariaLabel;  // titleTextが存在する場合はそれを使用し、存在しない場合はariaLabelを使用します
        //     if (labelText) {
        //         console.log(labelText.includes('解除'));
        //     } else {
        //         console.error('Both title and aria-label attributes are not present');
        //     }
        // } else {
        //     console.error('muteButton element is not found');
        // }
    }, 2000);
};
