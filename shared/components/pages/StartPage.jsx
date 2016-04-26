import React, { Component, PropTypes } from 'react';

import TextArea from '../TextArea.jsx';
import TextField from '../TextField.jsx';
import Button from '../Button.jsx';

if (process.env.BROWSER) {
    require('./StartPage.less');
}

export default class App extends Component {
    static propTypes = {
        createdPoll   : PropTypes.object,
        onPollCreate  : PropTypes.func
    };

    state = {
        question: '',
        options: ['', '']
    };

    handleOptionChange(idx, e) {
        const options = this.state.options.map((option, i) =>
            i === idx ? e.target.value : option
        );

        this.setState({
            options
        });
    }

    handleQuestionChange(e) {
        this.setState({
            question: e.target.value
        });
    }

    handlePollCreate() {
        const { onPollCreate } = this.props;

        if (onPollCreate) {
            onPollCreate({
                question: this.state.question,
                options: this.state.options
            });
        }
    }

    render() {
        const { question, options } = this.state;
        const { createdPoll } = this.props;

        return (
            <div className='StartPage'>
                <div className='StartPage__hero'>
                    <img src='/static/images/sunglasses.svg' className='StartPage__logo' />
                    <h1 className='StartPage__heading'>Poller</h1>
                    <h4 className='StartPage__description'>Polls made easy</h4>
                </div>
                <div className='StartPage__create-poll'>
                    {
                        createdPoll
                        ?
                            <div className='StartPage__poll-created'>
                                <h2 className='StartPage__congrats'>Poll is ready!</h2>
                                <TextField
                                    className='StartPage__input'
                                    value={`http://localhost:3001/#/polls/${createdPoll._id}`}
                                />
                                <p> Share this link with friends</p>
                            </div>
                        :
                            <form className='StartPage__create-poll-form'>
                                <TextArea
                                    className='StartPage__input'
                                    rows={4}
                                    value={question}
                                    placeholder='What movie to watch on weekend?'
                                    onChange={this.handleQuestionChange.bind(this)}
                                />
                                {
                                    options.map((option, idx) =>
                                        <TextField
                                            className='StartPage__input'
                                            placeholder={`Option ${idx + 1}`}
                                            onChange={this.handleOptionChange.bind(this, idx)}
                                            value={option}
                                        />
                                    )
                                }

                                <Button onClick={this.handlePollCreate.bind(this)}>Start!</Button>
                            </form>
                    }
                </div>
            </div>
        );
    }
}