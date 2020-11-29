import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            newPassword: "",
            userViewsOwnProfile: false,
            usernameSearch: "",
            usernameSearchSubmitted: false,
            loggedIn: true,
        }
    }

    componentDidMount() {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        console.log(loggedIn);
        if (loggedIn) {
            this.setState({ loggedIn: true });
        }
    }

    // Allows for users to log out!
    handleLogOutSubmit = () => {
        this.setState({ loggedIn: false });
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
    }

    handleMyProfile = () => {
        this.setState({ userViewsOwnProfile: true });
    }

    handleUsernameSearchSubmit = () => {
        console.log(this.state.usernameSearch);
        this.setState({ usernameSearchSubmitted: true });
    }

    handlePasswordReset = () => {
        axios.post('http://3.135.218.245:3001/reset', {
            username: this.state.username,
            password: this.state.password,
            newPassword: this.state.newPassword,
        }).then((res) => {
            this.setState({ loggedIn: false });
        });
    }


    render() {

        if (!this.state.logged) {
            return (
                <Redirect to={`/login`} />
            );
        } else if (this.state.usernameSearchSubmitted) {
            return (
                <Redirect to={`/profile/${this.state.usernameSearch}`} />
            );
        } else if (this.state.userViewsOwnProfile) {
            return (
                <Redirect to={`/profile/${localStorage.getItem('username')}`} />
            );
        } else {
            return (
                <div>
                    <ul class="horizontal_TopRow">
                        <div className="smallLogo">
                            <img alt="logo" src="https://lh3.googleusercontent.com/hMjdvzKdf3jyhja4M7APZdeBv5PMXE9TgEY7cdGcmHvNj82x4594wKoTED-8fyXsH5oVnwTemRi1-2DBNA4WkxsSgbxEn8ctT7cXzcc67kKjdbscB4uPT9yG5MjOhrph_xHCGUoHh3bucMc_ueEaQMsavazPpg4x6b9ta7G8oevNcvoh4-6sMH7PjOtdN6G0Ed2UdP7gQOjs3FvG1CHLUlPJiZlno9Fpcqteg1Jfe_4YgxW5TSlgtYHEZrpV1j-JFFYg4-6H2_7UYXzzXKUD8sTvq8cbTygZKJYr_rTGrxKTDArldkjk-VrI0DVfZqKY7zJO4s7ZfNqeKZSQuEv29ih7s8HCHD_Q_od7DZheisutKlmIdrVQmlr2o51s6yIqmDwetMbcr1pkUTZwZU13CfrUVbGrEoPZmC4gY4W6M1cWl2LhGt_St9Hewkr860A_SJS7RTJp0P-p7YANHXDWy9StbQfLLHaqQFJgXzBNCJ7sw7vUsfGXFGoIfzvhO3cdaAb8pCrtUYvibgw9SVF5yR6B6GXUiBJ-BTrpN6CzLZrXr-MAxesPhXj5hUJ9B4pK0f2DDOc8ys_Ktx6dESVpSMQP0P6Wv0o0tQ2T_66YKRQxWpSoxoP7Dj7Bri5eZIBGsSBE3ajfXA0YkgiQpxQwa6mozZBquoxnUNXvdjDbH6NbJF2-QUknTz0fnYNLUw=w1015-h375-no?authuser=0" />
                        </div>
                        <Button style={{ float: 'left' }} variant="primary" size="sm" onClick={this.handleMyProfile}> My Profile </Button>
                        <Button style={{ float: 'right' }} variant="dark" size="sm" onClick={this.handleLogOutSubmit} class="right"> Log Out </Button>
                        <Button style={{ float: 'right' }} variant="secondary" size="sm" onClick={this.handlePasswordReset} class="right"> Reset Password </Button>
                    </ul>
                    <ul class="horizontal_SecondRow">
                        <Form style={{ float: 'left' }} size="sm" onSubmit={this.handleUsernameSearchSubmit}>
                            <Form.Control type="text" placeholder="Search for user..."
                                onChange={(e) => this.setState({ usernameSearch: e.target.value })} /> </Form>
                        <Button style={{ float: 'left', 'background-color': 'black', 'text-color': 'white' }} size="sm" type="submit">Search</Button>
                    </ul>
                </div>
            );
        }

    }

};

export default Home;