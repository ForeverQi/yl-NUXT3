import '@/api/qb/api..query-common-author.js';
import '@/api/cc/api..query-user-profession-bank-auth.js';

export default {
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            projectId: '',
        };
    },
    methods: {
        /**
         * 鉴权判断(试卷解析页->学员查看和非学员查看权限校验)
         *
         * @returns {Promise} Promise
         */
        commonAuthorQuestion() {
            return new Promise((resolve, reject) => {
                niceloo.api.call('qb/query-common-author', {
                    // 项目标识（基础数）
                    projectId: this.projectId,
                    onsuccess: (data) => {
                        resolve(data);
                    },
                    onerror: (err) => {
                        return reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        },
        /**
         * 班级专项题库鉴权状态
         *
         * @returns {Promise} Promise
         */
        commonAuthorLearnCenter() {
            return new Promise((resolve, reject) => {
                niceloo.api.call('cc/query-user-profession-bank-auth', {
                    // 班级标识
                    classId: this.$route.query.classId,
                    // 专项题库标识
                    professionBankId: this.$route.params.professionBankId,
                    onsuccess: (data) => {
                        resolve(data);
                    },
                    onerror: (err) => {
                        return reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        },
        /**
         * 获取专项题库基本信息
         *
         * @returns {Promise} Promise
         */
        getProfessionBankInfo() {
            return new Promise((resolve, reject) => {
                niceloo.api.call('qb/query-profession-bank-info', {
                    // 专项题库标识
                    professionBankId: this.$route.params.professionBankId,
                    onsuccess: (data) => {
                        resolve(data);
                    },
                    onerror: (err) => {
                        return reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        },
    },
};
