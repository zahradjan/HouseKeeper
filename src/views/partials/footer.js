import React, { Component } from 'react';


const textStyle = {
    color: 'white',
    fontSize: '20px'
};
const divStyle = {
    marginTop: '5px',
    marginBottom: '5px',
    
};
class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="jumbotron jumbotron-fluid bg-secondary p-4 mt-5 mb-2">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="card bg-secondary border-0">
                                    <div className="card-body text-light text-center">
                                        <h2 className="card-title text-white display-6">Jan Zahradník</h2>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container text-center" style={divStyle}>

                        <a className="fb-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>
                        <a className="tw-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>

                        <a className="gh-ic" href="https://github.com/ocasusMaximus/BudgetCalculator" style={textStyle}>
                            <i className="fab fa-github fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>

                        <a className="li-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>

                        <a className="ins-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>
                    </div>
                    <div className="container text-center" style={divStyle}>
                        <p className=" text-light d-inline lead">Studentský projekt UHK FIM ZS 2020
                                
                        </p>
                    </div>
                </div>


            </footer>
        );
    }
}

export default Footer;

