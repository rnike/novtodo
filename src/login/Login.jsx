import React, { Component } from "react";
import "./Login.scss";
import gsap from "gsap";
import axios from "axios";
export const axiosLogout = async () => {
    localStorage.removeItem('usertkn');
    window.demo = true;
    axios.defaults.headers = undefined;
    window.location.reload();

};
export const axiosLogin = async (email, pwd, remember) => {
    try {
        var response = await axios.post(window.ip + 'login', {
            auth: {
                email: email,
                password: pwd,
            }
        });
        const { data } = response;

        if (data.jwt) {
            //success
            const stor = JSON.stringify(remember ? {
                email: email,
                password: pwd,
                tkn: data.jwt,
                time: new Date()
            } : {
                    tkn: data.jwt,
                    time: new Date()
                })
            localStorage.setItem('usertkn', stor);
            window.demo = false;
            axios.defaults.headers = { 'Authorization': "bearer " + data.jwt };
            window.location.reload();
            return {

            }
        } else {
            //err
            return {
                err: 'err'
            }
        }
        return response.isLogin;
    } catch (error) {
        return {
            err: error
        }
    }
}
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pwd: "",
            isOpened: false,
            remember: true,
            errMsg: "",
            loading: false,
            register: false,
            regname: "",
            regemail: "",
            regpwd: "",
            regpwdc: "",
            regMsg: ""
        };
        this.check = this.check.bind(this);
        this.open = this.open.bind(this);
        this.login = this.login.bind(this);
        this.regMethod = this.regMethod.bind(this);
        this.busy = false;
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {
        const { isOpened } = this.state;
        if (isOpened) {
            if (prevState.isOpened !== isOpened) {
                this.open(isOpened);
            }
            if (prevState.remember !== this.state.remember) {
                this.check(this.state.remember);
            }
        }
    }
    check(b) {
        const { isOpened } = this.state;
        if (!isOpened) return;
        const val = b ? 0 : 60;
        const valColor = b ? "black" : "#dadada";
        gsap.to(this.theCheck, {
            strokeDashoffset: val
        });
        gsap.to(this.theCheckText, {
            color: valColor
        });
    }
    open(b) {
        this.setState(x => ({
            email: "",
            pwd: "",
            errMsg: "",
            register: false,
            regname: "",
            regemail: "",
            regpwd: "",
            regpwdc: "",
            regMsg: ""
        }));
        const { remember, isOpened } = this.state;
        if (b) {
            gsap.timeline()
                .fromTo(
                    this.theBackPanel,
                    {
                        background: b
                            ? "rgba(163, 163, 163, 0)"
                            : "rgba(163, 163, 163, 0.7)"
                    },
                    {
                        background: b
                            ? "rgba(163, 163, 163, 0.7)"
                            : "rgba(163, 163, 163, 0)",
                        onComplete: () => {
                            this.setState(x => ({
                                isOpened: b
                            }));
                            this.busy = false;
                            if (b) {
                                this.check(remember);
                                this.theEmail.focus();
                            }
                        }
                    }
                )
                .fromTo(
                    this.thePanel,
                    {
                        y: b ? -500 : 0
                    },
                    {
                        y: b ? 0 : -500
                    }
                )
                .set(this.theBackPanel, {
                    css: {
                        pointerEvents: b ? "unset" : "none"
                    }
                });
        } else {
            gsap.timeline()
                .fromTo(
                    this.thePanel,
                    {
                        y: b ? -500 : 0
                    },
                    {
                        y: b ? 0 : -500
                    }
                )
                .fromTo(
                    this.theBackPanel,
                    {
                        background: b
                            ? "rgba(163, 163, 163, 0)"
                            : "rgba(163, 163, 163, 0.7)"
                    },
                    {
                        background: b
                            ? "rgba(163, 163, 163, 0.7)"
                            : "rgba(163, 163, 163, 0)",
                        onComplete: () => {
                            this.setState(x => ({
                                isOpened: b
                            }));
                            this.busy = false;
                            if (b) {
                                this.check(remember);
                                this.theEmail.focus();
                            }
                        }
                    }
                )
                .set(this.theBackPanel, {
                    css: {
                        pointerEvents: b ? "unset" : "none"
                    }
                });
        }
    }
    async login() {
        const { loading, email, pwd, remember } = this.state;
        if (loading) return;
        this.setState({ loading: true });
        const result = await axiosLogin(email, pwd, remember);
        console.log('result', result);

        if (result.err) {
            this.setState({
                errMsg: 'Email or Password incorrect',
                loading: false
            });
        }
    }
    async logout() {
        await axiosLogout();
    }
    checklog() {
        axios
            .get("checkLogin")
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(`An Error Occured! ${error}`);
            });
    }
    regMethod() {
        const {
            regpwdc,
            regpwd,
            regname,
            regemail
        } = this.state;
        if (regname === "") {
            this.setState({ regMsg: "Name require" });
            return;
        }
        if (regemail === "") {
            this.setState({ regMsg: "Email require" });
            return;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(regemail) === false) {
            this.setState({ regMsg: "Email incorrect" });
            return;
        }
        if (regpwd === "" || regpwd.length < 8) {
            this.setState({
                regMsg: "Password length should be greater than 7"
            });
            return;
        }
        if (regpwd !== regpwdc) {
            this.setState({ regMsg: "Confirm password incorrect." });
            return;
        }

        this.setState({ loading: true });
        var formData = new FormData();
        formData.append("name", regname);
        formData.append("email", regemail);
        formData.append("password", regpwd);
        formData.append("password_confirmation", regpwdc);

        const data = {
            name: regname,
            email: regemail,
            password: regpwd,
            password_confirmation: regpwdc,
        }
        axios
            .post(window.ip + 'register', data)
            .then(response => {
                if (response.data) {
                    const { data } = response;
                    if (data.err) {
                        console.log(data);
                        this.setState({
                            regMsg: data.err,
                            loading: false
                        });
                    } else {
                        if (data.message) {
                            console.log('success', data.message);
                        } else {
                            this.setState({
                                regMsg: "error",
                                loading: false
                            });
                        }
                    }
                }
                console.log("response", response);
            })
            .catch(error => {
                this.setState({
                    regMsg: "Connection Error",
                    loading: false
                });
                console.log(`An Error Occured! ${error}`);
            });
    }
    render() {
        const {
            loading,
            errMsg,
            email,
            pwd,
            register,
            regMsg,
            regpwdc,
            regpwd,
            regname,
            regemail
        } = this.state;
        return (
            <div className="Login">
                {/* {!isOpened ? ( */}
                <h4
                    className="OpenButton"
                    onClick={() => {
                        if (this.busy) return;
                        this.busy = true;
                        this.setState({ isOpened: true });
                    }}
                >
                    Login
                </h4>
                <div
                    ref={x => {
                        this.theBackPanel = x;
                    }}
                    onClick={e => {
                        if (loading) return;
                        if (this.busy) return;
                        if (e.target === this.theBackPanel) {
                            this.busy = true;
                            this.open(false);
                        }
                    }}
                    className="LoginPanel"
                >
                    {!register ? (
                        <div
                            ref={x => {
                                this.thePanel = x;
                            }}
                            className="ThePanel"
                        >
                            <h1>Login</h1>
                            <input
                                onKeyPress={x => {
                                    if (x.key === "Enter") {
                                        this.login();
                                    }
                                }}
                                ref={x => {
                                    this.theEmail = x;
                                }}
                                disabled={loading}
                                placeholder="Email"
                                type="text"
                                value={email}
                                onChange={e =>
                                    this.setState({ email: e.target.value })
                                }
                            />
                            <input
                                onKeyPress={x => {
                                    if (x.key === "Enter") {
                                        this.login();
                                    }
                                }}
                                disabled={loading}
                                placeholder="Password"
                                type="password"
                                value={pwd}
                                onChange={e =>
                                    this.setState({ pwd: e.target.value })
                                }
                            />
                            <div
                                className="CheckDiv"
                                onClick={() => {
                                    if (loading) return;
                                    this.setState(x => ({
                                        remember: !x.remember
                                    }));
                                }}
                            >
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18 25L30.5 34.5L49 2"
                                        stroke="#dadada"
                                        strokeWidth="5"
                                    />
                                    <path
                                        ref={x => {
                                            this.theCheck = x;
                                        }}
                                        d="M18 25L30.5 34.5L49 2"
                                        stroke="black"
                                        strokeWidth="5"
                                        strokeDasharray="60"
                                    />
                                </svg>
                                <div
                                    ref={x => {
                                        this.theCheckText = x;
                                    }}
                                >
                                    Remember
                                </div>
                            </div>
                            <div className="ButtonDiv">
                                <button
                                    disabled={loading}
                                    onClick={this.login}
                                    className="confirm"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() =>
                                        this.setState({ register: true })
                                    }
                                    disabled={loading}
                                    className="register"
                                >
                                    Register
                                </button>
                            </div>
                            <div className="error">{errMsg}</div>
                        </div>
                    ) : (
                            <div
                                ref={x => {
                                    this.thePanel = x;
                                }}
                                className="ThePanel reg"
                            >
                                <h1>Register</h1>
                                <input
                                    onKeyPress={x => {
                                        if (x.key === "Enter") {
                                            this.regMethod();
                                        }
                                    }}
                                    disabled={loading}
                                    placeholder="Name"
                                    type="text"
                                    value={regname}
                                    onChange={e =>
                                        this.setState({ regname: e.target.value })
                                    }
                                />
                                <input
                                    onKeyPress={x => {
                                        if (x.key === "Enter") {
                                            this.regMethod();
                                        }
                                    }}
                                    disabled={loading}
                                    placeholder="Email"
                                    type="text"
                                    value={regemail}
                                    onChange={e =>
                                        this.setState({ regemail: e.target.value })
                                    }
                                />
                                <input
                                    onKeyPress={x => {
                                        if (x.key === "Enter") {
                                            this.regMethod();
                                        }
                                    }}
                                    disabled={loading}
                                    placeholder="Password"
                                    type="password"
                                    value={regpwd}
                                    onChange={e =>
                                        this.setState({ regpwd: e.target.value })
                                    }
                                />
                                <input
                                    onKeyPress={x => {
                                        if (x.key === "Enter") {
                                            this.regMethod();
                                        }
                                    }}
                                    disabled={loading}
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={regpwdc}
                                    onChange={e =>
                                        this.setState({ regpwdc: e.target.value })
                                    }
                                />
                                <div className="ButtonDiv">
                                    <button
                                        disabled={loading}
                                        onClick={() =>
                                            this.setState({ register: false })
                                        }
                                        className="confirm"
                                    >
                                        Back
                                </button>
                                    <button
                                        onClick={this.regMethod}
                                        disabled={loading}
                                        className="register"
                                    >
                                        Register
                                </button>
                                </div>
                                <div className="error">{regMsg}</div>
                            </div>
                        )}
                </div>
                {/* )} */}
            </div>
        );
    }
}