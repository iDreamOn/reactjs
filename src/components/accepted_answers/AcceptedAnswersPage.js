import React, {Component} from 'react';
import {Button, ButtonToolbar, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {fetch, fetchWithParams} from '../../utils/restHelper'

class DescriptionBlock extends Component {
    render() {
        return (
            <div>
                <p>The tool uses attributes of historical StackOverflow data to predict whether an answer you are
                    constructing fits the profile of what an accepted answer looks like. It is meant to be used as a
                    guide to help tailor an answer you are planning to post on StackOverflow. This tool is not meant to
                    be used as a set of rules -- you may have constructed a quality answer the tool has not been trained
                    to recognize yet.</p>
                <hr/>
                <p>Please enter (1) the StackOverflow question URL, (2) the StackOverflow user profile URL (of the
                    person writing the answer), and (3) the text body of the answer itself (as you would write it on the
                    StackOverflow page, in markdown).</p>
            </div>
        );
    }
}

class SubmissionForm extends Component {
    constructor(props) {
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
    }

    handleQuestionChange(e) {
        this.props.onQuestionChange(e.target.value);
    }

    handleUserChange(e) {
        this.props.onUserChange(e.target.value);
    }

    handleAnswerChange(e) {
        this.props.onAnswerChange(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e.target.value);
    };

    handleReset = (e) => {
        e.preventDefault();
        this.props.onReset(e.target.value);
    };

    getQuestionValidation() {
        const length = this.props.question.length;
        const formatted = this.props.question.match(/^https:\/\/stackoverflow\.com\/questions\/[0-9]+\/.+$/i);
        if (length < 1) return null;
        else if (!formatted) return 'error';

        const response = fetch(this.props.question);
        if (!response) return 'error';
        else return 'success';
    }

    getUserValidation() {
        const length = this.props.user.length;
        const formatted = this.props.user.match(/^https:\/\/stackoverflow\.com\/users\/[0-9]+\/.+$/i);
        if (length < 1) return null;
        else if (!formatted) return 'error';

        const response = fetch(this.props.user);
        if (!response) return 'error';
        else return 'success';
    }

    getAnswerValidation() {
        const length = this.props.answer.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    render() {
        const hints = "Answer Checklist, in order of importance. Please consider the following (as appropriate for the question):\n" +
            "                - Answer length\n" +
            "                - Whether your answer contains code\n" +
            "                - Whether your answer contains links\n" +
            "                - Whether your answer contains formatting\n" +
            "                - Whether your answer contains a list\n" +
            "                - Whether your answer contains blockquotes\n" +
            "                - Whether your answer contains images";
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup
                        controlId="formQuestionText"
                        validationState={this.getQuestionValidation()}
                    >
                        <ControlLabel>Question URL:</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.question}
                            placeholder="https://stackoverflow.com/questions/32981875/how-to-add-two-sparse-vectors-in-spark-using-python"
                            onChange={this.handleQuestionChange}
                        />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <FormGroup
                        controlId="formUserText"
                        validationState={this.getUserValidation()}
                    >
                        <ControlLabel>Answerer User Profile URL:</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.user}
                            placeholder="https://stackoverflow.com/users/2378853/ngopal"
                            onChange={this.handleUserChange}
                        />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <FormGroup
                        controlId="formAnswerText"
                        validationState={this.getAnswerValidation()}
                    >
                        <ControlLabel>Answer Body (Must be in <a
                            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Markdown</a>):</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            rows={20}
                            value={this.props.answer}
                            placeholder={hints}
                            onChange={this.handleAnswerChange}
                        />
                        <FormControl.Feedback/>
                        <HelpBlock></HelpBlock>
                    </FormGroup>
                    <ButtonToolbar>
                        <Button bsStyle="primary" type="submit">Submit</Button>
                        <Button bsStyle="danger" type="button" onClick={this.handleReset}>Reset</Button>
                    </ButtonToolbar>
                </form>
            </div>
        );
    }
}

class PredictionBlock extends Component {
    render() {
        return (
            <div>
                <h1>Prediction: Not Accepted</h1>
                <h3>The proposed answer will likely benefit from re-formatting or reconstruction. Score: 68</h3>
                <h2>Answer Body:</h2>
                <p>Unfortunately, azure web app does not support 4.7.2, you could check the supported version via Kudu,
                    refer to this link. Currently supported versions, refer to the screenshot.</p>

                <h2>Answer Checklist:</h2>
                <p>
                    Please review the following attributes of your answer -- they are in order of most to least
                    important. All listed factors are important to the prediction, but the factors in bold text are the
                    ones you can directly impact, and the factors in gray text are factors you may not be able to
                    directly influence. Please reference the following items when considering your answer.
                </p>
                <ol>
                    <li>Days Elapsed Since Post</li>
                    <li>Your Expertise in the topic domain</li>
                    <li>Answer length</li>
                    <li>Community Reputation</li>
                    <li>Whether your answer contains code</li>
                    <li>Whether your answer contains links</li>
                    <li>Whether your answer contains formatting</li>
                    <li>Whether your answer contains a list</li>
                    <li>Whether your answer contains blockquotes</li>
                    <li>Whether your answer contains images</li>
                </ol>
                <Button>Try again</Button>

                <p>
                    SessionId (please copy and paste this into the survey below):
                    <br/>
                    Survey Link: PLEASE FILL THIS OUT
                </p>
            </div>
        );
    }
}

class AcceptedAnswersPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            user: '',
            answer: '',
            isLoading: false,
            error: null,
            prediction: null
        };

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleQuestionChange(value) {
        this.setState({
            question: value
        });
    }

    handleAnswerChange(value) {
        this.setState({
            answer: value
        });
    }

    handleUserChange(value) {
        this.setState({
            user: value
        });
    }

    handleSubmit() {
        fetchWithParams("", {
            question: this.state.question,
            user: this.state.user,
            answer: this.state.answer
        })
            .then(prediction => this.setState({
                prediction: prediction,
                isLoading: false
            }))
            .catch(error => this.setState({error, isLoading: false}));
    }

    handleReset() {
        this.setState({
            question: '',
            answer: '',
            user: ''
        });
    }

    render() {
        return (
            <div>
                <h1>Accepted Answer Predictor</h1>
                <DescriptionBlock/>
                <SubmissionForm
                    question={this.state.question}
                    user={this.state.user}
                    answer={this.state.answer}
                    onQuestionChange={this.handleQuestionChange}
                    onUserChange={this.handleUserChange}
                    onAnswerChange={this.handleAnswerChange}
                    onSubmit={this.handleSubmit}
                    onReset={this.handleReset}
                />
                <PredictionBlock/>
            </div>
        );
    }
}

export default AcceptedAnswersPage;