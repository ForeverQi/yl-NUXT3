import User from '~/plugins/common/inject/user';

export default (context) => {
    User(context.env.config.env).getUser();
};
