const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content is-centered">
            <p>
              <strong>Komonjo</strong> by
                hkdnet
            </p>
            <p>
              <a href="https://github.com/hkdnet/komonjo-web" className="icon">
                <i className="fa fa-github"></i>
              </a>
              <a href="https://twitter.com/hkdnet" className="icon">
                <i className="fa fa-twitter"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

module.exports = Footer
