import React, {Component} from 'react';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    handleQuestionChange(e) {
        this.props.onQuestionChange(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e.target.value);
    };

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    render() {
        return (
            <div>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Working example with validation</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback/>
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                </form>

            </div>
        );
    }
}

class PredictionBlock extends Component {
    render() {
        return (
            <div>
                <h3>Prediction</h3>
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
            answer: ''
        };

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    }

    render() {
        return (
            <div>
                <h1>Accepted Answer Predictor</h1>
                <DescriptionBlock/>
                <SubmissionForm
                question={}
                />
                <PredictionBlock/>
            </div>
        );
    }
}

export default AcceptedAnswersPage;