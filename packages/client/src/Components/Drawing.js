import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../less/Drawing.less';
import axios from 'axios';
import Button from '../Module/Button';
import Circle from '../CustomOverlay/Circle';
import MyDrawingElement from './MyDrawingElement';

class Drawing extends Component {
    static propTypes = {
        drawingData: PropTypes.array.isRequired,
        map: PropTypes.object.isRequired,
        closeFn: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired
    };

    state = {
        index: 0,
        theNumberOfFigure: []
    };

    handleRequestSave = (parseURL, body) => {
        const { toggleModal } = this.props;
        const basicURL = 'http://localhost:3001/';
        const isLogin = localStorage.getItem('isLogin');
        if (JSON.parse(isLogin)) {
            axios
                .post(basicURL + parseURL, body)
                .then(result => {
                    console.log('저장성공!');
                })
                .catch(err => {
                    console.log('err: ', err);
                });
        } else {
            alert('저장을 위해선 로그인이 필요합니다 :)');
            toggleModal();
        }
    };

    checkDrawStatus = () => {
        const { index, theNumberOfFigure } = this.state;
        this.setState({
            theNumberOfFigure: [...theNumberOfFigure, index + 1],
            index: index + 1
        });
    };

    render() {
        const {
            drawingData,
            map,
            closeFn
        } = this.props;
        const { theNumberOfFigure } = this.state;
        const iconArray = ['line', 'arrow', 'square', 'circle', 'polygon'];
        return (
            <div id="drawingComponentContainer">
                {iconArray.map(iconImg => (
                    <Button
                        map={map}
                        Shape={Circle}
                        icons={iconImg}
                        drewStatus={this.checkDrawStatus}
                        key={iconImg}
                    />
                ))}
                <div id="myDrawingsContainer">
                    {theNumberOfFigure.map(el => {
                        return <MyDrawingElement key={'Idrew' + el} />;
                    })}
                </div>
                <div id="saveCloseBtns">
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => {
                            this.handleRequestSave('user/save', drawingData);
                        }}
                    >
                        {`저장`}
                    </button>
                    <button
                        type="button"
                        className="saveCloseBtn"
                        onClick={() => closeFn()}
                    >
                        {`닫기`}
                    </button>
                </div>
            </div>
        );
    }
}

export default Drawing;
