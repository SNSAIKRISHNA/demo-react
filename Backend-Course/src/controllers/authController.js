import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

import generateToken from "../utils/genrateToken.js";

const register = async (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    return res.status(400).json({ message: "User already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
   const token = generateToken(user.id, res);
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userExists) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isPasswordvalid = await bcrypt.compare(password, userExists.password);

  if (!isPasswordvalid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

 const token = generateToken(userExists.id, res);
   
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: userExists.id,
        email: userExists.email,
      },
      token,
    },
  });
};


const logout = (req, res) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0),
    });
    res.status(200).json({
        status:"success",
        message:"User logged out successfully",
    });


}

export { register, login, logout };