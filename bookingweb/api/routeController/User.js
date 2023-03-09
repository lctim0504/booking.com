export const register = async (req, res) => {
    const registerData = req.body
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(registerData.password, salt);
        const newUser = new User({ 
            username: registerData.username,
            email: registerData.email,
            password: hash,
        }
        )
        const saveUser = await newUser.save();
        //但這邊要分離處理來保護我們的使用者資料 
        res.status(200).json(saveUser)
    } catch (error) {
        console.log("Error registering user:" + error);
        res.status(500).json({ error: "Error registering user" })
    }
}