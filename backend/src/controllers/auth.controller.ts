import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "node:stream";
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      return res.status(401).json({ message: "Email already exist" });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    const token = generateToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("BODY:", req.body);
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user.id.toString());
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const { name, email, password, currentPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (name !== undefined) {
      const trimmedName = name.trim();

      if (!trimmedName) {
        return res.status(400).json({
          message: "El nombre no puede estar vacío",
        });
      }

      if (trimmedName.length < 3) {
        return res.status(400).json({
          message: "El nombre debe tener mínimo 3 caracteres",
        });
      }

      if (trimmedName.length > 30) {
        return res.status(400).json({
          message: "El nombre es demasiado largo",
        });
      }
    }

    if (email !== undefined) {
      const trimmedEmail = email.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({
          message: "Correo inválido",
        });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          email: trimmedEmail,
          NOT: {
            id: userId,
          },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Este correo ya está registrado",
        });
      }
    }
    let avatarUrl: string | undefined;

    if (req.file) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "my-habits",
          },
          (error, result) => {
            if (error) return reject(error);

            resolve(result);
          },
        );

        Readable.from(req.file?.buffer as Buffer).pipe(stream);
      });

      avatarUrl = result.secure_url;
    }

    let hashedPassword: string | undefined;

    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Debes ingresar tu contraseña actual",
        });
      }

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isValidPassword) {
        return res.status(400).json({
          message: "La contraseña actual es incorrecta",
        });
      }

      const samePassword = await bcrypt.compare(password, user.password);

      if (samePassword) {
        return res.status(400).json({
          message: "La nueva contraseña debe ser diferente",
        });
      }

      // Mínimo seguridad básica
      if (password.length < 8) {
        return res.status(400).json({
          message: "La contraseña debe tener mínimo 8 caracteres",
        });
      }

      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        ...(name && {
          name: name.trim(),
        }),

        ...(email && {
          email: email.trim().toLowerCase(),
        }),

        ...(hashedPassword && {
          password: hashedPassword,
        }),

        ...(avatarUrl && {
          avatar: avatarUrl,
        }),
      },

      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error al actualizar perfil",
    });
  }
};
