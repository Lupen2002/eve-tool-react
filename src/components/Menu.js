import React, {Component} from 'react';
import * as _ from 'lodash'

function makeLi(pathname){
    return (par) => {
        const i = par[0];
        const item = par[1];
        return (
            <li key={i} className={item.url === pathname ? "active" : ""}>
                <a data-id={i} href={"#"+item.url}>{item.label}</a>
            </li>
        );
    }
}

class Menu extends Component {

    render() {
        return (
            <ul className="nav nav-stacked nav-pills">
                {_.map(_.toPairs(this.props.items), makeLi(this.props.pathname))}
            </ul>
        );
    }
}

export default Menu;