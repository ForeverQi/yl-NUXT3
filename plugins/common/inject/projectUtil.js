import storage from './storage';
import cookieUtil from './cookieUtil';

const key = 'ProjectUtil.project';

const ret = {
    getProject() {
        return storage(global.$nuxt.context.env.config).get(key) || JSON.parse(cookieUtil.get(key) || '{}');
    },
    setProject(project) {
        storage(global.$nuxt.context.env.config).set(key, project);
        cookieUtil.set(key, JSON.stringify(project));
    },
};

export default ret;
