import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

export const registerHandler = async (req, res) => {
    try {
    const { username, password } = req.body || {};
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'username and password are required' });
    }

    // ป้องกันชื่อซ้ำ (แม้ schema ไม่ได้ unique)
    const exists = await userModel.findOne({ username });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Username already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = 'u_' + crypto.randomBytes(6).toString('hex');

    const user = await userModel.create({
      userId,
      username: username.trim(),
      passwordHash,
    });

    const token = signToken(user._id.toString());

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        userId: user.userId,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate field value', details: err.keyValue });
    }
    console.error('registerHandler error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

export const loginHandler = async (req, res) => {
    try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'username and password are required' });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const token = signToken(user._id.toString());

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        userId: user.userId,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('loginHandler error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};