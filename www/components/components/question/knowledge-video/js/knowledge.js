import '@/api/qb/api..query-knowledge-chapter-names';
export default {
    methods: {
        //查询当前知识点的章节目录
        queryKnowledgeChapterNames() {
            this.loading = true;
            this.$callApi('qb/query-knowledge-chapter-names', {
                knowledgeId: this.currentKnowledgeId,
                onsuccess: (res) => {
                    this.chapterCatalog = res ? res.split('-') : [];
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
    },
};
