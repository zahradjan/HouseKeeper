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
                <div class="jumbotron jumbotron-fluid bg-secondary p-4 mt-5 mb-2">
                    <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <div class="card bg-secondary border-0">
                                    <div class="card-body text-light text-center">
                                        <h2 class="card-title text-white display-6">Jan Zahradník</h2>


                                    </div>
                                </div>
                            </div>


                            <div class="col-6">
                                <div class="card bg-secondary border-0">
                                    <div class="card-body text-center">
                                    <h2 class="card-title text-white display-6">Tomáš Baier</h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container" style={divStyle}>

                        <a class="fb-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>
                        <a class="tw-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>

                        <a class="gh-ic" href="https://github.com/ocasusMaximus/BudgetCalculator" style={textStyle}>
                            <i class="fab fa-github fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>

                        <a class="li-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>

                        <a class="ins-ic" href="https://www.youtube.com/watch?v=d1YBv2mWll0" style={textStyle}>
                            <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>
                    </div>
                    <div class="container" style={divStyle}>
                        <p class=" text-light d-inline lead">Studentský projekt UHK FIM LS 2020
                                
                        </p>
                    </div>
                </div>


            </footer>
        );
    }
}

export default Footer;

