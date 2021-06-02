import React, { Component } from 'react';


class SpecComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spec: props.spec
        }
    }

    render() {
        const { spec } = this.state
        let value = JSON.stringify(spec, undefined, 3);

        return (
            <React.Fragment>
                <div className="form-group">
                    <textarea
                        className="form-control json-text-view"
                        id="exampleFormControlTextarea1"
                        rows="18"
                        value={value}
                        readOnly
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default SpecComponent