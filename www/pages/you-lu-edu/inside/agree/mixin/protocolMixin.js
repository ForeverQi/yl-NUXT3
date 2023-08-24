export default {
    /**
     * mounted生命周期
     */
    mounted() {
        const idArr = [
            { topValue: this.getIdContent('serial1'), serial: 1 },
            { topValue: this.getIdContent('serial2'), serial: 2 },
            { topValue: this.getIdContent('serial3'), serial: 3 },
            { topValue: this.getIdContent('serial4'), serial: 4 },
            { topValue: this.getIdContent('serial5'), serial: 5 },
            { topValue: this.getIdContent('serial6'), serial: 6 },
            { topValue: this.getIdContent('serial7'), serial: 7 },
            { topValue: this.getIdContent('serial8'), serial: 8 },
            { topValue: this.getIdContent('serial9'), serial: 9 },
        ];
        this.$emit('getContentTitleId', idArr);
    },
    methods: {
        /**
         * 通过id获取dom
         *
         * @param {string} id id
         * @returns {object} dom
         */
        getIdContent(id) {
            if (document.getElementById(id)) {
                return document.getElementById(id).offsetTop - document.getElementById('contentArea').offsetTop;
            }
        },
    },
};
