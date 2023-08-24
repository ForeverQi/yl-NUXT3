import DateUtil from './dateUtil';
import Storage from './storage';
import User from '~/plugins/common/inject/user';
import PageUtil from '~/plugins/common/inject/PageUtil';

const key = 'ShoppingCart';
export default (config) => ({
    async checkUser() {
        if (await User(config.env).isLogined()) return true;
        PageUtil(config.env).toLogin();
        return false;
    },
    async getShoppingCartKey() {
        return key + (await User(config.env).getUser().userId);
    },
    async remove(id) {
        if (!(await this.checkUser())) return;
        let list = this.getData();
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (item.id == id) {
                list.splice(i, 1);
                break;
            }
        }
        await this.set(list);
    },
    async clear() {
        Storage(config).delete(await this.getShoppingCartKey());
    },
    async set(list) {
        Storage(config).set(await this.getShoppingCartKey(), list);
    },
    async add(item) {
        if (!this.checkUser()) return;
        item.id = item.id || DateUtil.getUUID();
        let list = this.getData();
        list.push(item);
        await this.set(list);
    },
    async getData() {
        if (!this.checkUser()) return;
        return Storage(config).get(await this.getShoppingCartKey()) || [];
    },
});
