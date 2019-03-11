import React, { Component } from 'react';
import '../less/NearbyFactorDialog.less';
import NearbyFactorItem from './NearbyFactorItem';

export default class NearbyFactorDialog extends Component {
    render() {
        const a = [1, 2, 3, 4, 5, 6, 7, 8];
        const { setNearbyFactorItems } = this.props;
        return (
            <div className="NearbyFactorDialog">
                <div className="nearbyMenu">주변 호재</div>
                {a.map(el => (
                    <NearbyFactorItem
                        el={el}
                        setNearbyFactorItems={setNearbyFactorItems}
                    />
                ))}
            </div>
        );
    }
}
