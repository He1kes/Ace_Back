const permission = new Vue({
    el: '#permission',
    data: {
        flag: true
    },
    methods: {
        doClick() {
            this.flag = !this.flag;
        }
    }
});