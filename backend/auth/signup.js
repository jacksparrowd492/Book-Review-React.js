app.post('/auth/signup', async (req, res) => {
    const { username, email, password, about, favoriteGenres } = req.body;
  
    try {
      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists.' });
      }
  
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ success: false, message: 'Email already exists.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, about, favoriteGenres });
      await newUser.save();
  
      res.json({ success: true, message: 'Signup successful!' });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });
  