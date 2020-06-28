import React from 'react';
import Tile from './Tile';
import './Map.css';

function Map() {
    return (
      <table className="Map">
        <tbody>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
        </tbody>
      </table>
    );
  }
  
  export default Map;
  