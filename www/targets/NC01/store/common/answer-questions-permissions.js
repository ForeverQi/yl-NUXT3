import '@/api/qb/api.QA3005.query-web-subjectchek.js'; // 接口-查询基础数据subjectName
export const actions = {
    getAnswerQuestionsPermissions(context, { subjectId, projectId }) {
        return new Promise((resolve, reject) => {
            niceloo.api.call('qb/query-web-subjectchek', {
                subjectId,
                projectId,
                onsuccess: (res) => {
                    resolve(res);
                },
                onerror: (err) => {
                    reject(err);
                },
                oncomplete: () => {},
            });
        })
            .then((res) => {
                return res.flag;
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    },
};
