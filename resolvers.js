module.exports = {
    Query: {
        getUser: () => null
    },
    Mutation: {
        signupUser: async (_, {username,email, password}, {User}) => {
            const user = await User.findOne({ username });
            if(user) {
                throw new Error('user already exist');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return newUser;
        }
    }
}