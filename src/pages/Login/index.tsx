import * as React from 'react';
import Storage from '@components/Storage';

export interface LoginState {
    username: string;
    favoriteMovie: string;
    isFetching: boolean;
}

export default class Login extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            username: '',
            favoriteMovie: '',
            isFetching: false
        };
    }

    fetchData = (save: (key: string, data: string) => void) => {
        this.setState({ isFetching: true });
        const user = {
            username: 'xiaoma',
            favoriteMovie: 'The Fast and the Furious'
        };
        save('username', user.username);
        save('favoriteMoive', user.favoriteMovie);
        this.setState({
            username: user.username,
            favoriteMovie: user.favoriteMovie,
            isFetching: false
        });
    };
    render() {
        return (
            <div>
                <span>this is a login page.</span>
                <Storage
                    render={(obj: any) => {
                        const username = obj.load('username') || this.state.username;
                        const favoriteMovie = obj.load('favoriteMovie') || this.state.favoriteMovie;
                        if (!username || !favoriteMovie) {
                            if (!this.state.isFetching) {
                                this.fetchData(obj.save);
                            }
                            return <div>loading</div>;
                        }
                        return (
                            <div>
                                My username is {username}, and I love to watch {favoriteMovie}.
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}
