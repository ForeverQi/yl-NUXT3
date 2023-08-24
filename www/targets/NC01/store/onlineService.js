/**
 * 在线聊天客服
 */
const projectMap = {
    erjian: '79828',
    xfy: '80471',
    yijian: '79655',
    anquan: '79827',
    cjanquan: '79827',
    yixiao: '96723',
    erxiao: '96723',
    zjjj: '96724',
    cjjj: '96724',
    xys: '96726',
    zys: '96726',
    jianli: '96727',
    qyhgs: '96728',
    erzao: '96729',
    zldl: '96730',
    zaojia: '96731',
};
export const state = () => ({
    projectToServiceCode: '', // 默认 96732
});

export const mutations = {
    setProjectCode(status, code) {
        let tmpCode = '';
        if (!code) {
            tmpCode = '96732';
        } else {
            tmpCode = projectMap[code] ? projectMap[code] : '96732';
        }
        console.log(tmpCode);
        status.projectToServiceCode = '96732';
    },
};
