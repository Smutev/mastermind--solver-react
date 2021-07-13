import React,  { Component } from 'react';
import './color-point.css';


export default class ColorPoint extends Component{
    render() {
        const { color, onColorClick } = this.props;
        return (
            <div className={`point ${color} `} onClick={ onColorClick }/>
        )
    }
}




