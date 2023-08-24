export default {
    projectCode: '',
    companyId: '34798', // 公司ID
    groupId: '64774', // 客服组ID
    readyMap: {},
    init(projectCode) {
        this.projectCode = projectCode;
        if (this.checkEnvironment()) {
            return this.initEnvironment();
        } else {
            return this.createEnvironment().then(() => {
                return this.initEnvironment();
            });
        }
    },
    checkEnvironment() {
        if (this.readyMap[this.projectCode] && typeof window.openJesongChatByGroup === 'function') {
            return true;
        } else {
            return false;
        }
    },
    initEnvironment() {
        return new Promise((resolve) => {
            if (typeof window.openJesongChatByGroup === 'function') {
                window.ysf = {
                    open: () => {
                        window.openJesongChatByGroup(this.companyId, this.groupId);
                    },
                };
            } else {
                window.ysf = {
                    open: () => {
                        console.log('sdk初始化失败');
                    },
                };
            }
            resolve();
        });
    },
    createEnvironment() {
        const jsFileArr = [`https://scripts.easyliao.com/js/easyliao.js`, `https://scripts.easyliao.com/${this.companyId}/${this.projectCode}/lazy.js`];
        let linkPromise = Promise.resolve();
        jsFileArr.forEach((file) => {
            linkPromise = linkPromise.then(() => {
                return this.createScript(file);
            });
        });

        return linkPromise;
    },
    createScript(src) {
        return new Promise((resolve, reject) => {
            const oScript = document.createElement('script');
            oScript.defer = true;
            oScript.src = src;
            oScript.onload = () => {
                this.readyMap[this.projectCode] = true;
                resolve();
            };
            oScript.onerror = reject;
            document.querySelector('head').appendChild(oScript);
        });
    },
    setUser(userIntance) {
        userIntance.getUser && userIntance.getUser();
    },
};
