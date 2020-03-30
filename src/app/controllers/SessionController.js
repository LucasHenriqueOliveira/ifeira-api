class SessionController {
    async store(req, res){
        const { email, password } = req.body;

        let user;
        try{
            // user = await User.findOne({ where: { email } });
        }catch(e){
            console.log(e);
            return res.status(500).json({message: "Erro ao consultar o banco de dados"});
        }

        if(!user){
            return res.status(401).json({message: 'User not found'});
        }

        if(!(await user.checkPassword(password))) {
            return res.status(401).json({message: "Incorrect password"});
        }

        return res.json({ 
            // user,
            // token: user.generateToken() 
        });
    }
}

module.exports = new SessionController();