import React from 'react'
import { useEffect,useState } from 'react';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { EyeTwoTone, EyeInvisibleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from "../resources/login.module.css";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    // const handleSignIn=useGoogleLogin({
    //   clientId: "5397463614-hh83n86vhbia58omtkio805bakk4pqmb.apps.googleusercontent.com",
    //   onSuccess: async (res) => {
    //     console.log('Login successful!', res);
  
    //     // Make API call to backend to authenticate user
    //     const response = await fetch('/api/users/auth/google', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     });
  
    //     if (response.ok) {
    //       // User is authenticated, redirect to dashboard
    //       navigate('/');
    //     } else {
    //       // Authentication failed, show error message
    //       console.error('Authentication failed!', response.statusText);
    //     }
    //   },
    //   onFailure: (err) => {
    //     console.error('Login failed!', err);
    //   },
    //   accessType: 'offline'
    // });


    const handleSignIn = useGoogleLogin({
        onSuccess: (codeResponse) => {
          axios.get('/api/users/auth/google', {
            id_token: codeResponse.id_token,
            
          }).then((response) => {
            if (response.data.success) {
              message.success(response.data.message);
              localStorage.setItem('token', response.data.data);
              axios.get('/api/users/auth/google', {
                headers: {
                  Authorization: `Bearer ${response.data.data}`,
                  'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
              }).then((res) => {
                if (res.data.success) {
                  const user = res.data.data;
                  if (user.googleId) {
                    navigate('/');
                  } else {
                    axios.post('/api/users/auth/google', {
                      email: user.email,
                      name: user.name,
                    }, {
                      headers: {
                        Authorization: `Bearer ${response.data.data}`,
                      }
                    }).then((res) => {
                      if (res.data.success) {
                        navigate('/api/users/googleRedirect');
                      } else {
                        message.error(res.data.message);
                      }
                    }).catch((error) => {
                      message.error(error.message);
                    });
                  }
                } else {
                  message.error(res.data.message);
                }
              }).catch((error) => {
                message.error(error.message);
              });
            } else {
              message.error(response.data.message);
            }
          }).catch((error) => {
            message.error(error.message);
          });
        },
        onError: (error) => console.log('Login Failed:', error)
      });
      
  //  const handleSignIn=function Login(){
  //   window.open(
  //   `http://localhost:5000/api/users/auth/google`,"_self" 
  //   );
  //  };
    /*const handleSignIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(async (googleUser) => {
          try {
            dispatch(ShowLoading());
            const id_token = googleUser.getAuthResponse().id_token;
            const response = await axios.post('/api/users/auth/google', {
              id_token,
            });
            dispatch(HideLoading());
            if (response.data.success) {
              message.success(response.data.message);
              localStorage.setItem('token', response.data.data);
              navigate('/'); // <--- redirect to home page
            } else {
              message.error(response.data.message);
            }
          } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
          }
        });
      };*/

      useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/login", values);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };



    const [form] = Form.useForm()

    return (
        <>
            <div className='container'>
                <div className={styles.loginbox}>
                    <div className={styles.login}>
                        <div className={styles.logo}>
                            <img src={require("../images/BUSLOGO.png")} alt="logo" />
                        </div>
                        <h1 className='text-lg'> Login</h1>
                        <hr />
                        <Form layout="vertical" onFinish={onFinish} form={form}>
                            <Form.Item label="Email" name="email" required>
                                <Input prefix={<MailOutlined />} placeholder=" Enter a valid Email " type="text" required />
                            </Form.Item>
                            <Form.Item label="Password" name="password" required>
                                <Input.Password
                                    placeholder="Enter Password" prefix={<LockOutlined />}
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                    required
                                />
                            </Form.Item>
                            <br />

                            <hr />
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to="/register" >Click here to Register</Link>
                                <button className='secondary-btn' type='submit'>Login</button>

                            </div>
                            <hr />
                            <div>
                                <button className={styles.googleBTN} onClick={handleSignIn} block>
                                    <i className="ri-google-fill"></i> Sign up with Google
                                </button>
                            </div>
                        </Form>
                        <form action="http://localhost:5000/api/users/auth/google" method="get">
  <input type="submit" value="Press to log in"/>
</form>
                    </div>
                </div>
            </div></>
    )
}

export default Login
