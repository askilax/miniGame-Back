const express = require('express');
const router = express.Router();
const User = require('../models/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');
const crypto = require('crypto')

// Inscription
router.post('/register', async (req, res) => {
  //recup des données 
  const { email, username, password } = req.body;

  try {
    const existUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existUser) {
      return res.status(400).json({ result: false, message: "Nom d'utilisateur ou email déjà utilisé." });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const pepper = process.env.PEPPER;

    // combine le salt et pepper
    const combinedPassword = password + pepper + salt;
    const hashedPassword = await argon2.hash(combinedPassword);

    const newUser = new User({ email, username, password: hashedPassword, salt });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, email: newUser.email, username: newUser.username, message: 'Utilisateur créé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const pepper = process.env.PEPPER;
    const combinedPassword = password + pepper + user.salt;


    const isMatch = await argon2.verify(user.password, combinedPassword);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, email: user.email, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/validate-token', authenticate, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});


router.get('/allScores', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ result: false, message: 'User not found' });
    }
    res.status(200).json({ result: true, scores: user.highScore })
  } catch (error) {
    res.status(500).json({ result: false, message: 'Server error', details: error.message });
  }
})

router.get('/highScore/:game', authenticate, async (req, res) => {
  try {
    const { game } = req.params;

    const user = await User.findById(req.user.id).select('highScore');
    if (!user) {
      return res.status(404).json({ result: false, message: "User not found" });
    }

    const gameHighScore = user.highScore.find(item => item.game === game);

    res.status(200).json({
      result: true,
      highScore: gameHighScore ? gameHighScore.score : 0,
    });
  } catch (error) {
    res.status(500).json({ result: false, message: 'Server error', details: error.message });
  }
});


router.post('/highScore', authenticate, async (req, res) => {
  try {
    const { game, score } = req.body;

    if (!game || score === undefined) {
      return res.status(400).json({ result: false, message: 'Game and score are required.' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ result: false, message: 'User not found.' });
    }

    const gameIndex = user.highScore.findIndex(item => item.game === game);

    if (gameIndex === -1) {
      user.highScore.push({ game, score });
    } else {
      if (score > user.highScore[gameIndex].score) {
        user.highScore[gameIndex].score = score;
      }
    }

    await user.save();

    res.status(200).json({
      result: true,
      message: "HighScore has been successfully updated.",
      score: user.highScore,
    });
  } catch (error) {
    console.error('Error POST /highScore:', error.message);
    res.status(500).json({ result: false, message: "Server error", details: error.message });
  }
});

router.delete('/delete-account', authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ result: false, message: 'user not found' });
    }
    res.status(200).json({ result: true, message: 'user has been deleted' })
  } catch (error) {
    res.status(500).json({ result: false, message: 'server error', details: error.message })
  }
})

module.exports = router;