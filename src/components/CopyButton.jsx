import React from "react";
import clipboardCopy from "clipboard-copy";

export default class CopyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
    }
  }

  hadleCopy = () => {
    const { text } = this.props;
    clipboardCopy(text);
    this.setState({ isCopied: true });

    setTimeout(() => {
      this.setState({ isCopied: false });
    }, 2000);
  }

  render() {
    const { isCopied } = this.state;

    return (
      <button
        onClick={this.hadleCopy}
        className="form-btn"
      >
        {isCopied? 'Cкопировано!' : 'Скопировать'}
      </button>
    )
  }
}
