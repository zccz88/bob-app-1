import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { changePassword } from "../../actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    e.preventDefault();

    if (currentPassword && newPassword === newPasswordCheck) {
      dispatch(changePassword(currentPassword, newPassword));
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordCheck("");
    } else if (newPassword !== newPasswordCheck) {
      alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
    }

    return <Redirect to="/profile" />;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} noValidate onSubmit={onChangePassword}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="현재 비밀번호"
            type="password"
            name="password"
            autoComplete="password"
            autoFocus
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="새 비밀번호"
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="새 비밀번호 확인"
            type="password"
            id="password"
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            비밀번호 변경
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        밥친구해요
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default ChangePasswordPage;
