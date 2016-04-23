const React = require('react');

class Header extends React.Component {
  render() {
    return (
      <section className="hero is-info is-left is-bold">
        <header className="header">
          <div className="container">
            <div className="header-left">
              <div className="header-item">
                <p className="title">komonjo</p>
              </div>
            </div>
          </div>
        </header>
      </section>
    );
  }
}

module.exports = Header
