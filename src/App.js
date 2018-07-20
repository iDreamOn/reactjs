import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './layout/Navigation';
import {Col, Grid, Row} from "react-bootstrap";

import * as routes from './constants/routes';
import AcceptedAnswersPage from './components/accepted_answers/AcceptedAnswersPage';
import HomePage from './components/home/Home';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navigation/>

                    <Grid>
                        <Row>
                            <Col>
                                <Route exact path={routes.ACCEPTED_ANSWERS} component={() => <AcceptedAnswersPage />}/>
                                <Route exact path={routes.HOME} component={() => <HomePage/>}/>
                            </Col>
                        </Row>
                    </Grid>


                </div>
            </Router>);
    }
}

export default App;
