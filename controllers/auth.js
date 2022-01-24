export const Register = (req, res) => {
  const body = req.body;
  console.log({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  res.json('register user');
};
